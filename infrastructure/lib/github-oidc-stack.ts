import * as cdk from 'aws-cdk-lib'
import * as iam from 'aws-cdk-lib/aws-iam'
import type { Construct } from 'constructs'

export type GithubOidcStackProps = cdk.StackProps & {
  githubOrg: string
  githubRepo: string
  githubBranch?: string
}

export class GithubOidcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GithubOidcStackProps) {
    super(scope, id, props)

    const branch = props.githubBranch ?? 'main'
    const repositorySubject = `repo:${props.githubOrg}/${props.githubRepo}:ref:refs/heads/${branch}`

    const provider = new iam.OpenIdConnectProvider(this, 'GitHubOidcProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: ['sts.amazonaws.com'],
    })

    const deployRole = new iam.Role(this, 'GitHubDeployRole', {
      roleName: 'jerome-github-deploy',
      description: 'GitHub Actions deploy role for the Jerome portfolio site',
      maxSessionDuration: cdk.Duration.hours(1),
      assumedBy: new iam.WebIdentityPrincipal(provider.openIdConnectProviderArn, {
        StringEquals: {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
        },
        StringLike: {
          'token.actions.githubusercontent.com:sub': repositorySubject,
        },
      }),
    })

    deployRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
    )

    new cdk.CfnOutput(this, 'GitHubActionsRoleArn', {
      value: deployRole.roleArn,
      description: 'Add this ARN as the AWS_ROLE_ARN GitHub Actions secret',
    })
  }
}
