import React from 'react';
import { Heart, Users, Target, Zap, Shield, TrendingUp, Code, MessageCircle } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">About devTinder</h1>
          </div>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Connecting developers worldwide, one swipe at a time
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Our Story */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Code className="w-8 h-8 text-primary" />
            Our Story
          </h2>
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed mb-4">
              devTinder was born from a simple observation: developers are some of the most 
              collaborative professionals in the world, yet finding the right peers to connect 
              with can be surprisingly difficult. Whether you're looking for a coding buddy, 
              a mentor, a collaborator on a side project, or just someone who speaks your language 
              (literally and figuratively), the traditional networking platforms often fall short.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              We created devTinder to bridge this gap. Inspired by the simplicity and efficiency 
              of modern matching platforms, we built a space where developers can discover each 
              other based on skills, interests, and project goals—without the noise and overhead 
              of traditional professional networks.
            </p>
            <p className="text-lg leading-relaxed">
              Today, devTinder is helping developers across India and beyond find meaningful 
              connections, build projects together, share knowledge, and grow their careers in 
              ways that matter to them.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Mission */}
          <div className="bg-base-100 rounded-lg shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary text-primary-content p-3 rounded-full">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-lg leading-relaxed">
              To empower developers worldwide by creating a simple, intuitive platform where 
              they can discover, connect, and collaborate with peers who share their passion 
              for coding and innovation. We believe that every developer deserves access to a 
              supportive community that helps them grow, learn, and build amazing things together.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-base-100 rounded-lg shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-secondary text-secondary-content p-3 rounded-full">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold">Our Vision</h2>
            </div>
            <p className="text-lg leading-relaxed">
              To become the world's leading platform for developer connections, fostering a 
              global community where collaboration knows no boundaries. We envision a future 
              where every developer, regardless of experience level or location, can easily 
              find the right connections to advance their career, build innovative projects, 
              and contribute to the ever-evolving world of technology.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">What We Offer</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-base-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-info text-info-content p-4 rounded-full">
                  <Users className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Smart Matching</h3>
              <p className="text-sm opacity-80">
                Discover developers based on skills, interests, and project goals through our 
                intuitive swipe interface.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-base-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-success text-success-content p-4 rounded-full">
                  <Shield className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Secure Platform</h3>
              <p className="text-sm opacity-80">
                Your data is protected with industry-standard security measures, including 
                encrypted passwords and OTP verification.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-base-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-warning text-warning-content p-4 rounded-full">
                  <MessageCircle className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Premium Chat</h3>
              <p className="text-sm opacity-80">
                Unlock real-time messaging with your connections through our affordable premium 
                subscription for just ₹100.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 bg-base-200 rounded-lg hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-error text-error-content p-4 rounded-full">
                  <Zap className="w-8 h-8" />
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">Easy to Use</h3>
              <p className="text-sm opacity-80">
                Simple, intuitive design that gets out of your way and lets you focus on 
                making meaningful connections.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">How devTinder Works</h2>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
              <div className="badge badge-primary badge-lg text-xl font-bold p-6">1</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">Sign Up & Verify</h3>
                <p className="text-lg leading-relaxed">
                  Create your account with your email and password. We'll send you an OTP to 
                  verify your email address and ensure account security.
                </p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="flex gap-6 items-start">
              <div className="badge badge-secondary badge-lg text-xl font-bold p-6">2</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">Build Your Profile</h3>
                <p className="text-lg leading-relaxed">
                  Complete your developer profile with your skills, bio, interests, and what 
                  you're looking for. This helps other developers understand who you are and 
                  what you bring to the table.
                </p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="flex gap-6 items-start">
              <div className="badge badge-accent badge-lg text-xl font-bold p-6">3</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">Browse & Connect</h3>
                <p className="text-lg leading-relaxed">
                  Browse through developer profiles in your feed. Swipe right to send a connection 
                  request to developers you'd like to connect with, or swipe left to pass.
                </p>
              </div>
            </div>

            <div className="divider"></div>

            <div className="flex gap-6 items-start">
              <div className="badge badge-info badge-lg text-xl font-bold p-6">4</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-2">Match & Chat</h3>
                <p className="text-lg leading-relaxed">
                  When another developer accepts your connection request (or vice versa), you're 
                  matched! Upgrade to premium for just ₹100 to unlock chat and start collaborating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-base-200 rounded-lg">
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                <Heart className="w-6 h-6 text-error" />
                Community First
              </h3>
              <p className="text-base leading-relaxed">
                We believe in building a supportive, inclusive community where every developer 
                feels welcome and valued, regardless of their experience level.
              </p>
            </div>

            <div className="p-6 bg-base-200 rounded-lg">
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                <Shield className="w-6 h-6 text-info" />
                Privacy & Security
              </h3>
              <p className="text-base leading-relaxed">
                Your trust is paramount. We implement robust security measures and transparent 
                policies to protect your data and privacy at all times.
              </p>
            </div>

            <div className="p-6 bg-base-200 rounded-lg">
              <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                <Zap className="w-6 h-6 text-warning" />
                Innovation
              </h3>
              <p className="text-base leading-relaxed">
                We continuously evolve our platform based on user feedback and emerging 
                technologies to provide the best experience possible.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose devTinder */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Why Choose devTinder?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Developer-Focused Platform</h3>
                <p className="text-base opacity-80">
                  Built by developers, for developers. We understand your needs because we share them.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Simple & Intuitive</h3>
                <p className="text-base opacity-80">
                  No complicated forms or overwhelming features. Just a clean, straightforward 
                  way to connect with other developers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Affordable Premium</h3>
                <p className="text-base opacity-80">
                  At just ₹100, our premium subscription with chat features is accessible to 
                  developers at all career stages.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Growing Community</h3>
                <p className="text-base opacity-80">
                  Join a rapidly growing community of passionate developers from various 
                  backgrounds and skill levels.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1">
                <CheckIcon />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Transparent & Fair</h3>
                <p className="text-base opacity-80">
                  Clear pricing, straightforward policies, and a commitment to treating all 
                  users with respect and fairness.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Join the devTinder Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're looking for collaborators, mentors, or just fellow developers to 
            chat with, devTinder is the place to be.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="btn btn-lg bg-white text-primary hover:bg-base-200">
              Get Started Free
            </button>
            <button className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary">
              Learn More
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mt-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
          <p className="text-lg text-center mb-6">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a 
              href="mailto:raushankumarsaw15@gmail.com" 
              className="btn btn-info"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Email Us
            </a>
            <a 
              href="tel:+918252341916" 
              className="btn btn-success"
            >
              <Users className="w-5 h-5 mr-2" />
              Call Us
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

// Helper component for checkmarks
const CheckIcon = () => (
  <svg 
    className="w-6 h-6 text-success" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M5 13l4 4L19 7" 
    />
  </svg>
);

export default AboutUs;
