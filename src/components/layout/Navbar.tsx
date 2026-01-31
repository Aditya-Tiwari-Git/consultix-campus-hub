import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, GraduationCap } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Programs', href: '/#programs' },
    { name: 'Career Services', href: '/#careers' },
    { name: 'About Us', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <p>Jan'26 Session Admissions Closing Soon. Secure Your Seat today!</p>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-navy rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">CONSULTIX</span>
                <span className="text-xs text-muted-foreground -mt-1">UNIVERSITY ONLINE</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-foreground hover:text-primary font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button variant="navy" size="sm" onClick={() => navigate('/enquiry')}>
                Enquire Now
              </Button>
              <Button variant="gold" size="sm" onClick={() => navigate('/apply')}>
                Apply Now
              </Button>
              <Button variant="navyOutline" size="sm" onClick={() => navigate('/dashboard')}>
                Student Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border animate-fade-in">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-foreground hover:text-primary font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 space-y-2">
                <Button variant="gold" className="w-full" onClick={() => navigate('/apply')}>
                  Apply Now
                </Button>
                <Button variant="navyOutline" className="w-full" onClick={() => navigate('/dashboard')}>
                  Student Login
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
