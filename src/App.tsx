import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

// Critical pages - always load immediately
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Check if we're in react-snap prerendering mode
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isReactSnap = typeof window !== 'undefined' && (window as any).__REACT_SNAP__;

// Conditional lazy loading - only in production runtime (not during react-snap)
// This gives us the TBT benefits without breaking prerendering
// Use dynamic import for both cases (works in browser)
const Services = isReactSnap ? lazy(() => import("./pages/Services")) : lazy(() => import("./pages/Services"));
const ServiceDetail = isReactSnap ? lazy(() => import("./pages/ServiceDetail")) : lazy(() => import("./pages/ServiceDetail"));
const About = isReactSnap ? lazy(() => import("./pages/About")) : lazy(() => import("./pages/About"));
const Geography = isReactSnap ? lazy(() => import("./pages/Geography")) : lazy(() => import("./pages/Geography"));
const Reviews = isReactSnap ? lazy(() => import("./pages/Reviews")) : lazy(() => import("./pages/Reviews"));
const Contacts = isReactSnap ? lazy(() => import("./pages/Contacts")) : lazy(() => import("./pages/Contacts"));
const FAQ = isReactSnap ? lazy(() => import("./pages/FAQ")) : lazy(() => import("./pages/FAQ"));
const NewsList = isReactSnap ? lazy(() => import("./pages/NewsList")) : lazy(() => import("./pages/NewsList"));
const NewsArticle = isReactSnap ? lazy(() => import("./pages/NewsArticle")) : lazy(() => import("./pages/NewsArticle"));
const PrivacyPolicy = isReactSnap ? lazy(() => import("./pages/PrivacyPolicy")) : lazy(() => import("./pages/PrivacyPolicy"));

// Admin pages - lazy load (rarely accessed, never prerendered)
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const UpdatePassword = lazy(() => import("./pages/admin/UpdatePassword"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Applications = lazy(() => import("./pages/admin/Applications"));
const News = lazy(() => import("./pages/admin/News"));

// Context providers
import { AdminProvider } from "./contexts/AdminContext";
import { ApplicationModalProvider } from "./contexts/ApplicationModalContext";

// Lenis smooth scroll
import { useLenis } from "./hooks/use-lenis";

// Optimized QueryClient with reduced initial overhead
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 минут - данные считаются свежими
      cacheTime: 10 * 60 * 1000, // 10 минут - данные хранятся в кэше
      refetchOnWindowFocus: false, // Не перезапрашивать при фокусе окна
      refetchOnMount: false, // Не перезапрашивать при монтировании компонента
      retry: 1, // Одна попытка вместо трёх
    },
  },
});

// Lightweight loading fallback (reduces CLS)
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-primary">
    <div className="text-white/60">Загрузка...</div>
  </div>
);

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

// Content wrapper that uses router hooks
const AppContent = () => {
  // Initialize Lenis smooth scroll (must be inside BrowserRouter)
  useLenis();

  return (
    <ApplicationModalProvider>
      <MainLayout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
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
            <Route path="/admin/update-password" element={<UpdatePassword />} />
            <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
            <Route path="/admin/applications" element={<AdminLayout><Applications /></AdminLayout>} />
            <Route path="/admin/news" element={<AdminLayout><News /></AdminLayout>} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ApplicationModalProvider>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AdminProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </AdminProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
