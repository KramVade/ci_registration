import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions - Christmas Institute 2025",
  description: "Terms and Conditions for Christmas Institute 2025 Registration",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
        <p className="text-sm text-gray-600 mb-8">
          Last updated: December 23, 2024
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to the Christmas Institute (CI) 2025 Registration System. These Terms and Conditions 
              ("Terms") govern your use of our web application and registration services for the Christmas 
              Institute 2025 event. By accessing or using our service, you agree to be bound by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Event Information</h2>
            <p>
              The Christmas Institute (CI) 2025 is a religious and educational event organized to provide 
              spiritual growth, fellowship, and learning opportunities for participants. Registration through 
              this web application is required for attendance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Registration and Data Collection</h2>
            <h3 className="text-xl font-medium mb-2">3.1 Information We Collect</h3>
            <p>During registration, we collect the following information to enhance your CI experience:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal Information: Full name, nickname, birthday, age, gender</li>
              <li>Contact Information: Address, phone number, email address (optional)</li>
              <li>Educational Background: Educational attainment</li>
              <li>Family Information: Parents' names</li>
              <li>Church Information: Local church, membership status, positions held</li>
              <li>Event-Related Information: Previous attendance, expectations, contributions</li>
              <li>Accommodation Needs: Items you plan to bring</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">3.2 Purpose of Data Collection</h3>
            <p>We collect this information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process your registration for CI 2025</li>
              <li>Improve your overall CI experience</li>
              <li>Plan appropriate accommodations and activities</li>
              <li>Maintain communication regarding the event</li>
              <li>Ensure safety and security during the event</li>
              <li>Generate reports for event planning and improvement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Data Privacy and Security</h2>
            <h3 className="text-xl font-medium mb-2">4.1 Data Protection</h3>
            <p>
              We are committed to protecting your personal information. All data is stored securely using 
              industry-standard security measures including encryption and secure cloud storage through 
              Firebase services.
            </p>

            <h3 className="text-xl font-medium mb-2 mt-4">4.2 Data Usage</h3>
            <p>Your personal information will only be used for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>CI 2025 event planning and management</li>
              <li>Communication related to the event</li>
              <li>Improving future CI events</li>
              <li>Compliance with legal requirements</li>
            </ul>

            <h3 className="text-xl font-medium mb-2 mt-4">4.3 Data Sharing</h3>
            <p>
              We do not sell, trade, or share your personal information with third parties except:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With CI 2025 organizers and authorized staff for event management</li>
              <li>When required by law or legal process</li>
              <li>To protect the safety and security of participants</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities</h2>
            <p>By using this registration system, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and truthful information</li>
              <li>Update your information if it changes before the event</li>
              <li>Use the system only for legitimate registration purposes</li>
              <li>Respect the privacy of other participants</li>
              <li>Comply with all CI 2025 event rules and guidelines</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Registration Fees and Contributions</h2>
            <p>
              Registration may involve fees and contributions as specified during the registration process. 
              All fees and contributions are used for event expenses and improvements. Refund policies 
              will be communicated separately by the event organizers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>
              The CI 2025 organizers and this web application are provided "as is" without warranties. 
              We are not liable for any damages arising from your use of this registration system or 
              participation in CI 2025, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Data Retention</h2>
            <p>
              We will retain your personal information for as long as necessary to fulfill the purposes 
              outlined in these Terms, typically until one year after the CI 2025 event, unless a longer 
              retention period is required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Withdraw consent for data processing (may affect your registration)</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact the CI 2025 organizers through the provided 
              contact information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this 
              page with an updated "Last updated" date. Continued use of the registration system after 
              changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
            <p>
              If you have questions about these Terms or your personal information, please contact 
              the CI 2025 organizers through the official event communication channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the Philippines. Any disputes will be resolved 
              in accordance with Philippine law and jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Acceptance</h2>
            <p>
              By completing the registration process, you acknowledge that you have read, understood, 
              and agree to be bound by these Terms and Conditions.
            </p>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This Terms and Conditions document is specifically designed for the 
            Christmas Institute 2025 registration system. For questions or concerns, please reach out 
            to the event organizers.
          </p>
        </div>
      </div>
    </div>
  );
}