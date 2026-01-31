import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    programs: [
      { name: 'BCA', href: '/#programs' },
      { name: 'MBA', href: '/#programs' },
      { name: 'MCA', href: '/#programs' },
      { name: 'BBA', href: '/#programs' },
      { name: 'B.Com', href: '/#programs' },
    ],
    resources: [
      { name: 'Student Portal', href: '/dashboard' },
      { name: 'LMS', href: '/lms' },
      { name: 'Career Services', href: '/#careers' },
      { name: 'Library', href: '/library' },
      { name: 'Support', href: '/support' },
    ],
    company: [
      { name: 'About Us', href: '/#about' },
      { name: 'Contact', href: '/#contact' },
      { name: 'Accreditation', href: '/accreditation' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-gradient-navy text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-primary-foreground">CONSULTIX</span>
                <span className="text-xs text-primary-foreground/70 -mt-1">UNIVERSITY ONLINE</span>
              </div>
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-sm">
              Empowering students with world-class online education and career opportunities. Join our community of 50,000+ learners.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Programs Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                <span className="text-primary-foreground/70 text-sm">
                  123 Education Street, Knowledge City, 400001
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-secondary" />
                <a href="tel:+911234567890" className="text-primary-foreground/70 hover:text-secondary text-sm">
                  +91 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:info@consultix.edu" className="text-primary-foreground/70 hover:text-secondary text-sm">
                  info@consultix.edu
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024-2026 Consultix University. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="badge-gold">UGC Approved</span>
            <span className="badge-gold">NAAC A+</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
