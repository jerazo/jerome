import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cdk from 'aws-cdk-lib'
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import type { Construct } from 'constructs'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export type JeromeStackProps = cdk.StackProps & {
  clickupApiToken: string
  clickupListId: string
  notifyEmail?: string
  sesFromEmail?: string
  contactAccessOtpSecret?: string
  /** Custom CloudFront aliases, e.g. ['monx.dev', 'www.monx.dev']. Requires certificateArn. */
  siteDomainNames?: string[]
  /** ACM certificate ARN in us-east-1 for the custom domain(s). */
  certificateArn?: string
  /** Canonical public site URL; defaults to the primary custom domain or CloudFront URL. */
  siteUrl?: string
}

export class JeromeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: JeromeStackProps) {
    super(scope, id, props)

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    const notifyEmail = props.notifyEmail?.trim() || 'jerome.erazo@gmail.com'
    const sesFromEmail = props.sesFromEmail?.trim() || notifyEmail
    const contactAccessOtpSecret =
      props.contactAccessOtpSecret?.trim() || 'jerome-contact-access-dev-secret'

    const contactHandler = new NodejsFunction(this, 'ContactHandler', {
      entry: path.join(rootDir, 'lambda/contact/handler.ts'),
      projectRoot: rootDir,
      depsLockFilePath: path.join(rootDir, 'package-lock.json'),
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_20_X,
      timeout: cdk.Duration.seconds(15),
      memorySize: 256,
      environment: {
        CLICKUP_API_TOKEN: props.clickupApiToken,
        CLICKUP_LIST_ID: props.clickupListId,
        NOTIFY_EMAIL: notifyEmail,
        SES_FROM_EMAIL: sesFromEmail,
        CONTACT_ACCESS_OTP_SECRET: contactAccessOtpSecret,
      },
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'node20',
      },
    })

    contactHandler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['ses:SendEmail', 'ses:SendRawEmail'],
        resources: ['*'],
      }),
    )

    const contactApi = new apigatewayv2.HttpApi(this, 'ContactApi', {
      apiName: 'jerome-contact',
      corsPreflight: {
        allowHeaders: ['Content-Type'],
        allowMethods: [apigatewayv2.CorsHttpMethod.POST, apigatewayv2.CorsHttpMethod.OPTIONS],
        allowOrigins: ['*'],
      },
    })

    contactApi.addRoutes({
      path: '/api/contact',
      methods: [apigatewayv2.HttpMethod.POST, apigatewayv2.HttpMethod.OPTIONS],
      integration: new HttpLambdaIntegration('ContactIntegration', contactHandler),
    })

    contactApi.addRoutes({
      path: '/api/contact-access/request',
      methods: [apigatewayv2.HttpMethod.POST, apigatewayv2.HttpMethod.OPTIONS],
      integration: new HttpLambdaIntegration('ContactAccessRequestIntegration', contactHandler),
    })

    contactApi.addRoutes({
      path: '/api/contact-access/verify',
      methods: [apigatewayv2.HttpMethod.POST, apigatewayv2.HttpMethod.OPTIONS],
      integration: new HttpLambdaIntegration('ContactAccessVerifyIntegration', contactHandler),
    })

    const apiDomain = `${contactApi.apiId}.execute-api.${this.region}.${this.urlSuffix}`

    const siteOrigin = origins.S3BucketOrigin.withOriginAccessControl(siteBucket)

    const staticAssetCachePolicy = new cloudfront.CachePolicy(this, 'StaticAssetCachePolicy', {
      cachePolicyName: `${cdk.Stack.of(this).stackName}-StaticAssets`,
      comment: 'Long-lived cache for fingerprinted build assets',
      defaultTtl: cdk.Duration.days(365),
      maxTtl: cdk.Duration.days(365),
      minTtl: cdk.Duration.days(1),
      cookieBehavior: cloudfront.CacheCookieBehavior.none(),
      headerBehavior: cloudfront.CacheHeaderBehavior.none(),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
      enableAcceptEncodingBrotli: true,
      enableAcceptEncodingGzip: true,
    })

    const htmlCachePolicy = new cloudfront.CachePolicy(this, 'HtmlCachePolicy', {
      cachePolicyName: `${cdk.Stack.of(this).stackName}-Html`,
      comment: 'Revalidate HTML and crawl metadata on each request',
      defaultTtl: cdk.Duration.seconds(0),
      maxTtl: cdk.Duration.days(1),
      minTtl: cdk.Duration.seconds(0),
      cookieBehavior: cloudfront.CacheCookieBehavior.none(),
      headerBehavior: cloudfront.CacheHeaderBehavior.none(),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
      enableAcceptEncodingBrotli: true,
      enableAcceptEncodingGzip: true,
    })

    const siteDomainNames = props.siteDomainNames?.filter(Boolean)
    const certificateArn = props.certificateArn?.trim()
    const hasCustomDomain = Boolean(siteDomainNames?.length && certificateArn)

    if (siteDomainNames?.length && !certificateArn) {
      throw new Error(
        'ACM_CERTIFICATE_ARN must be set when SITE_DOMAIN_NAMES is configured for CloudFront.',
      )
    }

    if (certificateArn && !siteDomainNames?.length) {
      throw new Error(
        'SITE_DOMAIN_NAMES must be set when ACM_CERTIFICATE_ARN is configured for CloudFront.',
      )
    }

    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      defaultRootObject: 'index.html',
      ...(hasCustomDomain
        ? {
            domainNames: siteDomainNames,
            certificate: acm.Certificate.fromCertificateArn(this, 'SiteCertificate', certificateArn!),
            minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
          }
        : {}),
      defaultBehavior: {
        origin: siteOrigin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: htmlCachePolicy,
      },
      additionalBehaviors: {
        '/assets/*': {
          origin: siteOrigin,
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: staticAssetCachePolicy,
        },
        '/api/*': {
          origin: new origins.HttpOrigin(apiDomain, {
            protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
          }),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        },
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0),
        },
      ],
    })

    const publicSiteUrl =
      props.siteUrl?.replace(/\/$/, '') ??
      (siteDomainNames?.[0] ? `https://${siteDomainNames[0]}` : undefined) ??
      `https://${distribution.distributionDomainName}`

    contactHandler.addEnvironment('SITE_URL', publicSiteUrl)

    new cdk.CfnOutput(this, 'SiteBucketName', {
      value: siteBucket.bucketName,
      description: 'S3 bucket for the static site build',
    })

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution ID',
    })

    new cdk.CfnOutput(this, 'SiteUrl', {
      value: publicSiteUrl,
      description: 'Public site URL',
    })

    new cdk.CfnOutput(this, 'ContactApiUrl', {
      value: `${publicSiteUrl}/api/contact`,
      description: 'Contact form endpoint (same-origin via CloudFront)',
    })

    if (siteDomainNames?.length) {
      new cdk.CfnOutput(this, 'SiteDomainNames', {
        value: siteDomainNames.join(','),
        description: 'CloudFront alternate domain names (CNAMEs)',
      })
    }
  }
}
