import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale, Users } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-secondary text-secondary-content py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-center text-lg opacity-90">
            Last Updated: January 28, 2026
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-base-100 rounded-lg shadow-xl p-8">
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Agreement to Terms</h2>
            <p className="text-lg leading-relaxed mb-4">
              Welcome to devTinder! These Terms of Service ("Terms") govern your access to and use 
              of devTinder, a platform that connects developers with each other for networking and 
              professional collaboration.
            </p>
            <p className="text-lg leading-relaxed">
              By accessing or using devTinder, you agree to be bound by these Terms. If you do not 
              agree to these Terms, you may not access or use the platform.
            </p>
          </section>

          <div className="divider"></div>

          {/* Eligibility */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Eligibility
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              To use devTinder, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Not be prohibited from using the service under applicable laws</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* Account Registration */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6" />
              Account Registration and Security
            </h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Registration Process</h3>
            <p className="text-lg leading-relaxed mb-4">
              To use devTinder, you must create an account by:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Providing a valid email address</li>
              <li>Creating a secure password</li>
              <li>Verifying your email through OTP (One-Time Password) sent to your email</li>
              <li>Completing your developer profile with accurate information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Account Security</h3>
            <p className="text-lg leading-relaxed mb-4">
              You are responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Maintaining the confidentiality of your password</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
              <li>Ensuring your account information is accurate and up-to-date</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Account Termination</h3>
            <p className="text-lg leading-relaxed">
              We reserve the right to suspend or terminate your account at any time if you violate 
              these Terms or engage in activities that harm the platform or other users.
            </p>
          </section>

          <div className="divider"></div>

          {/* Platform Services */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Platform Services</h2>
            
            <h3 className="text-xl font-semibold mb-3">Free Features</h3>
            <p className="text-lg leading-relaxed mb-4">
              All registered users have access to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Creating and managing a developer profile</li>
              <li>Browsing developer feed</li>
              <li>Sending connection requests by swiping left or right on developer cards</li>
              <li>Receiving connection requests from other developers</li>
              <li>Accepting or rejecting connection requests</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Premium Features</h3>
            <p className="text-lg leading-relaxed mb-4">
              Premium subscription (₹100) includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Chat functionality with accepted connections</li>
              <li>Real-time messaging with other premium developers</li>
              <li>Access to premium support</li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              <strong>Important:</strong> Chat feature is only available to users who have purchased 
              the premium subscription. Both users in a connection must have premium access to chat 
              with each other.
            </p>
          </section>

          <div className="divider"></div>

          {/* Payment Terms */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Payment Terms</h2>
            
            <h3 className="text-xl font-semibold mb-3">Premium Subscription</h3>
            <p className="text-lg leading-relaxed mb-4">
              The premium subscription fee is ₹100 (Indian Rupees). Payment processing is handled 
              securely through Razorpay, our trusted payment gateway partner.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Payment Processing</h3>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>All payments are processed through Razorpay's secure payment gateway</li>
              <li>We accept credit cards, debit cards, UPI, and other payment methods supported by Razorpay</li>
              <li>Payment information is encrypted and processed securely</li>
              <li>We do not store complete credit card information on our servers</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Subscription Duration</h3>
            <p className="text-lg leading-relaxed">
              Premium subscription details including duration, renewal terms, and any applicable 
              refund policies are provided at the time of purchase and in our Refund Policy.
            </p>
          </section>

          <div className="divider"></div>

          {/* User Conduct */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              User Conduct and Prohibited Activities
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              When using devTinder, you agree NOT to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Provide false, inaccurate, or misleading information</li>
              <li>Impersonate another person or entity</li>
              <li>Use the platform for any illegal or unauthorized purpose</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Send spam, unsolicited messages, or advertisements</li>
              <li>Upload malicious code, viruses, or harmful content</li>
              <li>Scrape, crawl, or use automated systems to access the platform</li>
              <li>Circumvent security features or access controls</li>
              <li>Use the platform for commercial purposes without authorization</li>
              <li>Share your account credentials with others</li>
              <li>Engage in any activity that disrupts the platform's operation</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* Content and Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Content and Intellectual Property</h2>
            
            <h3 className="text-xl font-semibold mb-3">Your Content</h3>
            <p className="text-lg leading-relaxed mb-4">
              You retain ownership of content you post on devTinder (profile information, photos, 
              messages). However, by posting content, you grant us a license to use, display, and 
              distribute your content on the platform to provide our services.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Platform Content</h3>
            <p className="text-lg leading-relaxed">
              All platform features, design, logos, and software are owned by devTinder and protected 
              by copyright and intellectual property laws. You may not copy, modify, or distribute 
              our platform content without permission.
            </p>
          </section>

          <div className="divider"></div>

          {/* Disclaimers */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Scale className="w-6 h-6" />
              Disclaimers and Limitation of Liability
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">"AS IS" Service</h3>
            <p className="text-lg leading-relaxed mb-4">
              devTinder is provided "as is" without warranties of any kind. We do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Uninterrupted or error-free service</li>
              <li>The accuracy or reliability of user profiles</li>
              <li>That connections will lead to professional opportunities</li>
              <li>The behavior or actions of other users</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Limitation of Liability</h3>
            <p className="text-lg leading-relaxed">
              To the maximum extent permitted by law, devTinder shall not be liable for any indirect, 
              incidental, special, or consequential damages arising from your use of the platform. 
              Our total liability shall not exceed the amount you paid for premium services in the 
              past 12 months.
            </p>
          </section>

          <div className="divider"></div>

          {/* Indemnification */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Indemnification</h2>
            <p className="text-lg leading-relaxed">
              You agree to indemnify and hold harmless devTinder, its affiliates, and employees 
              from any claims, damages, or expenses arising from your use of the platform, your 
              violation of these Terms, or your violation of any rights of another user.
            </p>
          </section>

          <div className="divider"></div>

          {/* Modifications */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Modifications to Terms</h2>
            <p className="text-lg leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify users of 
              material changes by email or through platform notifications. Continued use of 
              devTinder after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <div className="divider"></div>

          {/* Governing Law */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Governing Law and Dispute Resolution</h2>
            <p className="text-lg leading-relaxed mb-4">
              These Terms are governed by the laws of India. Any disputes arising from these Terms 
              or your use of devTinder shall be resolved through:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Good faith negotiations between the parties</li>
              <li>If unresolved, through arbitration in accordance with Indian law</li>
              <li>Courts in the jurisdiction where devTinder is registered</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
            <p className="text-lg leading-relaxed mb-4">
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-secondary" />
                  <span className="text-lg">
                    <strong>Email:</strong> raushankumarsaw15@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-secondary" />
                  <span className="text-lg">
                    <strong>Phone:</strong> +91 8252341916
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Agreement Notice */}
          <div className="alert alert-warning mt-8">
            <AlertTriangle className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Important Notice</h3>
              <div className="text-sm">
                By using devTinder, you acknowledge that you have read, understood, and agree to 
                be bound by these Terms of Service.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
