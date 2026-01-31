import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import LMS from "./pages/LMS";
import CourseDetail from "./pages/CourseDetail";
import Assessments from "./pages/Assessments";
import Certifications from "./pages/Certifications";
import Careers from "./pages/Careers";
import Community from "./pages/Community";
import Support from "./pages/Support";
import Payments from "./pages/Payments";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          
          {/* Student Portal Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/overview" element={<Dashboard />} />
          <Route path="/lms" element={<LMS />} />
          <Route path="/lms/course/:id" element={<CourseDetail />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/community" element={<Community />} />
          <Route path="/support" element={<Support />} />
          <Route path="/payments" element={<Payments />} />
          
          {/* Fallback Routes */}
          <Route path="/apply" element={<Index />} />
          <Route path="/enquiry" element={<Index />} />
          <Route path="/programs" element={<Index />} />
          <Route path="/calendar" element={<LMS />} />
          <Route path="/syllabus" element={<LMS />} />
          <Route path="/assignments" element={<Assessments />} />
          <Route path="/exams" element={<Assessments />} />
          <Route path="/payment-history" element={<Payments />} />
          <Route path="/library" element={<Dashboard />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
