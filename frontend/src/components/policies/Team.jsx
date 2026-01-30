import React from 'react';
import { Users, Mail, Linkedin, Github, Twitter, Heart, Code, Target } from 'lucide-react';

const Team = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-12 h-12" />
            <h1 className="text-4xl md:text-5xl font-bold">Our Team</h1>
          </div>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto">
            Meet the passionate people building devTinder to help developers connect worldwide
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Team Introduction */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Built by Developers, for Developers</h2>
            <p className="text-lg leading-relaxed mb-4">
              devTinder was created out of a genuine need to make developer networking simpler, 
              more intuitive, and more effective. Our team combines technical expertise with a 
              deep understanding of what developers need to grow and succeed.
            </p>
            <p className="text-lg leading-relaxed">
              We're committed to building a platform that truly serves the developer community, 
              and we're always listening to feedback and working on improvements.
            </p>
          </div>
        </section>

        {/* Founder/Main Team Member */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership</h2>
          
          <div className="bg-base-100 rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              {/* Image Placeholder */}
              <div className="md:w-1/3 bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-12">
                <div className="text-white text-center">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-16 h-16" />
                  </div>
                  <p className="text-sm opacity-90">Founder & Creator</p>
                </div>
              </div>
              
              {/* Info */}
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold mb-2">Raushan Kumar Saw</h3>
                <p className="text-lg text-primary mb-4">Founder & Lead Developer</p>
                
                <p className="text-base leading-relaxed mb-6">
                  Raushan is a passionate developer who recognized the challenge developers face 
                  in finding meaningful connections with peers. With a vision to simplify developer 
                  networking, he created devTinder—a platform that combines the simplicity of 
                  modern matching apps with the specific needs of the developer community.
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Focus Areas:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-primary">Full-Stack Development</span>
                    <span className="badge badge-secondary">Product Design</span>
                    <span className="badge badge-accent">Community Building</span>
                    <span className="badge badge-info">User Experience</span>
                  </div>
                </div>
                
                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <a 
                      href="mailto:raushankumarsaw15@gmail.com" 
                      className="link link-primary"
                    >
                      raushankumarsaw15@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-success" />
                    <a 
                      href="tel:+918252341916" 
                      className="link link-success"
                    >
                      +91 8252341916
                    </a>
                  </div>
                </div>

                {/* Social Links (Optional - can be customized) */}
                <div className="flex gap-4 mt-6">
                  <button className="btn btn-circle btn-outline btn-primary" title="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="btn btn-circle btn-outline btn-neutral" title="GitHub">
                    <Github className="w-5 h-5" />
                  </button>
                  <button className="btn btn-circle btn-outline btn-info" title="Twitter">
                    <Twitter className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">What Drives Us</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Value 1 */}
            <div className="bg-base-100 rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-error text-error-content p-4 rounded-full">
                  <Heart className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Community First</h3>
              <p className="text-base leading-relaxed">
                Every decision we make is guided by what's best for the developer community. 
                Your success is our success, and we're committed to building features that 
                truly help you connect and grow.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-base-100 rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-primary text-primary-content p-4 rounded-full">
                  <Code className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Technical Excellence</h3>
              <p className="text-base leading-relaxed">
                We're developers ourselves, so we understand the importance of clean code, 
                robust security, and seamless user experience. We hold ourselves to the highest 
                technical standards.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-base-100 rounded-lg shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="bg-secondary text-secondary-content p-4 rounded-full">
                  <Target className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Continuous Innovation</h3>
              <p className="text-base leading-relaxed">
                Technology evolves rapidly, and so do we. We're constantly exploring new ideas, 
                listening to feedback, and iterating on the platform to provide the best possible 
                experience.
              </p>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary text-primary-content rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">The Idea</h3>
                <p className="text-base leading-relaxed">
                  It started with a simple observation: finding the right developer connections 
                  shouldn't be this hard. Traditional platforms were too cluttered, too formal, 
                  or not designed with developers in mind.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-secondary text-secondary-content rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Building the Platform</h3>
                <p className="text-base leading-relaxed">
                  We set out to create something different—a platform that's as simple to use 
                  as a modern app, but specifically designed for developer networking. Clean UI, 
                  secure authentication, and intuitive matching.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-accent text-accent-content rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Launch & Growth</h3>
                <p className="text-base leading-relaxed">
                  devTinder launched with core features: profile creation, email verification, 
                  swipe-based connections, and premium chat. The response from the developer 
                  community has been incredible, and we're just getting started.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-info text-info-content rounded-full flex items-center justify-center font-bold text-lg">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">The Future</h3>
                <p className="text-base leading-relaxed">
                  We're continuously working on new features based on user feedback: enhanced 
                  matching algorithms, project collaboration tools, virtual meetups, and much more. 
                  The best is yet to come!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Team CTA */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-xl p-12 text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Want to Join Us?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            We're always looking for talented, passionate individuals who share our vision of 
            connecting developers worldwide. If you're interested in contributing to devTinder, 
            we'd love to hear from you!
          </p>
          <a 
            href="mailto:raushankumarsaw15@gmail.com?subject=Joining%20the%20devTinder%20Team" 
            className="btn btn-lg bg-white text-primary hover:bg-base-200"
          >
            Get In Touch
          </a>
        </section>

        {/* Advisory & Support */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Support & Partnerships</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Payment Partner */}
            <div className="p-6 bg-base-200 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Payment Partner</h3>
              <p className="text-base mb-4">
                We've partnered with <strong>Razorpay</strong>, India's leading payment gateway, 
                to ensure secure, reliable payment processing for our premium subscriptions.
              </p>
              <p className="text-sm opacity-70">
                Razorpay handles all payment transactions with industry-leading security standards.
              </p>
            </div>

            {/* Technology Stack */}
            <div className="p-6 bg-base-200 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Technology Stack</h3>
              <p className="text-base mb-4">
                Built with modern, reliable technologies to ensure the best experience:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-primary">React</span>
                <span className="badge badge-secondary">Node.js</span>
                <span className="badge badge-accent">MongoDB</span>
                <span className="badge badge-info">Tailwind CSS</span>
                <span className="badge badge-success">DaisyUI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-base-100 rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
          <p className="text-lg text-center mb-6">
            Have questions about the team or want to collaborate? Reach out to us!
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a 
              href="mailto:raushankumarsaw15@gmail.com" 
              className="btn btn-primary"
            >
              <Mail className="w-5 h-5 mr-2" />
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

        {/* Thank You Message */}
        <div className="alert alert-success mt-8">
          <Heart className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Thank You!</h3>
            <div className="text-sm">
              To all the developers who've joined devTinder—thank you for being part of our 
              community and helping us build something special together.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Team;
