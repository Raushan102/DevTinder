import React from 'react';
import { RefreshCw, DollarSign, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-accent text-accent-content py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <RefreshCw className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Refund Policy</h1>
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
            <h2 className="text-3xl font-bold mb-4">Our Commitment to You</h2>
            <p className="text-lg leading-relaxed mb-4">
              At devTinder, we strive to provide the best experience for developers looking to 
              connect and network. This Refund Policy explains our policies regarding refunds for 
              the premium subscription service (₹100).
            </p>
            <p className="text-lg leading-relaxed">
              We want you to be completely satisfied with your purchase. Please read this policy 
              carefully to understand your rights and our refund procedures.
            </p>
          </section>

          <div className="divider"></div>

          {/* Premium Subscription Overview */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6" />
              Premium Subscription Overview
            </h2>
            <div className="bg-base-200 p-6 rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-3">What's Included</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
                <li>Chat functionality with accepted connections</li>
                <li>Real-time messaging with other premium developers</li>
                <li>Access to premium support</li>
              </ul>
            </div>
            <div className="bg-info bg-opacity-10 p-6 rounded-lg border-l-4 border-info">
              <p className="text-lg font-semibold mb-2">Subscription Fee: ₹100</p>
              <p className="text-base">
                Payment is processed securely through Razorpay, our trusted payment gateway partner.
              </p>
            </div>
          </section>

          <div className="divider"></div>

          {/* Refund Eligibility */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" />
              Refund Eligibility
            </h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">You May Be Eligible for a Refund If:</h3>
            <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
              <li>
                <strong>Accidental Purchase:</strong> You accidentally purchased the premium 
                subscription and request a refund within 24 hours of purchase without using the 
                chat feature.
              </li>
              <li>
                <strong>Technical Issues:</strong> You experience significant technical problems 
                that prevent you from using the premium features, and our support team cannot 
                resolve the issue within 7 days.
              </li>
              <li>
                <strong>Duplicate Charge:</strong> You were charged twice for the same subscription 
                due to a payment processing error.
              </li>
              <li>
                <strong>Service Unavailability:</strong> The premium chat service is unavailable 
                for more than 48 consecutive hours due to platform issues.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">You Are NOT Eligible for a Refund If:</h3>
            <ul className="list-disc list-inside space-y-3 ml-4 text-lg">
              <li>You have actively used the chat feature after purchasing premium</li>
              <li>More than 7 days have passed since your purchase</li>
              <li>You changed your mind after using the service</li>
              <li>You violated our Terms of Service and your account was suspended or terminated</li>
              <li>You cannot find connections willing to chat with you (this is based on user behavior, not a technical issue)</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* Refund Process */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Refund Request Process
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">How to Request a Refund</h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="badge badge-primary badge-lg">1</div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Contact Us</h4>
                  <p className="text-base">
                    Send an email to <strong>raushankumarsaw15@gmail.com</strong> or call 
                    <strong> +91 8252341916</strong> with the subject line "Refund Request - devTinder Premium"
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="badge badge-primary badge-lg">2</div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Provide Information</h4>
                  <p className="text-base mb-2">Include the following in your request:</p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Your registered email address</li>
                    <li>Transaction ID or payment receipt from Razorpay</li>
                    <li>Date of purchase</li>
                    <li>Reason for refund request</li>
                    <li>Any supporting documentation (screenshots of technical issues, etc.)</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="badge badge-primary badge-lg">3</div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Review Process</h4>
                  <p className="text-base">
                    Our team will review your request within 5-7 business days and respond via 
                    email with our decision.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="badge badge-primary badge-lg">4</div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Refund Processing</h4>
                  <p className="text-base">
                    If approved, refunds will be processed within 7-10 business days to the 
                    original payment method used for the purchase.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="divider"></div>

          {/* Refund Timeline */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Refund Timeline</h2>
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th className="text-lg">Stage</th>
                    <th className="text-lg">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold">Request Submission</td>
                    <td>Within 7 days of purchase</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Review & Decision</td>
                    <td>5-7 business days</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Refund Processing</td>
                    <td>7-10 business days after approval</td>
                  </tr>
                  <tr>
                    <td className="font-semibold">Bank/Card Credit</td>
                    <td>3-5 business days (depends on your bank)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-base mt-4 text-gray-600">
              <strong>Note:</strong> The total time from request to receiving your refund may take 
              up to 3-4 weeks depending on your bank's processing time.
            </p>
          </section>

          <div className="divider"></div>

          {/* Payment Gateway Refunds */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Razorpay Payment Processing</h2>
            <p className="text-lg leading-relaxed mb-4">
              All payments are processed through Razorpay, India's leading payment gateway. 
              Refunds are also processed through Razorpay and will be credited to the original 
              payment method:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
              <li><strong>Net Banking:</strong> 5-7 business days</li>
              <li><strong>UPI:</strong> 1-3 business days</li>
              <li><strong>Wallets:</strong> 1-3 business days</li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              Please note that Razorpay's refund processing times may vary based on your bank or 
              payment provider.
            </p>
          </section>

          <div className="divider"></div>

          {/* Partial Refunds */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Partial Refunds</h2>
            <p className="text-lg leading-relaxed mb-4">
              In certain cases, we may offer partial refunds:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>If you've used a portion of the subscription period before requesting a refund</li>
              <li>If technical issues affected only part of your subscription period</li>
              <li>At our discretion for exceptional circumstances</li>
            </ul>
            <p className="text-lg leading-relaxed mt-4">
              Partial refund amounts will be calculated on a pro-rata basis based on the unused 
              portion of your subscription.
            </p>
          </section>

          <div className="divider"></div>

          {/* Subscription Cancellation */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Subscription Cancellation</h2>
            <p className="text-lg leading-relaxed mb-4">
              If you wish to cancel your premium subscription:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg">
              <li>You can cancel at any time through your account settings</li>
              <li>Cancellation will prevent future charges (if applicable for recurring subscriptions)</li>
              <li>You will retain access to premium features until the end of your current subscription period</li>
              <li>Cancellation does not automatically trigger a refund unless you meet the refund eligibility criteria</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* Exceptions */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Exceptions and Special Cases
            </h2>
            <p className="text-lg leading-relaxed mb-4">
              We understand that exceptional circumstances may arise. If you believe you have a 
              unique situation that warrants consideration, please contact us directly. We review 
              each case individually and may make exceptions at our discretion.
            </p>
            <p className="text-lg leading-relaxed">
              Examples of special cases we may consider:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 text-lg mt-2">
              <li>Medical emergencies preventing platform use</li>
              <li>Extended platform outages beyond our control</li>
              <li>Billing errors or technical glitches</li>
            </ul>
          </section>

          <div className="divider"></div>

          {/* Contact Section */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Contact Us for Refund Requests</h2>
            <p className="text-lg leading-relaxed mb-4">
              For any refund-related questions or to submit a refund request, please reach out to us:
            </p>
            <div className="bg-base-200 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  <span className="text-lg">
                    <strong>Email:</strong> raushankumarsaw15@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-accent" />
                  <span className="text-lg">
                    <strong>Phone:</strong> +91 8252341916
                  </span>
                </div>
              </div>
            </div>
            <p className="text-lg leading-relaxed mt-4">
              We aim to respond to all refund requests within 5-7 business days.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Changes to This Refund Policy</h2>
            <p className="text-lg leading-relaxed">
              We reserve the right to modify this Refund Policy at any time. Changes will be 
              effective immediately upon posting to the platform. Your continued use of devTinder 
              after changes are posted constitutes acceptance of the modified policy.
            </p>
          </section>

          {/* Important Notice */}
          <div className="alert alert-info mt-8">
            <AlertCircle className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Fair Refund Policy</h3>
              <div className="text-sm">
                We strive to be fair and transparent with our refund policy. If you have any 
                questions or concerns, please don't hesitate to contact us.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
