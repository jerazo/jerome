import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cdk from 'aws-cdk-lib'
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigatewayv2'
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations'
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

    const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      additionalBehaviors: {
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

    contactHandler.addEnvironment('SITE_URL', `https://${distribution.distributionDomainName}`)

    new cdk.CfnOutput(this, 'SiteBucketName', {
      value: siteBucket.bucketName,
      description: 'S3 bucket for the static site build',
    })

    new cdk.CfnOutput(this, 'DistributionId', {
      value: distribution.distributionId,
      description: 'CloudFront distribution ID',
    })

    new cdk.CfnOutput(this, 'SiteUrl', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'Public site URL',
    })

    new cdk.CfnOutput(this, 'ContactApiUrl', {
      value: `https://${distribution.distributionDomainName}/api/contact`,
      description: 'Contact form endpoint (same-origin via CloudFront)',
    })
  }
}
