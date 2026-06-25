#!/usr/bin/env bash
set -euo pipefail

AUTH_METHOD="${AWS_AUTH_METHOD:-oidc}"
REGION="${AWS_REGION:-us-east-1}"
ACCOUNT_ID="$(aws sts get-caller-identity --query Account --output text)"
PRINCIPAL="$(aws sts get-caller-identity --query Arn --output text)"
DEPLOY_ROLE="arn:aws:iam::${ACCOUNT_ID}:role/cdk-hnb659fds-deploy-role-${ACCOUNT_ID}-${REGION}"

echo "Deploy principal: ${PRINCIPAL}"
echo "Auth method: ${AUTH_METHOD}"

if [ "$AUTH_METHOD" = "oidc" ]; then
  echo "OIDC deploy role configured — CDK should be able to pass bootstrap execution roles."
  exit 0
fi

echo "::warning::AWS_AUTH_METHOD=access-keys is not recommended for CDK deploys."

if aws sts assume-role \
  --role-arn "$DEPLOY_ROLE" \
  --role-session-name jerome-deploy-preflight \
  >/dev/null 2>&1; then
  echo "Can assume ${DEPLOY_ROLE}."
  exit 0
fi

cat <<EOF >&2
::error::The IAM user behind these access keys cannot deploy JeromeStack.

CDK needs either:
  1. sts:AssumeRole on cdk-hnb659fds-deploy-role-${ACCOUNT_ID}-${REGION}
  2. iam:PassRole on cdk-hnb659fds-cfn-exec-role-${ACCOUNT_ID}-${REGION}

Recommended fix:
  - Set AWS_AUTH_METHOD=oidc in the jerome environment
  - Keep AWS_ROLE_ARN only (remove access key secrets)
  - Redeploy the OIDC role: npm run deploy:oidc --prefix infrastructure

Or attach infrastructure/policies/github-actions-deploy-policy.json (or AdministratorAccess) to the IAM user.
EOF
exit 1
