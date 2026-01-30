import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, MapPin, Clock, HelpCircle } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-info text-info-content py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MessageSquare className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
          </div>
          <p className="text-center text-lg opacity-90">
            We're here to help! Reach out to us with any questions or concerns.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-base-100 rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-lg leading-relaxed mb-6">
                Have questions about devTinder? Need help with your account? Want to report an 
                issue? We're here to assist you!
              </p>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="bg-info text-info-content p-3 rounded-full">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                    <a 
                      href="mailto:raushankumarsaw15@gmail.com" 
                      className="text-info hover:underline"
                    >
                      raushankumarsaw15@gmail.com
                    </a>
                    <p className="text-sm mt-1 opacity-70">
                      We'll respond within 24-48 hours
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="bg-success text-success-content p-3 rounded-full">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                    <a 
                      href="tel:+918252341916" 
                      className="text-success hover:underline"
                    >
                      +91 8252341916
                    </a>
                    <p className="text-sm mt-1 opacity-70">
                      Monday - Friday, 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                  <div className="bg-warning text-warning-content p-3 rounded-full">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                    <p className="opacity-80">India</p>
                    <p className="text-sm mt-1 opacity-70">
                      Serving developers worldwide
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-4 bg-base-200 rounded-lg">
                  <div className="bg-secondary text-secondary-content p-3 rounded-full">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-sm opacity-80">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-sm opacity-80">Saturday: 10:00 AM - 4:00 PM IST</p>
                    <p className="text-sm opacity-80">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-base-100 rounded-lg shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="w-6 h-6" />
                Common Questions
              </h2>
              <div className="space-y-3">
                <div className="collapse collapse-arrow bg-base-200">
                  <input type="radio" name="faq-accordion" defaultChecked /> 
                  <div className="collapse-title font-medium">
                    How do I upgrade to premium?
                  </div>
                  <div className="collapse-content"> 
                    <p>Go to your profile settings and click on "Upgrade to Premium". The premium subscription costs ₹100 and gives you access to chat features with your connections.</p>
                  </div>
                </div>

                <div className="collapse collapse-arrow bg-base-200">
                  <input type="radio" name="faq-accordion" /> 
                  <div className="collapse-title font-medium">
                    How do connection requests work?
                  </div>
                  <div className="collapse-content"> 
                    <p>Browse developer profiles and swipe right to send a connection request. If they accept, you'll be connected! Premium users can then chat with each other.</p>
                  </div>
                </div>

                <div className="collapse collapse-arrow bg-base-200">
                  <input type="radio" name="faq-accordion" /> 
                  <div className="collapse-title font-medium">
                    Can I get a refund?
                  </div>
                  <div className="collapse-content"> 
                    <p>Yes! Check our Refund Policy for details. Refunds are available within 7 days if you meet the eligibility criteria.</p>
                  </div>
                </div>

                <div className="collapse collapse-arrow bg-base-200">
                  <input type="radio" name="faq-accordion" /> 
                  <div className="collapse-title font-medium">
                    How do I reset my password?
                  </div>
                  <div className="collapse-content"> 
                    <p>Click on "Forgot Password" on the login page. We'll send an OTP to your registered email to verify your identity and let you create a new password.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-100 rounded-lg shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            
            {submitted && (
              <div className="alert alert-success mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Your message has been sent successfully! We'll get back to you soon.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email Address</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Subject */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="account">Account Issues</option>
                  <option value="premium">Premium Subscription</option>
                  <option value="refund">Refund Request</option>
                  <option value="report">Report a Problem</option>
                  <option value="feedback">Feedback & Suggestions</option>
                  <option value="partnership">Partnership Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className="textarea textarea-bordered h-32 w-full"
                  required
                ></textarea>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-info w-full text-white">
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>

            <div className="divider my-6">OR</div>

            {/* Direct Contact Options */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="mailto:raushankumarsaw15@gmail.com"
                className="btn btn-outline btn-info"
              >
                <Mail className="w-5 h-5 mr-2" />
                Email
              </a>
              <a
                href="tel:+918252341916"
                className="btn btn-outline btn-success"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call
              </a>
            </div>
          </div>

        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-base-100 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Other Ways to Reach Us</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Technical Support */}
            <div className="text-center p-6 bg-base-200 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-error text-error-content p-4 rounded-full">
                  <HelpCircle className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Technical Support</h3>
              <p className="text-sm opacity-80 mb-4">
                Experiencing technical issues? Our support team is here to help resolve any problems.
              </p>
              <a href="mailto:raushankumarsaw15@gmail.com?subject=Technical%20Support" className="btn btn-sm btn-error">
                Get Support
              </a>
            </div>

            {/* Premium Help */}
            <div className="text-center p-6 bg-base-200 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-warning text-warning-content p-4 rounded-full">
                  <MessageSquare className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Premium Support</h3>
              <p className="text-sm opacity-80 mb-4">
                Questions about premium features or need help with your subscription?
              </p>
              <a href="mailto:raushankumarsaw15@gmail.com?subject=Premium%20Support" className="btn btn-sm btn-warning">
                Contact Now
              </a>
            </div>

            {/* Feedback */}
            <div className="text-center p-6 bg-base-200 rounded-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-primary text-primary-content p-4 rounded-full">
                  <Send className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Feedback</h3>
              <p className="text-sm opacity-80 mb-4">
                We value your feedback! Share your ideas to help us improve devTinder.
              </p>
              <a href="mailto:raushankumarsaw15@gmail.com?subject=Feedback" className="btn btn-sm btn-primary">
                Share Feedback
              </a>
            </div>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="alert alert-info mt-8">
          <Clock className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Expected Response Time</h3>
            <div className="text-sm">
              We typically respond to all inquiries within 24-48 hours during business days. 
              For urgent matters, please call us directly at +91 8252341916.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
