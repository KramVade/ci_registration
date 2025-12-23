import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Christmas Institute 2025",
  description: "Privacy Policy for Christmas Institute 2025 Registration",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">
          Last updated: December 23, 2024
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy describes how the Christmas Institute (CI) 2025 Registration System 
              collects, uses, and protects your personal information when you register for our event. 
              We are committed to protecting your privacy and ensuring the security of your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-2">2.1 Personal Information</h3>
            <p>When you register for CI 2025, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Identity Information:</strong> Full name, nickname, date of birth, age, gender</li>
              <li><strong>Contact Information:</strong> Address, phone number, email address (optional)</li>
              <li><strong>Educational Information:</strong> Educational attainment level</li>
              <li><strong>Family Information:</strong> Parents' names</li>
              <li><strong>Religious Information:</strong> Local church, membership status, church positions</li>
              <li><strong>Event Information:</strong> Previous attendance, expectations, contributions</li>
              <li><strong>Accommodation Information:</strong> Items you plan to bring to the event</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">2.2 Technical Information</h3>
            <p>We may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address and browser information</li>
              <li>Device information and operating system</li>
              <li>Usage data and analytics (through Firebase Analytics)</li>
              <li>Registration timestamps and form completion data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use your personal information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Event Management:</strong> Processing registrations and managing attendance</li>
              <li><strong>Communication:</strong> Sending event updates, schedules, and important information</li>
              <li><strong>Planning:</strong> Organizing accommodations, meals, and activities based on participant needs</li>
              <li><strong>Safety:</strong> Ensuring participant safety and emergency contact capabilities</li>
              <li><strong>Improvement:</strong> Analyzing data to improve future CI events</li>
              <li><strong>Compliance:</strong> Meeting legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Security</h2>
            <h3 className="text-xl font-medium mb-2">4.1 Storage Location</h3>
            <p>
              Your data is stored securely using Google Firebase services, which provides enterprise-grade 
              security and compliance with international data protection standards.
            </p>

            <h3 className="text-xl font-medium mb-2 mt-4">4.2 Security Measures</h3>
            <p>We implement the following security measures:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication and access controls</li>
              <li>Regular security monitoring and updates</li>
              <li>Limited access to authorized personnel only</li>
              <li>Secure backup and recovery procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Sharing and Disclosure</h2>
            <h3 className="text-xl font-medium mb-2">5.1 Internal Sharing</h3>
            <p>Your information may be shared with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>CI 2025 organizing committee members</li>
              <li>Authorized event staff and volunteers</li>
              <li>Local church leaders involved in event coordination</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">5.2 External Sharing</h3>
            <p>We do not sell or share your personal information with third parties, except:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>When required by law or legal process</li>
              <li>In case of emergency to protect participant safety</li>
              <li>With service providers who assist in event operations (under strict confidentiality)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Privacy Rights</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your data in a structured format</li>
              <li><strong>Objection:</strong> Object to certain types of data processing</li>
              <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact the CI 2025 organizers. Note that some requests 
              may affect your ability to participate in the event.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p>We retain your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>During the registration period and event duration</li>
              <li>For up to one year after the event for follow-up and planning purposes</li>
              <li>Longer if required by law or for legitimate business purposes</li>
              <li>Until you request deletion (subject to legal requirements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Cookies and Analytics</h2>
            <p>
              Our website uses Firebase Analytics to understand how users interact with our registration 
              system. This helps us improve the user experience and identify technical issues. You can 
              disable analytics through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p>
              If you are registering a minor (under 18 years old), you must have parental or guardian 
              consent. We take special care to protect children's privacy and will only use their 
              information for event-related purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. International Data Transfers</h2>
            <p>
              Your data may be processed and stored in servers located outside the Philippines through 
              Google Firebase services. These transfers are protected by appropriate safeguards and 
              comply with international data protection standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page 
              with an updated date. We encourage you to review this policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle your personal information, 
              please contact the CI 2025 organizing committee through the official event communication channels.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Your Privacy Matters:</strong> We are committed to protecting your personal information 
            and using it only to enhance your Christmas Institute 2025 experience. If you have any concerns 
            about your privacy, please don't hesitate to contact us.
          </p>
        </div>
      </div>
    </div>
  );
}