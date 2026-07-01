import { useEffect } from 'react'
import { formatPageTitle } from '../content/profile'
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
  { id: 'acceptance', label: 'Acceptance of terms' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'license', label: 'Use of the Site' },
  { id: 'prohibited', label: 'Prohibited conduct & violations' },
  { id: 'submissions', label: 'Your submissions' },
  { id: 'ip', label: 'Intellectual property' },
  { id: 'third-parties', label: 'Third-party services & links' },
  { id: 'disclaimer', label: 'Disclaimers' },
  { id: 'liability', label: 'Limitation of liability' },
  { id: 'indemnity', label: 'Indemnification' },
  { id: 'enforcement', label: 'Enforcement & consequences' },
  { id: 'governing-law', label: 'Governing law & jurisdiction' },
  { id: 'changes', label: 'Changes to these terms' },
  { id: 'contact', label: 'Contact' },
]

export function TermsPage() {
  useEffect(() => {
    document.title = formatPageTitle('Terms of Use')
  }, [])

  return (
    <LegalLayout
      title="Terms of Use"
      lastUpdated={legalMeta.lastUpdated}
      toc={toc}
      intro={
        <>
          <p>
            These Terms of Use (&ldquo;Terms&rdquo;) govern your access to and use of this personal
            portfolio website (the &ldquo;Site&rdquo;) operated by {legalMeta.owner} (&ldquo;I&rdquo;,
            &ldquo;me&rdquo;, or &ldquo;my&rdquo;), based in {legalMeta.location}. Please read them
            carefully.
          </p>
          <p>
            By accessing or using the Site, you agree to be bound by these Terms and by my{' '}
            <LegalInternalLink to="/privacy">Privacy Policy</LegalInternalLink>. If you do not agree,
            please do not use the Site.
          </p>
        </>
      }
    >
      <LegalSection id="acceptance" title="1. Acceptance of terms">
        <p>
          By browsing the Site, submitting the contact form, or otherwise interacting with the Site,
          you confirm that you have read, understood, and agree to these Terms. These Terms apply to
          all visitors and users.
        </p>
      </LegalSection>

      <LegalSection id="eligibility" title="2. Eligibility">
        <p>
          You must be at least 18 years old, or have the consent of a parent or legal guardian, to
          use the Site. By using the Site you represent that you have the legal capacity to enter into
          these Terms and that you will use the Site in compliance with all applicable laws.
        </p>
      </LegalSection>

      <LegalSection id="license" title="3. Use of the Site">
        <p>
          I grant you a limited, non-exclusive, non-transferable, revocable permission to access and
          view the Site for your personal, informational, and legitimate professional purposes (such
          as evaluating me for work or collaboration). All other use requires my prior written
          consent. This permission does not transfer any ownership rights to you.
        </p>
      </LegalSection>

      <LegalSection id="prohibited" title="4. Prohibited conduct and violations">
        <p>
          You agree <strong className="text-sand">not</strong> to engage in any of the following.
          Each of the items below is a violation of these Terms:
        </p>
        <LegalList
          items={[
            'Using the Site for any unlawful, fraudulent, or harmful purpose, or in violation of any applicable law or regulation;',
            'Attempting to gain unauthorised access to the Site, its servers, infrastructure, APIs, or any connected systems, or probing, scanning, or testing their vulnerability;',
            'Interfering with or disrupting the Site, including introducing viruses, malware, or other harmful code, or launching denial-of-service or overload attacks;',
            'Submitting spam, bulk, automated, repetitive, or fraudulent messages through the contact form, or abusing, circumventing, or stress-testing the one-time passcode (OTP) verification flow;',
            'Harvesting, scraping, crawling, data-mining, or otherwise extracting content or personal data (including my contact details) from the Site by automated means or without authorisation;',
            'Reverse engineering, decompiling, copying, or attempting to derive the source code or underlying structure of the Site, except to the extent expressly permitted by law;',
            'Impersonating any person or entity, or misrepresenting your identity, affiliation, or the accuracy of information you provide;',
            'Reproducing, distributing, publicly displaying, modifying, or creating derivative works from the Site or its content without my written permission;',
            'Using the Site to transmit unlawful, defamatory, harassing, abusive, obscene, infringing, or otherwise objectionable content;',
            'Removing, obscuring, or altering any copyright, trademark, or other proprietary notices; or',
            'Circumventing, disabling, or interfering with any security or access-control features of the Site.',
          ]}
        />
      </LegalSection>

      <LegalSection id="submissions" title="5. Your submissions">
        <p>
          When you send me information through the contact form, you represent that the information is
          accurate and that you have the right to share it. You grant me permission to use that
          information to respond to and follow up on your enquiry, as described in my{' '}
          <LegalInternalLink to="/privacy">Privacy Policy</LegalInternalLink>.
        </p>
        <p>
          Please do not submit confidential, sensitive, or proprietary information through the Site
          unless I have agreed in advance to receive it. Unsolicited ideas or proposals are submitted
          at your own risk and create no obligation of confidentiality on my part.
        </p>
      </LegalSection>

      <LegalSection id="ip" title="6. Intellectual property">
        <p>
          Unless otherwise stated, all content on the Site &mdash; including text, design, layout,
          graphics, logos, branding, code, and the selection and arrangement of materials &mdash; is
          owned by or licensed to {legalMeta.owner} and is protected by Philippine and international
          intellectual property laws, including the Intellectual Property Code of the Philippines
          (Republic Act No. 8293). Portfolio items, client work, and third-party marks remain the
          property of their respective owners. You may not use any of this material without
          appropriate permission.
        </p>
      </LegalSection>

      <LegalSection id="third-parties" title="7. Third-party services and links">
        <p>
          The Site relies on third-party services (for example, AWS, ClickUp, Mixpanel, and Google
          Fonts) and may link to third-party websites such as my LinkedIn profile. I do not control
          and am not responsible for the availability, content, terms, or practices of those third
          parties. Your use of third-party services is governed by their own terms and policies.
        </p>
      </LegalSection>

      <LegalSection id="disclaimer" title="8. Disclaimers">
        <p>
          The Site and all content are provided on an &ldquo;as is&rdquo; and &ldquo;as
          available&rdquo; basis, without warranties of any kind, whether express or implied,
          including warranties of merchantability, fitness for a particular purpose, accuracy, or
          non-infringement. I do not warrant that the Site will be uninterrupted, error-free, secure,
          or free of harmful components. Any information on the Site is for general informational
          purposes only and does not constitute professional, legal, or other advice.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="9. Limitation of liability">
        <p>
          To the maximum extent permitted by applicable law, {legalMeta.owner} shall not be liable
          for any indirect, incidental, special, consequential, or punitive damages, or for any loss
          of data, profits, goodwill, or business, arising out of or in connection with your use of
          (or inability to use) the Site, even if advised of the possibility of such damages. Nothing
          in these Terms limits liability that cannot be limited under applicable law.
        </p>
      </LegalSection>

      <LegalSection id="indemnity" title="10. Indemnification">
        <p>
          You agree to indemnify and hold harmless {legalMeta.owner} from and against any claims,
          liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of
          or related to your misuse of the Site, your violation of these Terms, or your violation of
          any law or the rights of a third party.
        </p>
      </LegalSection>

      <LegalSection id="enforcement" title="11. Enforcement and consequences of violations">
        <p>
          I reserve the right to investigate and respond to any suspected violation of these Terms. In
          response to a violation, I may, without notice and at my discretion:
        </p>
        <LegalList
          items={[
            'Restrict, suspend, or block your access to the Site (including by IP address or other technical means);',
            'Remove or refuse to process content or submissions that violate these Terms;',
            'Preserve and disclose information where required by law or to protect rights, safety, or property; and',
            'Pursue any remedies available under applicable law, including civil and criminal action.',
          ]}
        />
        <p>
          Depending on the conduct, violations may also breach Philippine laws including the
          Cybercrime Prevention Act of 2012 (Republic Act No. 10175), the Data Privacy Act of 2012
          (Republic Act No. 10173), the Electronic Commerce Act of 2000 (Republic Act No. 8792), and
          the Intellectual Property Code (Republic Act No. 8293), as well as comparable laws in your
          own jurisdiction. You remain responsible for complying with all laws that apply to you.
        </p>
      </LegalSection>

      <LegalSection id="governing-law" title="12. Governing law and jurisdiction">
        <p>
          These Terms are governed by and construed in accordance with the laws of{' '}
          {legalMeta.governingLaw}, without regard to conflict-of-laws principles. You agree that any
          dispute arising out of or relating to the Site or these Terms shall be subject to the
          exclusive jurisdiction of {legalMeta.venue}. If you access the Site from outside the
          Philippines, you do so on your own initiative and are responsible for compliance with your
          local laws.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="13. Changes to these terms">
        <p>
          I may update these Terms from time to time. When I do, I will revise the &ldquo;Last
          updated&rdquo; date above. Your continued use of the Site after any change constitutes
          acceptance of the revised Terms. If any provision of these Terms is found to be
          unenforceable, the remaining provisions will continue in full force and effect.
        </p>
      </LegalSection>

      <LegalSection id="contact" title="14. Contact">
        <p>
          Questions about these Terms can be sent to {legalMeta.owner} at{' '}
          <LegalMailLink email={legalMeta.email} /> or through the contact form on the Site. For
          information about how I handle personal data, see my{' '}
          <LegalInternalLink to="/privacy">Privacy Policy</LegalInternalLink>. You may also contact
          the{' '}
          <LegalExternalLink href={legalMeta.dataAuthority.url}>
            {legalMeta.dataAuthority.name}
          </LegalExternalLink>{' '}
          regarding data-protection concerns.
        </p>
        <p className="text-sm text-sand/55">
          This document is provided for general information and is not legal advice.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
