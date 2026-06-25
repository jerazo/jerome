#!/usr/bin/env bash
set -euo pipefail

REGION="${AWS_REGION:-us-east-1}"
FROM_EMAIL="${SES_FROM_EMAIL:-${NOTIFY_EMAIL:-jerome.erazo@gmail.com}}"
NOTIFY_EMAIL="${NOTIFY_EMAIL:-jerome.erazo@gmail.com}"

echo "Checking SES in ${REGION}..."
echo "From: ${FROM_EMAIL}"
echo "Notify: ${NOTIFY_EMAIL}"

ACCOUNT_JSON="$(aws sesv2 get-account --region "$REGION" 2>/dev/null || true)"
if [ -z "$ACCOUNT_JSON" ]; then
  echo "::warning::Could not read SES account status. Check AWS credentials and region."
  exit 0
fi

PRODUCTION="$(echo "$ACCOUNT_JSON" | python3 -c "import json,sys; print(json.load(sys.stdin).get('ProductionAccessEnabled', False))")"
echo "Production access: ${PRODUCTION}"

for EMAIL in "$FROM_EMAIL" "$NOTIFY_EMAIL"; do
  STATUS="$(aws sesv2 get-email-identity --email-identity "$EMAIL" --region "$REGION" --query 'VerifiedForSendingStatus' --output text 2>/dev/null || echo 'missing')"
  echo "${EMAIL}: ${STATUS}"
  if [ "$STATUS" != "True" ]; then
    echo "::warning::${EMAIL} is not verified for sending. Verify it in SES → Verified identities."
  fi
done

if [ "$PRODUCTION" != "True" ]; then
  cat <<EOF >&2
::warning::SES is still in sandbox mode. OTP emails to visitors will fail unless each recipient is verified.
Request production access: SES → Account dashboard → Request production access.
EOF
fi

if [ -z "${CONTACT_ACCESS_OTP_SECRET:-}" ]; then
  echo "::warning::CONTACT_ACCESS_OTP_SECRET is not set. OTP tokens will use the CDK fallback secret."
elif [ "${CONTACT_ACCESS_OTP_SECRET}" = "change-me-in-production" ]; then
  echo "::error::CONTACT_ACCESS_OTP_SECRET is still the placeholder. Generate one with: openssl rand -hex 32"
  exit 1
fi

echo "SES preflight complete."
