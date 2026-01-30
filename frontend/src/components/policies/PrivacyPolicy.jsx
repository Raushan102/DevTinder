import React from 'react';
import { Shield, Lock, Eye, Database, Mail, CreditCard } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
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
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" />
              Introduction
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              Welcome to devTinder, a platform designed to help developers connect with each other. 
              We value your privacy and are committed to protecting your personal information. This 
              Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you use our platform.
            </p>
            <p className="text-lg leading-relaxed">
              By using devTinder, you agree to the collection and use of information in accordance 
              with this policy. If you do not agree with our policies and practices, please do not 
              use our service.
            </p>
          </section>

          <div className="divider"></div>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Database className="w-6 h-6" />
              Information We Collect
            </h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">1. Personal Information</h3>
            <p className="text-lg leading-relaxed mb-4">
              When you register for devTinder, we collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Email address</li>
              <li>Password (encrypted and securely stored)</li>
              <li>Developer profile information (skills, bio, location)</li>
              <li>Profile pictures and other media you upload</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2. Usage Information</h3>
            <p className="text-lg leading-relaxed mb-4">
              We automatically collect certain information when you use our platform:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Connection requests and swipe activity</li>
              <li>Chat messages (for premium users)</li>
              <li>Device information and IP address</li>
              <li>Browser type and operating system</li>
              <li>Usage patterns and preferences</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3. Payment Information</h3>
            <p className="text-lg leading-relaxed">
              For premium subscriptions (₹100), payment processing is handled securely through Razorpay. 
              We do not store your complete credit card information on our servers. Razorpay collects 
              and processes payment information according to their own privacy policy.
            </p>
          </section>

          <div className="divider"></div>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Lock className="w-6 h-6" />
              How We Use Your Information
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              We use the collected information for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
              <li>To create and manage your developer account</li>
              <li>To authenticate your identity through OTP email verification</li>
              <li>To show your profile to other developers in the feed</li>
              <li>To facilitate connection requests between developers</li>
              <li>To enable chat functionality for premium users</li>
              <li>To process payments for premium subscriptions</li>
              <li>To send important notifications about your account and connections</li>
              <li>To improve our platform and develop new features</li>
              <li>To ensure platform security and prevent fraudulent activities</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* Information Sharing */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold mb-3">With Other Users</h3>
            <p className="text-lg leading-relaxed mb-4">
              Your profile information is visible to other developers on the platform. When you send 
              a connection request or when it's accepted, both users can see each other's profiles. 
              Chat messages are only visible between connected users who have premium subscriptions.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">With Third-Party Service Providers</h3>
            <p className="text-lg leading-relaxed mb-4">
              We may share your information with trusted third-party service providers:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li><strong>Razorpay:</strong> For secure payment processing</li>
              <li><strong>Email Service Providers:</strong> For sending OTP and notifications</li>
              <li><strong>Cloud Hosting Services:</strong> For data storage and platform hosting</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Legal Requirements</h3>
            <p className="text-lg leading-relaxed">
              We may disclose your information if required by law, court order, or government 
              regulation, or if we believe such action is necessary to comply with legal obligations 
              or protect our rights and safety.
            </p>
          </section>

          <div className="divider"></div>

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Data Security
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>Passwords are encrypted using secure hashing algorithms</li>
              <li>Data transmission is secured using SSL/TLS encryption</li>
              <li>OTP verification for account authentication</li>
              <li>Regular security audits and updates</li>
              <li>Secure payment processing through Razorpay</li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive 
              to protect your information, we cannot guarantee absolute security.
            </p>
          </section>

          <div className="divider"></div>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Your Rights and Choices</h2>
            <p className="text-lg leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li><strong>Access:</strong> You can access and review your profile information at any time</li>
              <li><strong>Update:</strong> You can update your profile details through your account settings</li>
              <li><strong>Delete:</strong> You can request account deletion by contacting us</li>
              <li><strong>Opt-out:</strong> You can manage email notification preferences in settings</li>
              <li><strong>Data Portability:</strong> You can request a copy of your data</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Cookies and Tracking</h2>
            <p className="text-lg leading-relaxed">
              We use cookies and similar tracking technologies to maintain your session, remember 
              your preferences, and analyze platform usage. You can control cookies through your 
              browser settings, but disabling cookies may affect platform functionality.
            </p>
          </section>

          <div className="divider"></div>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-lg leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
              We encourage you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <div className="divider"></div>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6" />
              Contact Us
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or 
              your personal information, please contact us:
            </p>
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-lg">
                    <strong>Email:</strong> raushankumarsaw15@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <span className="text-lg">
                    <strong>Phone:</strong> +91 8252341916
                  </span>
                </div>
              </div>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              We will respond to your inquiry within 7 business days.
            </p>
          </section>

          {/* Footer Note */}
          <div className="alert alert-info mt-8">
            <Shield className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Your Privacy Matters</h3>
              <div className="text-sm">
                At devTinder, we are committed to protecting your privacy and ensuring transparency 
                in how we handle your data.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
