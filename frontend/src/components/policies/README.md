# devTinder Policy Pages - React Components

This package contains all the policy and informational pages for the devTinder platform, built with React, Tailwind CSS, DaisyUI, and Lucide React icons.

## Components Included

1. **PrivacyPolicy.jsx** - Comprehensive privacy policy page
2. **TermsOfService.jsx** - Terms of service agreement page
3. **RefundPolicy.jsx** - Refund and cancellation policy page
4. **ContactUs.jsx** - Contact information and form page
5. **AboutUs.jsx** - About the platform page
6. **Team.jsx** - Team information page

## Installation

### Prerequisites

Make sure you have these dependencies installed in your React project:

```bash
npm install lucide-react
```

### Tailwind CSS & DaisyUI Setup

If you haven't already, install Tailwind CSS and DaisyUI:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install daisyui
```

### Configure tailwind.config.js

```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"], // Add your preferred themes
  },
}
```

### Add Tailwind directives to your CSS

In your main CSS file (e.g., `index.css` or `App.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Usage

### 1. Copy Components to Your Project

Copy all `.jsx` files to your `src/components` or `src/pages` directory.

### 2. Import and Use in Your Router

```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import RefundPolicy from './components/RefundPolicy';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Team from './components/Team';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

### 3. Add Navigation Links

Create a footer or navigation component with links to these pages:

```javascript
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <div>
        <span className="footer-title">Legal</span>
        <Link to="/privacy-policy" className="link link-hover">Privacy Policy</Link>
        <Link to="/terms-of-service" className="link link-hover">Terms Of Service</Link>
        <Link to="/refund-policy" className="link link-hover">Refund Policy</Link>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <Link to="/about-us" className="link link-hover">About Us</Link>
        <Link to="/team" className="link link-hover">Team</Link>
        <Link to="/contact-us" className="link link-hover">Contact Us</Link>
      </div>
    </footer>
  );
}
```

## Customization

### Change Colors/Themes

You can customize the appearance by:

1. **Changing DaisyUI themes** in `tailwind.config.js`
2. **Modifying color classes** in components (e.g., `bg-primary`, `text-secondary`)
3. **Adjusting the header gradients** in each component

### Update Contact Information

All contact information is currently set to:
- **Email:** raushankumarsaw15@gmail.com
- **Phone:** +91 8252341916

To update, search and replace these values across all files.

### Modify Content

Each component is well-structured with clear sections. Simply locate the section you want to modify and update the content.

## Component Features

### Privacy Policy
- Comprehensive coverage of data collection and usage
- Information about OTP verification and security
- Premium subscription and payment details
- User rights and data protection

### Terms of Service
- User eligibility and account requirements
- Free and premium feature descriptions
- Payment terms and Razorpay integration
- User conduct guidelines
- Liability disclaimers

### Refund Policy
- Clear refund eligibility criteria
- Step-by-step refund request process
- Timeline for refund processing
- Razorpay payment processing information
- Partial refund policies

### Contact Us
- Interactive contact form (with state management)
- Multiple contact methods (email, phone)
- FAQ accordion section
- Business hours information
- Quick contact cards

### About Us
- Platform story and mission
- Feature highlights
- How devTinder works (step-by-step)
- Core values
- Join community CTA

### Team
- Founder/team information
- Team values and culture
- Journey timeline
- Partnership information
- Join team CTA

## Contact Form Integration

The Contact Us component includes a form with local state management. To integrate with your backend:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      setSubmitted(true);
      // Clear form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};
```

## Responsive Design

All components are fully responsive and work seamlessly on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktops (1024px+)
- Large screens (1280px+)

## Browser Support

These components work on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## SEO Considerations

For better SEO, consider adding:

1. **Meta tags** for each page
2. **Structured data** (JSON-LD)
3. **Proper heading hierarchy**
4. **Alt text for images** (when you add them)

Example:

```javascript
import { Helmet } from 'react-helmet';

function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - devTinder</title>
        <meta name="description" content="Learn how devTinder protects your privacy and handles your data." />
      </Helmet>
      {/* Component content */}
    </>
  );
}
```

## Accessibility

All components follow accessibility best practices:
- Semantic HTML elements
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast

## Support

For issues or questions:
- **Email:** raushankumarsaw15@gmail.com
- **Phone:** +91 8252341916

## License

These components are created for devTinder. Customize as needed for your project.

## Notes for Razorpay Integration

For Razorpay payment gateway approval, these policy pages provide:
- Clear terms of service
- Transparent refund policy
- Privacy policy covering payment data
- Contact information for support

Make sure to:
1. Update all placeholder content with actual operational details
2. Verify all legal information with a lawyer
3. Ensure payment processing details match Razorpay's requirements
4. Keep policies updated as your service evolves

---

**Created for devTinder** - Connecting Developers Worldwide 🚀
