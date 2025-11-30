import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Geography from "./pages/Geography";
import Reviews from "./pages/Reviews";
import Contacts from "./pages/Contacts";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import NewsList from "./pages/NewsList";
import NewsArticle from "./pages/NewsArticle";
import PrivacyPolicy from "./pages/PrivacyPolicy";

// Admin imports
import { AdminProvider } from "./contexts/AdminContext";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Applications from "./pages/admin/Applications";
import News from "./pages/admin/News";

// Modal imports
import { ApplicationModalProvider } from "./contexts/ApplicationModalContext";

const queryClient = new QueryClient();

// Layout wrapper that conditionally shows Header/Footer
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ApplicationModalProvider>
            <ScrollToTop />
            <MainLayout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/news" element={<NewsList />} />
              <Route path="/news/:slug" element={<NewsArticle />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
              <Route path="/admin/applications" element={<AdminLayout><Applications /></AdminLayout>} />
              <Route path="/admin/news" element={<AdminLayout><News /></AdminLayout>} />
              
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
          </ApplicationModalProvider>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
