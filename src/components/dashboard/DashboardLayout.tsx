import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  FileText, 
  Award, 
  Briefcase, 
  Users, 
  CreditCard, 
  HelpCircle, 
  Settings,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  LogOut,
  Bell,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
  subItems?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { 
    name: 'Academics', 
    icon: BookOpen, 
    href: '/lms',
    subItems: [
      { name: 'My Courses', href: '/lms' },
      { name: 'Academic Calendar', href: '/calendar' },
      { name: 'Syllabus', href: '/syllabus' },
    ]
  },
  { 
    name: 'Assessments', 
    icon: FileText, 
    href: '/assessments',
    subItems: [
      { name: 'Quizzes', href: '/assessments' },
      { name: 'Assignments', href: '/assignments' },
      { name: 'Exams', href: '/exams' },
    ]
  },
  { name: 'Certifications', icon: Award, href: '/certifications' },
  { name: 'Career Services', icon: Briefcase, href: '/careers' },
  { name: 'Community', icon: Users, href: '/community' },
  { 
    name: 'Fees & Payments', 
    icon: CreditCard, 
    href: '/payments',
    subItems: [
      { name: 'Fee Structure', href: '/payments' },
      { name: 'Payment History', href: '/payment-history' },
    ]
  },
  { name: 'Support', icon: HelpCircle, href: '/support' },
];

interface DashboardSidebarProps {
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ isMobileOpen, setIsMobileOpen }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Academics']);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-sidebar transform transition-transform duration-300
        lg:translate-x-0 lg:static lg:z-auto
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-sidebar-border">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold text-sidebar-foreground">CONSULTIX</span>
            <p className="text-xs text-sidebar-foreground/60">Digital Campus</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
          {navItems.map((item) => (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`sidebar-item w-full justify-between ${
                      expandedItems.includes(item.name) ? 'bg-sidebar-accent' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </div>
                    {expandedItems.includes(item.name) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedItems.includes(item.name) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          onClick={() => setIsMobileOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(subItem.href)
                              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                              : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`sidebar-item ${isActive(item.href) ? 'active' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => navigate('/')}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userName: string;
}

const DashboardHeader = ({ onMenuClick, userName }: DashboardHeaderProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden p-2 hover:bg-muted rounded-lg"
        onClick={onMenuClick}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Title */}
      <div className="hidden lg:block">
        <h1 className="text-xl font-semibold text-foreground">
          Welcome back, {userName}!
        </h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 hover:bg-muted rounded-lg">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <button className="relative p-2 hover:bg-muted rounded-lg">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
        </button>
        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-10 h-10 bg-gradient-navy rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold">AT</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground">BCA - Semester V</p>
          </div>
        </div>
      </div>
    </header>
  );
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const userName = "Aditya Tiwari";

  return (
    <div className="min-h-screen bg-muted flex">
      <DashboardSidebar 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen} 
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader 
          onMenuClick={() => setIsMobileOpen(true)}
          userName={userName}
        />
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
