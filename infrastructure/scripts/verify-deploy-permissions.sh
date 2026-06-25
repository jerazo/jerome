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

ASSUME_JSON="$(mktemp)"
ASSUME_ERR="$(mktemp)"
if aws sts assume-role \
  --role-arn "$DEPLOY_ROLE" \
  --role-session-name jerome-deploy-preflight \
  >"$ASSUME_JSON" 2>"$ASSUME_ERR"; then
  echo "Can assume ${DEPLOY_ROLE}."
  rm -f "$ASSUME_JSON" "$ASSUME_ERR"
  exit 0
fi

echo "AssumeRole failed: $(cat "$ASSUME_ERR")"
rm -f "$ASSUME_JSON"

IAM_USER="${PRINCIPAL##*/}"
if [[ "$PRINCIPAL" == *":user/"* ]]; then
  if aws iam get-user-policy --user-name "$IAM_USER" --policy-name JeromeGithubDeploy >/dev/null 2>&1; then
    echo "JeromeGithubDeploy policy is attached to ${IAM_USER}, but AssumeRole still failed."
    echo "Check that GitHub secrets use access keys for this same IAM user."
  else
    echo "No JeromeGithubDeploy policy on IAM user ${IAM_USER}."
    echo "Attach it locally (from the infrastructure/ folder):"
    echo "  aws iam put-user-policy --user-name ${IAM_USER} --policy-name JeromeGithubDeploy --policy-document file://policies/github-actions-deploy-policy.json"
  fi
fi

cat <<EOF >&2
::error::GitHub is deploying with access keys for an IAM user that cannot run CDK.

Easiest fix — switch GitHub to OIDC (no long-lived keys):
  1. On your Mac: cd infrastructure && AWS_REGION=us-east-1 npm run deploy:oidc
  2. Copy GitHubActionsRoleArn from the output
  3. GitHub → repo Settings → Environments → jerome
     - Variable AWS_AUTH_METHOD = oidc
     - Secret AWS_ROLE_ARN = that ARN
     - Delete AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY
  4. Re-run Deploy

Or grant this IAM user AdministratorAccess in the AWS IAM console, then re-run Deploy.
EOF
rm -f "$ASSUME_ERR"
exit 1
