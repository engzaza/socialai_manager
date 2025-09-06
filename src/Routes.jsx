import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import PublishingCalendar from './pages/publishing-calendar';
import MainDashboard from './pages/main-dashboard';
import AIChatbotBuilder from './pages/ai-chatbot-builder';
import SocialMediaAccounts from './pages/social-media-accounts';
import LeadGeneration from './pages/lead-generation';
import ContentCreation from './pages/content-creation';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/main-dashboard" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
          <Route path="/publishing-calendar" element={<ProtectedRoute><PublishingCalendar /></ProtectedRoute>} />
          <Route path="/ai-chatbot-builder" element={<ProtectedRoute><AIChatbotBuilder /></ProtectedRoute>} />
          <Route path="/social-media-accounts" element={<ProtectedRoute><SocialMediaAccounts /></ProtectedRoute>} />
          <Route path="/lead-generation" element={<ProtectedRoute><LeadGeneration /></ProtectedRoute>} />
          <Route path="/content-creation" element={<ProtectedRoute><ContentCreation /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;