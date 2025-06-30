
import { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import JSPuterAI from "./components/JSPuterAI";

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Location from "./pages/Location";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard Pages
import Dashboard from "./pages/Dashboard";
import Articles from "./pages/dashboard/Articles";
import ArticleEditor from "./pages/dashboard/ArticleEditor";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/tentang" element={<About />} />
              <Route path="/layanan" element={<Services />} />
              <Route path="/galeri" element={<Gallery />} />
              <Route path="/lokasi" element={<Location />} />
              <Route path="/kontak" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/artikel/:slug" element={<ArticleDetail />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Dashboard Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute requiredRole="viewer">
                    <Dashboard />
                  </ProtectedRoute>
                } 
              >
                <Route 
                  path="articles" 
                  element={
                    <ProtectedRoute requiredRole="editor">
                      <Articles />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="articles/:id" 
                  element={
                    <ProtectedRoute requiredRole="editor">
                      <ArticleEditor />
                    </ProtectedRoute>
                  } 
                />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollToTop />
            <JSPuterAI />
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
