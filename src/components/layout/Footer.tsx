import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { FiInstagram, FiTwitter, FiFacebook, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  useEffect(() => {
    // Animate footer elements on scroll
    gsap.fromTo('.footer-content', 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.footer-content',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', path: '/collections/new' },
      { name: 'Best Sellers', path: '/collections/bestsellers' },
      { name: 'Sale', path: '/collections/sale' },
      { name: 'Gift Cards', path: '/gift-cards' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Size Guide', path: '/size-guide' }
    ]
  };

  const socialLinks = [
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' }
  ];

  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link to="/" className="text-3xl font-bold mb-4 block">
                NEON<span className="text-primary">PULSE</span>
              </Link>
              <p className="text-background/80 mb-6 max-w-md">
                Discover the future of fashion with our cutting-edge designs and 
                sustainable practices. Where style meets innovation.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FiMail className="h-4 w-4 text-primary" />
                  <span className="text-sm text-background/80">hello@neonpulse.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiPhone className="h-4 w-4 text-primary" />
                  <span className="text-sm text-background/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FiMapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm text-background/80">New York, NY 10001</span>
                </div>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="font-semibold mb-4 text-primary">Shop</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-sm text-background/80 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold mb-4 text-primary">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-sm text-background/80 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4 text-primary">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path}
                      className="text-sm text-background/80 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="border-t border-background/20 pt-8 mb-8">
            <div className="max-w-md">
              <h3 className="font-semibold mb-2 text-primary">Stay Updated</h3>
              <p className="text-sm text-background/80 mb-4">
                Subscribe to our newsletter for exclusive deals and new arrivals.
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-background/10 border border-background/20 rounded-md text-background placeholder-background/60 focus:outline-none focus:border-primary"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary-glow transition-colors duration-300 font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-sm text-background/60">
                © 2024 NeonPulse. All rights reserved.
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-background/10 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6 text-sm text-background/60">
                <Link to="/privacy" className="hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="hover:text-primary transition-colors duration-300">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;