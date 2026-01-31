import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  CreditCard, 
  Download, 
  CheckCircle, 
  Clock, 
  IndianRupee,
  Calendar,
  FileText,
  AlertCircle
} from 'lucide-react';

interface FeeStructure {
  semester: string;
  tuitionFee: number;
  examFee: number;
  libraryFee: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
}

const feeStructure: FeeStructure[] = [
  {
    semester: 'Semester V (Current)',
    tuitionFee: 35000,
    examFee: 2500,
    libraryFee: 1500,
    total: 39000,
    status: 'paid',
    dueDate: '2025-12-31',
    paidDate: '2025-12-15',
  },
  {
    semester: 'Semester VI (Upcoming)',
    tuitionFee: 35000,
    examFee: 2500,
    libraryFee: 1500,
    total: 39000,
    status: 'pending',
    dueDate: '2026-06-30',
  },
];

interface PaymentHistory {
  id: string;
  date: string;
  description: string;
  amount: number;
  method: string;
  status: 'success' | 'failed' | 'pending';
  receiptNo: string;
}

const paymentHistory: PaymentHistory[] = [
  {
    id: '1',
    date: '2025-12-15',
    description: 'Semester V Tuition Fee',
    amount: 35000,
    method: 'Credit Card',
    status: 'success',
    receiptNo: 'RCP-2025-001234',
  },
  {
    id: '2',
    date: '2025-12-15',
    description: 'Semester V Exam Fee',
    amount: 2500,
    method: 'Credit Card',
    status: 'success',
    receiptNo: 'RCP-2025-001235',
  },
  {
    id: '3',
    date: '2025-12-15',
    description: 'Semester V Library Fee',
    amount: 1500,
    method: 'Credit Card',
    status: 'success',
    receiptNo: 'RCP-2025-001236',
  },
  {
    id: '4',
    date: '2025-06-20',
    description: 'Semester IV Fees',
    amount: 38000,
    method: 'Net Banking',
    status: 'success',
    receiptNo: 'RCP-2025-000789',
  },
];

const Payments = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<FeeStructure | null>(null);

  const handlePayNow = (fee: FeeStructure) => {
    setSelectedSemester(fee);
    setShowPaymentModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
      case 'success':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/20 text-success">
            <CheckCircle className="w-3 h-3" />
            Paid
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case 'overdue':
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive">
            <AlertCircle className="w-3 h-3" />
            Overdue
          </span>
        );
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Fees & Payments</h1>
          <p className="text-muted-foreground">Manage your fee payments and view transaction history</p>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <span className="text-muted-foreground">Total Paid</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(77000)}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-muted-foreground">Pending</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{formatCurrency(39000)}</p>
          </div>

          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="text-muted-foreground">Next Due Date</span>
            </div>
            <p className="text-2xl font-bold text-foreground">Jun 30, 2026</p>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Fee Structure</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-medium text-muted-foreground">Semester</th>
                  <th className="px-5 py-3 text-right text-sm font-medium text-muted-foreground">Tuition</th>
                  <th className="px-5 py-3 text-right text-sm font-medium text-muted-foreground">Exam</th>
                  <th className="px-5 py-3 text-right text-sm font-medium text-muted-foreground">Library</th>
                  <th className="px-5 py-3 text-right text-sm font-medium text-muted-foreground">Total</th>
                  <th className="px-5 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-center text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {feeStructure.map((fee, index) => (
                  <tr key={index} className="hover:bg-muted/50">
                    <td className="px-5 py-4">
                      <p className="font-medium text-foreground">{fee.semester}</p>
                      <p className="text-xs text-muted-foreground">Due: {fee.dueDate}</p>
                    </td>
                    <td className="px-5 py-4 text-right text-foreground">{formatCurrency(fee.tuitionFee)}</td>
                    <td className="px-5 py-4 text-right text-foreground">{formatCurrency(fee.examFee)}</td>
                    <td className="px-5 py-4 text-right text-foreground">{formatCurrency(fee.libraryFee)}</td>
                    <td className="px-5 py-4 text-right font-semibold text-foreground">{formatCurrency(fee.total)}</td>
                    <td className="px-5 py-4 text-center">{getStatusBadge(fee.status)}</td>
                    <td className="px-5 py-4 text-center">
                      {fee.status === 'paid' ? (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                          Receipt
                        </Button>
                      ) : (
                        <Button variant="gold" size="sm" onClick={() => handlePayNow(fee)}>
                          <CreditCard className="w-4 h-4" />
                          Pay Now
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Payment History</h2>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="px-5 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                  <th className="px-5 py-3 text-right text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="px-5 py-3 text-center text-sm font-medium text-muted-foreground">Method</th>
                  <th className="px-5 py-3 text-center text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3 text-center text-sm font-medium text-muted-foreground">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paymentHistory.map((payment) => (
                  <tr key={payment.id} className="hover:bg-muted/50">
                    <td className="px-5 py-4 text-foreground">{payment.date}</td>
                    <td className="px-5 py-4 text-foreground">{payment.description}</td>
                    <td className="px-5 py-4 text-right font-medium text-foreground">{formatCurrency(payment.amount)}</td>
                    <td className="px-5 py-4 text-center text-muted-foreground">{payment.method}</td>
                    <td className="px-5 py-4 text-center">{getStatusBadge(payment.status)}</td>
                    <td className="px-5 py-4 text-center">
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && selectedSemester && (
          <div className="fixed inset-0 bg-foreground/50 flex items-center justify-center z-50 p-4">
            <div className="bg-card rounded-xl max-w-md w-full p-6 animate-scale-in">
              <h3 className="text-xl font-bold text-foreground mb-4">Make Payment</h3>
              
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Amount to Pay</p>
                <p className="text-3xl font-bold text-foreground">{formatCurrency(selectedSemester.total)}</p>
                <p className="text-sm text-muted-foreground mt-1">{selectedSemester.semester}</p>
              </div>

              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-foreground">Select Payment Method</p>
                {['Credit/Debit Card', 'Net Banking', 'UPI', 'EMI Options'].map((method) => (
                  <button
                    key={method}
                    className="w-full p-3 border border-border rounded-lg text-left hover:border-primary transition-colors flex items-center gap-3"
                  >
                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                    <span className="text-foreground">{method}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowPaymentModal(false)}>
                  Cancel
                </Button>
                <Button variant="gold" className="flex-1" onClick={() => {
                  alert('Redirecting to payment gateway...');
                  setShowPaymentModal(false);
                }}>
                  Proceed to Pay
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Payments;
