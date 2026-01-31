import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  Send,
  ChevronDown,
  ChevronUp,
  Search,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I access my course materials?',
    answer: 'You can access all course materials through the Learning Portal (LMS). Navigate to "My Courses" from the dashboard, select your course, and you will find all lectures, documents, and resources organized by modules.',
    category: 'LMS',
  },
  {
    id: '2',
    question: 'How do I submit assignments?',
    answer: 'Assignments can be submitted through the Assessments section. Go to Assessments > Assignments, find the relevant assignment, and click "Submit". You can upload files in PDF, DOC, or ZIP format up to 25MB.',
    category: 'Assessments',
  },
  {
    id: '3',
    question: 'How can I pay my semester fees?',
    answer: 'Fees can be paid online through the Fee & Payments section. We accept credit/debit cards, net banking, and UPI payments. You can also opt for EMI options for fee payment.',
    category: 'Payments',
  },
  {
    id: '4',
    question: 'How do I download my certificates?',
    answer: 'Once you complete a certification, go to the Certifications section, find your earned certificate, and click "View Certificate". From there, you can download it as a PDF or share it directly to LinkedIn.',
    category: 'Certifications',
  },
  {
    id: '5',
    question: 'What should I do if I miss a live class?',
    answer: 'All live classes are recorded and available in the course materials within 24 hours. You can access recordings from the respective course page under the "Recorded Sessions" tab.',
    category: 'LMS',
  },
  {
    id: '6',
    question: 'How do I contact my faculty?',
    answer: 'You can reach out to faculty through the "Post Your Queries" section or send them a message through the internal mail system. Faculty typically respond within 24-48 hours.',
    category: 'Support',
  },
];

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved';
  date: string;
}

const tickets: Ticket[] = [
  { id: 'TKT001', subject: 'Unable to access IoT course videos', status: 'resolved', date: '2026-01-25' },
  { id: 'TKT002', subject: 'Fee payment not reflecting in dashboard', status: 'in-progress', date: '2026-01-28' },
];

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketCategory, setTicketCategory] = useState('General');
  const [showTicketForm, setShowTicketForm] = useState(false);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitTicket = () => {
    if (ticketSubject && ticketDescription) {
      alert('Support ticket submitted successfully! You will receive a response within 24 hours.');
      setTicketSubject('');
      setTicketDescription('');
      setShowTicketForm(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-1 bg-info/20 text-info text-xs rounded-full">Open</span>;
      case 'in-progress':
        return <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs rounded-full">In Progress</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-full">Resolved</span>;
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">How can we help you?</h1>
          <p className="text-muted-foreground mb-6">Search our FAQ or contact support for assistance</p>
          
          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Contact Options */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-5 text-center hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
            <p className="text-sm text-muted-foreground mb-2">Mon-Sat, 9AM-6PM</p>
            <a href="tel:+911234567890" className="text-primary font-medium">+91 123 456 7890</a>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 text-center hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
            <p className="text-sm text-muted-foreground mb-2">24-48 hour response</p>
            <a href="mailto:support@consultix.edu" className="text-primary font-medium">support@consultix.edu</a>
          </div>

          <div className="bg-card rounded-xl border border-border p-5 text-center hover:border-primary/30 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground mb-2">Available 24/7</p>
            <Button variant="navyOutline" size="sm">Start Chat</Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-foreground">{faq.question}</span>
                  </div>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="p-4 pt-0 text-muted-foreground bg-muted/50">
                    <p className="pl-8">{faq.answer}</p>
                    <span className="inline-block mt-2 ml-8 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {faq.category}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Tickets */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">Your Support Tickets</h2>
            <Button variant="gold" size="sm" onClick={() => setShowTicketForm(!showTicketForm)}>
              {showTicketForm ? 'Cancel' : 'New Ticket'}
            </Button>
          </div>

          {showTicketForm && (
            <div className="mb-6 p-4 bg-muted rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select 
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full p-2 border border-border rounded-lg bg-card text-foreground"
                >
                  <option>General</option>
                  <option>Technical Issue</option>
                  <option>Payment</option>
                  <option>Course Content</option>
                  <option>Certification</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  className="w-full p-2 border border-border rounded-lg bg-card text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Description</label>
                <textarea
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  placeholder="Provide detailed information about your issue..."
                  rows={4}
                  className="w-full p-2 border border-border rounded-lg bg-card text-foreground resize-none"
                />
              </div>
              <Button variant="gold" onClick={handleSubmitTicket}>
                <Send className="w-4 h-4" />
                Submit Ticket
              </Button>
            </div>
          )}

          {tickets.length > 0 ? (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    {ticket.status === 'resolved' ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-secondary" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{ticket.subject}</p>
                      <p className="text-xs text-muted-foreground">{ticket.id} • {ticket.date}</p>
                    </div>
                  </div>
                  {getStatusBadge(ticket.status)}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No support tickets yet</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
