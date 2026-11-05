import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#06141B] text-white py-32 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Back */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm font-medium uppercase tracking-wider"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last Updated: October 2026</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>Kalahari Hertz (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information in accordance with the Data Protection Act, 2024 of Botswana.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Information We Collect</h2>
            <p>When you use our contact form, we may collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name (optional)</li>
              <li>Message content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Information</h2>
            <p>We use your information solely to respond to your inquiries and provide the services you request. We do not sell or rent your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Services</h2>
            <p>Our contact form is powered by FormSubmit, which transmits your submission via email. If you choose to contact us via WhatsApp, your data is handled according to WhatsApp&apos;s own privacy policy. We do not control these third-party services.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Your Rights</h2>
            <p>Under the Data Protection Act, 2024, you have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Lodge a complaint with the Information and Data Protection Commission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
            <p>We retain your contact information only as long as necessary to respond to your inquiry, after which it is securely deleted unless you become a client.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Contact Us</h2>
            <p>For any privacy-related questions or to exercise your rights, contact us at:</p>
            <p className="mt-2">Email: info@kalaharihertz.co.bw</p>
            <p>Phone: +267 74 076 795</p>
            <p>Address: Plot 74212, Gaborone North, Botswana</p>
          </section>
        </div>
      </div>
    </main>
  );
}