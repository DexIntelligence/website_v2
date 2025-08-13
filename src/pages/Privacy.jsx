// src/pages/Privacy.jsx
export default function Privacy() {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 text-white">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
          Privacy Policy
        </h1>
  
        {/* Effective date + intro */}
        <p className="mt-4 text-sm text-gray-400">Effective date: August 12, 2025</p>
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl font-light text-gray-200 max-w-4xl border-l-4 border-brand pl-4 sm:pl-5 italic leading-snug">
          Dex Intelligence Inc. (“Dex”, “we”, “us”) operates <span className="underline decoration-dotted decoration-white/30">dexintelligence.ai</span> and provides AI-enhanced market and competition analysis.
          This policy explains what we collect, why, how we protect it, and your choices. It applies to our website, products, and services (the “Services”).
        </p>
  
        {/* Divider */}
        <div className="w-24 h-px bg-white/20 my-10" />
  
        {/* 1) Data types */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            1) The two kinds of information we handle
          </h2>
  
          <h3 className="text-xl font-semibold">A. Contact &amp; marketing information (“Contact Data”)</h3>
          <p className="text-gray-300">
            Includes your name, business email, phone, organization, role, and your marketing preferences (e.g., newsletter opt-ins).
          </p>
  
          <h3 className="text-xl font-semibold">B. Sensitive client information (“Client Data”)</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Files you upload into our secure AWS environment (documents, data, notes).</li>
            <li>Payment information you provide at checkout (processed by our payment provider).</li>
          </ul>
          <p className="text-gray-300">
            <strong>Key promise:</strong> Client Data stays in our <strong>secure cloud environment</strong>. We <strong>do not download</strong> Client Data to local devices. Processing happens in-cloud under strict access controls and logging.
          </p>
        </section>
  
        {/* 2) What we collect */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            2) What we collect
          </h2>
  
          <h3 className="text-xl font-semibold">Contact Data (you provide)</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Contact details via forms, email, or booking.</li>
            <li>Your marketing preferences (e.g., newsletter opt-in).</li>
          </ul>
  
          <h3 className="text-xl font-semibold">Client Data (you or your team provide)</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Files uploaded through our portal.</li>
            <li>Minimal case metadata you enter (project name, tags).</li>
            <li>Payment details (handled by our payment provider; we don’t store full card numbers).</li>
          </ul>
  
          <h3 className="text-xl font-semibold">Technical data (automatic)</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Device/usage info (IP, browser/OS, pages viewed, timestamps).</li>
            <li>Security logs (auth events, errors, performance).</li>
          </ul>
          <p className="text-gray-300">We collect <strong>only what we need</strong> for the purposes below.</p>
        </section>
  
        {/* 3) Why we collect */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            3) Why we collect it (identified purposes)
          </h2>
  
          <h3 className="text-xl font-semibold">Contact Data</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong>Communications:</strong> respond to inquiries, schedule demos.</li>
            <li><strong>Marketing (opt-in):</strong> send newsletters or product updates (you can unsubscribe anytime).</li>
            <li><strong>Compliance:</strong> keep records required by law (e.g., consent logs).</li>
          </ul>
  
          <h3 className="text-xl font-semibold">Client Data</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong>Provide the Services:</strong> store your uploads; run analyses; deliver results.</li>
            <li><strong>Security &amp; reliability:</strong> scan files for malware; monitor and audit access; prevent abuse/fraud.</li>
            <li><strong>Compliance:</strong> meet legal, contractual, and professional obligations (e.g., confidentiality).</li>
          </ul>
  
          <p className="text-gray-300">We don’t use Client Data for advertising or to train our models without your express permission.</p>
        </section>
  
        {/* 4) Consent */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            4) Consent and your choices
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li>Using the Services gives implied consent for core purposes above.</li>
            <li>For <strong>optional</strong> uses (e.g., marketing emails), we seek <strong>express, opt-in</strong> consent (unchecked box).</li>
            <li>You can <strong>withdraw</strong> consent for optional uses anytime (unsubscribe link or contact us).</li>
            <li><strong>Quebec note (Law 25):</strong> optional tracking/analytics that identify, locate, or profile you are <strong>off by default</strong> for Quebec residents and only turn on if you opt in.</li>
          </ul>
        </section>
  
        {/* 5) Hosting & protection */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            5) How we host, store, and protect Client Data
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong>Direct-to-cloud uploads:</strong> Your browser uploads files directly to encrypted storage in our AWS account via presigned links; the app does not proxy the file.</li>
            <li><strong>Encryption:</strong> TLS in transit; server-side encryption (KMS) at rest.</li>
            <li><strong>Access controls:</strong> role-based, least-privilege; access is logged and reviewed.</li>
            <li><strong>Malware scanning:</strong> new uploads are scanned; infected files are quarantined and you are alerted.</li>
            <li><strong>No local downloads:</strong> our staff do <strong>not</strong> download Client Data; processing and access occur within the secure cloud environment.</li>
            <li><strong>VPC/private paths:</strong> where supported, service-to-service traffic remains on AWS private links.</li>
            <li><strong>Deletion &amp; backups:</strong> you can delete files; backups expire on a rolling schedule (see Retention).</li>
            <li><strong>Model training:</strong> we do <strong>not</strong> use your Client Data to train models unless we clearly ask and you agree.</li>
          </ul>
        </section>
  
        {/* 6) Payments */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            6) Payments
          </h2>
          <p className="text-gray-300">
            We use a third-party <strong>payment processor</strong> (e.g., Stripe) to handle card data. We receive billing contact and status (paid/refunded) but <strong>never</strong> see or store full card numbers. The processor uses its own safeguards and may process payment data outside Canada subject to contractual protections.
          </p>
        </section>
  
        {/* 7) Email & marketing */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            7) Email and marketing (CASL-aligned)
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong>Transactional/admin email:</strong> we may email you about your account, security, or service changes.</li>
            <li><strong>Marketing email (optional):</strong> only if you opted in. Emails include our business identity and an <strong>unsubscribe</strong> link we honour within the required timeframe.</li>
            <li><strong>Consent records:</strong> we keep time-stamped records of opt-ins/opt-outs.</li>
          </ul>
        </section>
  
        {/* 8) Providers */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            8) Service providers (who we share information with)
          </h2>
          <p className="text-gray-300">
            We use vetted providers to host and support the Services. They may access information <strong>only</strong> to perform services for us and must protect it by contract.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong>Hosting &amp; storage:</strong> AWS (Canada region); encrypted S3 for files; ECS Fargate for app runtime.</li>
            <li><strong>Identity &amp; login:</strong> Amazon Cognito (MFA supported).</li>
            <li><strong>Email:</strong> Microsoft 365/Outlook for administrative and transactional email, and <strong>Resend</strong> for sending application and marketing messages (only to contacts who have opted in).</li>
            <li><strong>Security &amp; logging:</strong> AWS CloudTrail and CloudWatch for infrastructure and object-level logging, plus AWS GuardDuty and malware scanning services for threat detection. Logs are retained per our retention schedule, encrypted at rest, and reviewed for security events.</li>
            <li><strong>Payments:</strong> payment processor (e.g., Stripe).</li>
          </ul>
          <p className="text-gray-300">
            We may also disclose information if required by law or during a merger/acquisition (subject to this policy).
          </p>
        </section>
  
        {/* 9) Transfers */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            9) Transfers outside Canada
          </h2>
          <p className="text-gray-300">
            While we aim to store Client Data in <strong>Canada</strong>, some providers (e.g., email, payments, error monitoring) may process <strong>Contact Data</strong> or limited operational metadata outside Canada (e.g., U.S.). We use contracts and safeguards to ensure a <strong>comparable level of protection</strong> to that required in Canada.
          </p>
        </section>
  
        {/* 10) Retention */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            10) Retention
          </h2>
          <h3 className="text-xl font-semibold">Contact Data</h3>
          <p className="text-gray-300">
            Kept while your account is active or while we have an ongoing business need (e.g., you’re subscribed). We delete or anonymize it when no longer needed, subject to legal requirements.
          </p>
          <h3 className="text-xl font-semibold">Client Data</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-300">
            <li><strong>Uploads &amp; outputs:</strong> deleted after <strong>90 days</strong> unless you ask us to retain longer for an active engagement.</li>
            <li><strong>Security logs:</strong> archived after <strong>30 days</strong> and deleted after <strong>365 days</strong> (for auditability).</li>
            <li>Deleted items disappear from backups after the backup cycle completes.</li>
          </ul>
        </section>
  
        {/* 11-16) Rights & boilerplate */}
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            11) Your rights
          </h2>
          <p className="text-gray-300">
            You may <strong>access</strong> the personal information we hold about you, <strong>correct</strong> inaccuracies, and <strong>withdraw</strong> consent for optional uses. Contact us (below). We’ll verify identity and respond as required by Canadian law. If we can’t meet a request, we’ll explain why.
          </p>
        </section>
  
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            12) Children
          </h2>
          <p className="text-gray-300">
            Our Services are for professional use and not directed to children under 13. If you believe a child provided personal information, contact us so we can delete it.
          </p>
        </section>
  
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            13) Data incidents and breaches
          </h2>
          <p className="text-gray-300">
            We maintain processes to detect, assess, and respond to privacy/security incidents. If an incident creates a <strong>real risk of significant harm</strong>, we will notify affected individuals and report to the regulator as required. We maintain an incident log.
          </p>
        </section>
  
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            14) Third-party links
          </h2>
          <p className="text-gray-300">
            Our site may link to third-party websites. Their privacy practices are their own; please review their policies.
          </p>
        </section>
  
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            15) Changes to this policy
          </h2>
          <p className="text-gray-300">
            We may update this policy from time to time. If changes are significant, we’ll provide reasonable notice (e.g., site notice or email). See the <strong>Effective date</strong> above.
          </p>
        </section>
  
        <section className="space-y-4 mt-12 mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold underline decoration-brand decoration-2 underline-offset-4">
            16) How to contact us
          </h2>
          <p className="text-gray-300">
            <strong>Privacy Officer</strong><br />
            Justin Mayne<br />
            justin.mayne@dexintelligence.ai<br />
            (416) 388-6843
          </p>
          <p className="text-gray-300">
            <strong>Regulator contact:</strong> Office of the Privacy Commissioner of Canada — 1-800-282-1376 — opc.gc.ca.
            <br />
            Quebec residents may also contact the <em>Commission d’accès à l’information du Québec (CAI)</em>.
          </p>
        </section>
      </main>
    );
  }
  