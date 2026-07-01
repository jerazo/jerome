import { profile } from '../src/content/profile.ts'

export type EmailTemplateResult = {
  subject: string
  text: string
  html: string
}

type EmailLayoutOptions = {
  headerLabel: string
  title: string
  intro: string
  bodyHtml: string
  siteUrl?: string
}

const BRAND_NAME = profile.name
const BRAND_INITIALS = 'JE'
const BRAND_LOCATION = profile.location
const LINKEDIN_URL = profile.links.linkedin

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function resolveSiteUrl(siteUrl?: string) {
  const fromEnv = process.env.SITE_URL?.trim()
  const resolved = (siteUrl ?? fromEnv ?? '').replace(/\/$/, '')
  return resolved || undefined
}

export function formatOtpForDisplay(otp: string) {
  const digits = otp.replace(/\D/g, '')
  if (digits.length === 6) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`
  }

  const midpoint = Math.ceil(digits.length / 2)
  return `${digits.slice(0, midpoint)} ${digits.slice(midpoint)}`.trim()
}

function renderFooter(siteUrl?: string) {
  const portfolioHref = siteUrl ? escapeHtml(siteUrl) : '#'
  const contactHref = siteUrl ? `${escapeHtml(siteUrl)}/#contact` : '#'
  const linkedinHref = escapeHtml(LINKEDIN_URL)

  return `
    <tr>
      <td style="padding:28px 32px 36px;background-color:#ebebeb;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
        <p style="margin:0 0 14px;font-size:10px;line-height:1.6;letter-spacing:0.18em;text-transform:uppercase;color:#666666;">
          <a href="${portfolioHref}" style="color:#333333;text-decoration:none;">Portfolio</a>
          &nbsp;&bull;&nbsp;
          <a href="${linkedinHref}" style="color:#333333;text-decoration:none;">LinkedIn</a>
          &nbsp;&bull;&nbsp;
          <a href="${contactHref}" style="color:#333333;text-decoration:none;">Contact</a>
        </p>
        <p style="margin:0;font-size:11px;line-height:1.7;color:#777777;">
          ${escapeHtml(BRAND_NAME)}<br />
          ${escapeHtml(BRAND_LOCATION)}
        </p>
        <p style="margin:18px 0 0;font-size:18px;line-height:1;color:#111111;font-weight:700;letter-spacing:0.08em;">
          ${escapeHtml(BRAND_INITIALS)}
        </p>
      </td>
    </tr>
  `
}

function renderEmailLayout({
  headerLabel,
  title,
  intro,
  bodyHtml,
  siteUrl,
}: EmailLayoutOptions) {
  const resolvedSiteUrl = resolveSiteUrl(siteUrl)
  const safeHeaderLabel = escapeHtml(headerLabel)
  const safeTitle = escapeHtml(title)
  const safeIntro = escapeHtml(intro)

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${safeTitle}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#e5e5e5;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#e5e5e5;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;">
            <tr>
              <td style="padding:22px 32px;border-bottom:1px solid #ececec;background-color:#ffffff;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#111111;">
                      <span style="display:inline-block;width:22px;height:22px;margin-right:10px;border-radius:4px;background-color:#111111;color:#ffffff;font-size:11px;line-height:22px;text-align:center;vertical-align:middle;">${escapeHtml(BRAND_INITIALS)}</span>
                      ${escapeHtml(BRAND_NAME)}
                    </td>
                    <td align="right" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#888888;white-space:nowrap;">
                      ${safeHeaderLabel}
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:48px 32px 40px;background-color:#f5f5f5;text-align:center;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
                <h1 style="margin:0 0 18px;font-size:30px;font-weight:300;line-height:1.2;color:#111111;">
                  ${safeTitle}
                </h1>
                <p style="margin:0 auto 28px;max-width:420px;font-size:15px;line-height:1.65;color:#444444;">
                  ${safeIntro}
                </p>
                ${bodyHtml}
              </td>
            </tr>
            ${renderFooter(resolvedSiteUrl)}
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
}

function renderSupportLine(siteUrl?: string) {
  const resolvedSiteUrl = resolveSiteUrl(siteUrl)
  const contactHref = resolvedSiteUrl ? `${escapeHtml(resolvedSiteUrl)}/#contact` : '#'

  return `
    <p style="margin:28px 0 0;font-size:14px;line-height:1.65;color:#666666;">
      If you need assistance, please visit the
      <a href="${contactHref}" style="color:#111111;text-decoration:underline;">contact page</a>.
    </p>
  `
}

export function buildOtpVerificationEmail({
  otp,
  ttlMinutes,
  siteUrl,
}: {
  otp: string
  ttlMinutes: number
  siteUrl?: string
}): EmailTemplateResult {
  const displayCode = formatOtpForDisplay(otp)
  const intro = `Please use the following verification code to view ${BRAND_NAME}'s contact details on his portfolio site.`
  const bodyHtml = `
    <p style="margin:0;font-size:38px;font-weight:700;line-height:1.1;letter-spacing:0.14em;color:#111111;">
      ${escapeHtml(displayCode)}
    </p>
    <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#777777;">
      This code expires in ${ttlMinutes} minutes.
    </p>
    ${renderSupportLine(siteUrl)}
    <p style="margin:18px 0 0;font-size:13px;line-height:1.6;color:#999999;">
      If you did not request these contact details, you can ignore this email.
    </p>
  `

  const text = [
    'Verification Code',
    '',
    intro,
    '',
    displayCode,
    '',
    `This code expires in ${ttlMinutes} minutes.`,
    '',
    'If you did not request these contact details, you can ignore this email.',
  ].join('\n')

  return {
    subject: 'Your verification code',
    text,
    html: renderEmailLayout({
      headerLabel: 'Account information',
      title: 'Verification Code',
      intro,
      bodyHtml,
      siteUrl,
    }),
  }
}

function renderDetailRow(label: string, value: string) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e6e6e6;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#888888;width:34%;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid #e6e6e6;font-size:15px;line-height:1.5;color:#111111;vertical-align:top;">
        ${escapeHtml(value)}
      </td>
    </tr>
  `
}

export function buildContactAccessNotificationEmail({
  email,
  company,
  viewedAt,
  siteUrl,
}: {
  email: string
  company: string
  viewedAt: string
  siteUrl?: string
}): EmailTemplateResult {
  const intro = 'Someone verified their email and viewed your contact details on your portfolio site.'
  const formattedTime = new Date(viewedAt).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:420px;margin:0 auto;text-align:left;">
      ${renderDetailRow('Company', company)}
      ${renderDetailRow('Email', email)}
      ${renderDetailRow('Viewed at', formattedTime)}
    </table>
    <p style="margin:28px 0 0;font-size:14px;line-height:1.65;color:#666666;">
      Reply directly to this email to follow up with them.
    </p>
  `

  const text = [
    'Contact details viewed',
    '',
    intro,
    '',
    `Company: ${company}`,
    `Email: ${email}`,
    `Time: ${viewedAt}`,
    '',
    'Reply directly to this email to follow up.',
  ].join('\n')

  return {
    subject: `Contact details viewed (${company})`,
    text,
    html: renderEmailLayout({
      headerLabel: 'Site notification',
      title: 'Contact Details Viewed',
      intro,
      bodyHtml,
      siteUrl,
    }),
  }
}
