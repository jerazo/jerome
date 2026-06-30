import { useEffect } from 'react'
import { formatPageTitle, profile } from '../content/profile'
import { legalMeta } from '../content/legal'
import {
  LegalExternalLink,
  LegalInternalLink,
  LegalLayout,
  LegalList,
  LegalMailLink,
  LegalSection,
} from '../components/organisms/LegalLayout'

const toc = [
  { id: 'who-we-are', label: 'Who is responsible' },
  { id: 'data-we-collect', label: 'Information I collect' },
  { id: 'how-we-use', label: 'How I use your information' },
  { id: 'legal-bases', label: 'Legal bases for processing' },
  { id: 'sharing', label: 'Who I share data with' },
  { id: 'transfers', label: 'International data transfers' },
  { id: 'cookies', label: 'Cookies & local storage' },
  { id: 'retention', label: 'Data retention' },
  { id: 'security', label: 'Security' },
  { id: 'your-rights', label: 'Your rights' },
  { id: 'children', label: "Children's privacy" },
  { id: 'third-parties', label: 'Third-party links' },
  { id: 'changes', label: 'Changes to this policy' },
  { id: 'contact', label: 'How to contact me' },
]

export function PrivacyPage() {
  useEffect(() => {
    document.title = formatPageTitle('Privacy Policy')
  }, [])

  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated={legalMeta.lastUpdated}
      toc={toc}
      intro={
        <>
          <p>
            This Privacy Policy explains how {legalMeta.owner} (&ldquo;I&rdquo;, &ldquo;me&rdquo;, or
            &ldquo;my&rdquo;) collects, uses, and protects personal information when you visit this
            personal portfolio website (the &ldquo;Site&rdquo;). I am an individual based in{' '}
            {legalMeta.location}, and I operate this Site myself.
          </p>
          <p>
            I respect your privacy and handle personal data in accordance with the{' '}
            <strong className="text-sand">Philippine Data Privacy Act of 2012 (Republic Act No.
            10173)</strong>{' '}
            and its implementing rules, as well as widely recognised international standards such as
            the EU/UK General Data Protection Regulation (GDPR) and the California Consumer Privacy
            Act (CCPA) where they apply to you.
          </p>
        </>
      }
    >
      <LegalSection id="who-we-are" title="1. Who is responsible for your data">
        <p>
          The data controller responsible for your personal information is {legalMeta.owner}, an
          individual operating this personal portfolio from {legalMeta.location}. For any privacy
          question or request, you can reach me at <LegalMailLink email={legalMeta.email} /> or
          through the contact form on the Site.
        </p>
      </LegalSection>

      <LegalSection id="data-we-collect" title="2. Information I collect">
        <p>
          This Site is a personal portfolio. There are no user accounts, logins, or payment
          processing. I only collect personal information in the limited situations described below.
        </p>

        <p className="font-semibold text-sand">a. Information you give me through the contact form</p>
        <p>When you submit the contact form, I collect:</p>
        <LegalList
          items={[
            <>
              <strong className="text-sand">Name</strong> and{' '}
              <strong className="text-sand">email address</strong> (required) so I can identify and
              reply to you;
            </>,
            <>
              <strong className="text-sand">Phone number</strong> and country code,{' '}
              <strong className="text-sand">website URL</strong>, and{' '}
              <strong className="text-sand">company name</strong> (optional);
            </>,
            <>
              The <strong className="text-sand">message</strong> content you choose to send.
            </>,
          ]}
        />
        <p>
          The form also includes a hidden anti-spam field (a &ldquo;honeypot&rdquo;) used only to
          detect automated bots; it is not intended to be filled in by people.
        </p>

        <p className="font-semibold text-sand">
          b. Information used to reveal my masked contact details (OTP)
        </p>
        <p>
          Some of my contact details (email, phone, and precise location) are masked by default. To
          reveal them, you may request a one-time passcode (OTP). For this I collect your{' '}
          <strong className="text-sand">company name</strong> and{' '}
          <strong className="text-sand">email address</strong>, and I send a 6-digit code to that
          email so you can verify it. A record that the request occurred (your company, email, and a
          timestamp) is sent to me so I know who has accessed my details.
        </p>

        <p className="font-semibold text-sand">c. Usage and analytics data</p>
        <p>
          If analytics are enabled, I use a privacy-conscious product analytics tool (Mixpanel) to
          understand how the Site is used. This may include pages and sections viewed, and certain
          actions such as submitting the contact form, requesting/verifying an OTP, and downloading
          my CV, together with basic technical metadata (such as app version). Mixpanel may also
          process limited device and network information (for example, IP address) in accordance with
          its own privacy policy. Analytics data is stored in your browser&rsquo;s local storage.
        </p>

        <p className="font-semibold text-sand">d. Information from your device</p>
        <p>
          To pre-select the right phone country code in the contact form, your browser&rsquo;s
          language and time zone are read locally on your device. This information is only transmitted
          to me if you actually submit the form.
        </p>
      </LegalSection>

      <LegalSection id="how-we-use" title="3. How I use your information">
        <p>I use the information described above to:</p>
        <LegalList
          items={[
            'Respond to your enquiry and communicate with you about it;',
            'Verify your identity so I can safely reveal my contact details to you (OTP);',
            'Protect the Site against spam, abuse, and fraudulent or automated submissions;',
            'Understand and improve how the Site performs and is used (analytics);',
            'Keep basic business records of legitimate enquiries; and',
            'Comply with legal obligations and enforce my Terms of Use.',
          ]}
        />
        <p>
          I do not sell your personal information, and I do not use it for automated decision-making
          that produces legal or similarly significant effects on you.
        </p>
      </LegalSection>

      <LegalSection id="legal-bases" title="4. Legal bases for processing">
        <p>
          Under the Philippine Data Privacy Act and (where applicable) the GDPR, I rely on the
          following bases to process your personal data:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-sand">Your consent</strong> &mdash; for example, when you
              choose to submit the contact form or request an OTP, and for optional analytics;
            </>,
            <>
              <strong className="text-sand">Steps taken at your request prior to entering into a
              contract</strong>{' '}
              &mdash; responding to project enquiries;
            </>,
            <>
              <strong className="text-sand">Legitimate interests</strong> &mdash; operating,
              securing, and improving the Site, and keeping records of enquiries, provided these do
              not override your rights and freedoms;
            </>,
            <>
              <strong className="text-sand">Compliance with a legal obligation</strong> &mdash; where
              the law requires me to retain or disclose information.
            </>,
          ]}
        />
        <p>You may withdraw consent at any time (see &ldquo;Your rights&rdquo; below).</p>
      </LegalSection>

      <LegalSection id="sharing" title="5. Who I share your data with">
        <p>
          I do not sell or rent your personal information. I share it only with trusted service
          providers (&ldquo;personal information processors&rdquo;) who help me operate the Site, and
          only to the extent necessary:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-sand">ClickUp</strong> &mdash; contact-form submissions (and, as
              a fallback, contact-access records) are stored as tasks so I can track and respond to
              them.
            </>,
            <>
              <strong className="text-sand">Amazon Web Services (AWS)</strong> &mdash; hosting
              (S3/CloudFront), serverless processing of form and OTP requests (Lambda/API Gateway),
              and sending OTP and notification emails (Amazon SES).
            </>,
            <>
              <strong className="text-sand">Mixpanel</strong> &mdash; optional product analytics, if
              enabled.
            </>,
            <>
              <strong className="text-sand">Google Fonts</strong> &mdash; web fonts are loaded from
              Google&rsquo;s servers, which means your IP address is shared with Google when fonts are
              fetched.
            </>,
          ]}
        />
        <p>
          I may also disclose information if required to do so by law, by a competent authority, or to
          protect my rights, safety, or property, or those of others.
        </p>
      </LegalSection>

      <LegalSection id="transfers" title="6. International data transfers">
        <p>
          The service providers above may store and process your information on servers located
          outside the Philippines (for example, in the United States). Where personal data is
          transferred internationally, I take reasonable steps to ensure it remains protected to a
          comparable standard, consistent with the Data Privacy Act and, where applicable, GDPR
          transfer requirements. By using the Site or contacting me, you understand that your
          information may be processed in these locations.
        </p>
      </LegalSection>

      <LegalSection id="cookies" title="7. Cookies and local storage">
        <p>
          This Site does <strong className="text-sand">not</strong> set advertising or tracking
          cookies, and the content delivery layer is configured to ignore cookies. The Site does use
          browser storage for limited, functional purposes:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-sand">Session storage</strong> &mdash; remembers, only for your
              current browser tab/session, that you have unlocked my contact details after OTP
              verification. It is cleared when you close the tab.
            </>,
            <>
              <strong className="text-sand">Local storage</strong> &mdash; used by analytics
              (Mixpanel) when enabled.
            </>,
          ]}
        />
        <p>
          You can clear this storage at any time through your browser settings, and you can block or
          disable scripts if you prefer not to be measured by analytics.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="8. How long I keep your data">
        <LegalList
          items={[
            <>
              <strong className="text-sand">Contact enquiries</strong> are kept for as long as
              necessary to respond and to maintain reasonable business records, after which they are
              deleted or anonymised.
            </>,
            <>
              <strong className="text-sand">One-time passcodes (OTP)</strong> expire automatically and
              are valid for only about 10 minutes.
            </>,
            <>
              <strong className="text-sand">Contact-access records</strong> (company, email,
              timestamp) are kept as a security log of who has revealed my details.
            </>,
            <>
              <strong className="text-sand">Analytics data</strong> is retained according to
              Mixpanel&rsquo;s retention settings; browser storage persists until you clear it.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection id="security" title="9. How I protect your data">
        <p>
          I use reasonable organisational and technical measures to protect your information,
          including encrypted connections (HTTPS), signed and time-limited OTP tokens, a private
          storage bucket for the Site, and access controls for the services I use. However, no method
          of transmission or storage over the internet is completely secure, and I cannot guarantee
          absolute security. Please avoid sending sensitive personal information through the contact
          form.
        </p>
      </LegalSection>

      <LegalSection id="your-rights" title="10. Your rights">
        <p>
          Subject to applicable law, you have rights over your personal data. Under the Philippine
          Data Privacy Act these include the rights to be informed, to access, to object, to
          rectify/correct, to erasure or blocking, to data portability, to file a complaint, and to
          damages. If you are in the EEA/UK or California, you may have comparable rights (including
          access, deletion, correction, portability, and the right to opt out of certain processing).
        </p>
        <p>
          To exercise any of these rights, contact me at <LegalMailLink email={legalMeta.email} />. I
          will respond within the timeframe required by applicable law. You also have the right to
          lodge a complaint with the{' '}
          <LegalExternalLink href={legalMeta.dataAuthority.url}>
            {legalMeta.dataAuthority.name}
          </LegalExternalLink>{' '}
          in the Philippines, or with your local data protection authority.
        </p>
      </LegalSection>

      <LegalSection id="children" title="11. Children's privacy">
        <p>
          This Site is intended for a professional audience and is not directed at children. I do not
          knowingly collect personal information from children under the age of 18. If you believe a
          child has provided me with personal data, please contact me so I can delete it.
        </p>
      </LegalSection>

      <LegalSection id="third-parties" title="12. Third-party links">
        <p>
          The Site may link to third-party websites (such as my LinkedIn profile). I am not
          responsible for the privacy practices or content of those sites. Please review their
          privacy policies before providing them with personal information.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="13. Changes to this policy">
        <p>
          I may update this Privacy Policy from time to time to reflect changes to the Site or to
          legal requirements. When I do, I will revise the &ldquo;Last updated&rdquo; date above.
          Significant changes may be highlighted on the Site. Your continued use of the Site after an
          update constitutes acceptance of the revised policy.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="14. How to contact me">
        <p>
          If you have questions about this Privacy Policy or how your data is handled, contact{' '}
          {legalMeta.owner} at <LegalMailLink email={legalMeta.email} /> or through the contact form
          on the Site. Please also review my <LegalInternalLink to="/terms">Terms of Use</LegalInternalLink>,
          which govern your use of the Site.
        </p>
        <p className="text-sm text-sand/55">
          This document is provided for transparency and general information. It is not legal advice.
          {' '}
          {profile.name} operates this Site as an individual.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
