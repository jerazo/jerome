#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REGION="${AWS_REGION:-us-east-1}"
STACK_NAME="${CDK_TOOLKIT_STACK_NAME:-CDKToolkit}"

cd "$ROOT_DIR"

STATUS="$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --region "$REGION" \
  --query 'Stacks[0].StackStatus' \
  --output text 2>/dev/null || echo NONE)"

if [ "$STATUS" = "ROLLBACK_COMPLETE" ] || [ "$STATUS" = "CREATE_FAILED" ]; then
  echo "Removing failed ${STACK_NAME} stack (${STATUS}) before re-bootstrapping..."
  aws cloudformation delete-stack --stack-name "$STACK_NAME" --region "$REGION"
  aws cloudformation wait stack-delete-complete --stack-name "$STACK_NAME" --region "$REGION"
fi

echo "Deploying minimal CDK toolkit stack to ${REGION}..."
aws cloudformation deploy \
  --stack-name "$STACK_NAME" \
  --template-file bootstrap-minimal.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides "Qualifier=hnb659fds" "BootstrapVariant=jerome-minimal-v1" \
  --region "$REGION" \
  --no-fail-on-empty-changeset

echo "CDK toolkit ready."
