"use client"
import React from 'react'

type Props = {}

const PrivacyPolicy = (props: Props) => {
  return (
    <div suppressHydrationWarning className="max-w-3xl mx-auto p-6 shadow-md rounded-md my-12">
    <h1 className="text-3xl font-semibold text-center mb-6">Privacy Policy</h1>

    <p className="text-sm mb-4"><strong>Effective Date:</strong> 1st January 2025</p>

    <p className="mb-6">
        At <strong>The Prototype Studio</strong> (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;), your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website <a href="https://www.theprototypestudio.in" className="text-blue-600 hover:underline">[www.theprototypestudio.in]</a> (&quot;Site&quot;).
    </p>

    <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
    <div className="mb-4">
        We may collect the following types of information:
        <ul className="list-disc list-inside">
            <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details when you sign up or contact us.</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on pages, browser type, device info, etc.</li>
            <li><strong>Cookies:</strong> To enhance your experience and analyze website traffic.</li>
        </ul>
    </div>

    <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
    <div className="mb-4">
        We use your data to:
        <ul className="list-disc list-inside">
            <li>Provide and improve our courses and services.</li>
            <li>Respond to your inquiries or support requests.</li>
            <li>Send important updates, newsletters, or marketing emails (you can opt out anytime).</li>
            <li>Analyze user behavior to improve website performance.</li>
        </ul>
    </div>

    <h2 className="text-xl font-semibold mb-3">3. Sharing Your Information</h2>
    <p className="mb-4">
        We <strong>do not sell or rent</strong> your personal information. We may share it with trusted service providers (e.g., analytics, email services) who help us run the website, but only as necessary and under confidentiality.
    </p>

    <h2 className="text-xl font-semibold mb-3">4. Your Data Rights</h2>
    <div className="mb-4">
        You have the right to:
        <ul className="list-disc list-inside">
            <li>Access, correct, or delete your personal data.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Request data portability (in certain cases).</li>
        </ul>
        To exercise these rights, contact us at: <strong>theprototypestudio4@gmail.com</strong>.
    </div>

    <h2 className="text-xl font-semibold mb-3">5. Security</h2>
    <p className="mb-4">
        We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
    </p>

    <h2 className="text-xl font-semibold mb-3">6. Third-Party Links</h2>
    <p className="mb-4">
        Our Site may contain links to third-party websites. We are not responsible for the privacy practices of those sites.
    </p>

    <h2 className="text-xl font-semibold mb-3">7. Changes to This Policy</h2>
    <p className="mb-4">
        We may update this Privacy Policy from time to time. The latest version will always be posted on this page with the effective date.
    </p>

    <h2 className="text-xl font-semibold mb-3">8. Contact Us</h2>
    <p className="mb-4">
        If you have questions about this Privacy Policy, contact us at:  
        <strong>theprototypestudio4@gmail.com</strong><br />
        <a href="https://www.theprototypestudio.in" className="text-blue-600 hover:underline">www.theprototypestudio.in</a>
    </p>
</div>

  )
}

export default PrivacyPolicy