import React, { useState, useEffect, memo, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Globe, User, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { base44 } from "@/api/base44Client";

// Shared auth state to avoid multiple API calls - optimized for non-authenticated users
let authPromise = null;
let cachedAuthState = null;

// Check if there's a session indicator in localStorage first (fast check)
const hasSessionIndicator = () => {
  try {
    // Check for any auth-related localStorage keys that indicate a logged-in session
    return localStorage.getItem('base44_session') !== null || 
           document.cookie.includes('base44') ||
           sessionStorage.getItem('base44_auth') !== null;
  } catch {
    return false;
  }
};

const getAuthState = () => {
  if (cachedAuthState !== null) return Promise.resolve(cachedAuthState);
  
  // Quick path for clearly non-authenticated users - skip API call entirely
  if (!hasSessionIndicator() && !authPromise) {
    // Still make the call but with lower priority, assume not authenticated initially
    cachedAuthState = { user: null, isAuthenticated: false, pending: true };
    
    authPromise = base44.auth.me()
      .then(user => { 
        cachedAuthState = { user, isAuthenticated: true, pending: false }; 
        return cachedAuthState; 
      })
      .catch(() => { 
        cachedAuthState = { user: null, isAuthenticated: false, pending: false }; 
        return cachedAuthState; 
      });
    
    // Return immediately with non-authenticated state for faster render
    return Promise.resolve(cachedAuthState);
  }
  
  if (!authPromise) {
    authPromise = base44.auth.me()
      .then(user => { cachedAuthState = { user, isAuthenticated: true, pending: false }; return cachedAuthState; })
      .catch(() => { cachedAuthState = { user: null, isAuthenticated: false, pending: false }; return cachedAuthState; });
  }
  return authPromise;
};

function GetStartedButtonMobile({ scrollToSection, t }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get auth state immediately - no defer needed since getAuthState is now optimized
    getAuthState().then(state => { 
      setIsAuthenticated(state.isAuthenticated); 
    });
  }, []);

  // Always show button immediately - hide only after confirmed authenticated
  if (isAuthenticated) return null;

  return (
    <Button
      onClick={() => scrollToSection("contact")}
      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
    >
      {t.nav.getStarted}
    </Button>
  );
}

function GetStartedButton({ scrollToSection, t }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getAuthState().then(state => { 
      setIsAuthenticated(state.isAuthenticated); 
    });
  }, []);

  // Always show button immediately - hide only after confirmed authenticated
  if (isAuthenticated) return null;

  return (
    <Button
      onClick={() => scrollToSection("contact")}
      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6"
    >
      {t.nav.getStarted}
    </Button>
  );
}

const UserMenuButton = memo(function UserMenuButton() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    getAuthState().then(state => { 
      setUser(state.user); 
      setChecked(true);
      
      // If auth state is pending, listen for updates
      if (state.pending) {
        // Re-check after API call completes
        setTimeout(() => {
          getAuthState().then(finalState => {
            if (finalState.user !== state.user) {
              setUser(finalState.user);
            }
          });
        }, 500);
      }
    });
  }, []);

  // Show login button immediately for non-authenticated users (fast path)
  if (!user) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => base44.auth.redirectToLogin()}
        className="text-gray-700 hover:text-blue-900"
      >
        <User className="w-4 h-4 mr-2" />
        {language === 'es' ? 'Iniciar Sesión' : 'Log In'}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-gray-700 hover:text-blue-900">
          <User className="w-4 h-4 mr-2" />
          {user.full_name || user.email?.split('@')[0]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <Link to={createPageUrl("UserDashboard")}>
          <DropdownMenuItem className="cursor-pointer">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            {language === 'es' ? 'Mi Panel' : 'My Dashboard'}
          </DropdownMenuItem>
        </Link>
        {user.role === 'admin' && (
          <Link to={createPageUrl("AdminDashboard")}>
            <DropdownMenuItem className="cursor-pointer">
              <Shield className="w-4 h-4 mr-2" />
              {language === 'es' ? 'Admin' : 'Admin'}
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer text-red-600"
          onClick={() => base44.auth.logout()}
        >
          <LogOut className="w-4 h-4 mr-2" />
          {language === 'es' ? 'Cerrar Sesión' : 'Log Out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

const LayoutContent = memo(function LayoutContent({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const t = useMemo(() => translations[language], [language]);

  // Preload critical resources for LCP optimization
  useEffect(() => {
    // Preload logo image (critical for LCP)
    const logoLink = document.createElement('link');
    logoLink.rel = 'preload';
    logoLink.as = 'image';
    logoLink.href = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/d19c70359_logo5.png';
    logoLink.fetchPriority = 'high';
    document.head.appendChild(logoLink);

    // Preconnect to external domains (CDN and API)
    const preconnectCDN = document.createElement('link');
    preconnectCDN.rel = 'preconnect';
    preconnectCDN.href = 'https://qtrypzzcjebvfcihiynt.supabase.co';
    document.head.appendChild(preconnectCDN);

    // Preconnect to base44 API (reduces auth call latency)
    const preconnectAPI = document.createElement('link');
    preconnectAPI.rel = 'preconnect';
    preconnectAPI.href = 'https://api.base44.app';
    document.head.appendChild(preconnectAPI);

    // DNS prefetch for base44
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = 'https://api.base44.app';
    document.head.appendChild(dnsPrefetch);

    return () => {
      if (logoLink.parentNode) document.head.removeChild(logoLink);
      if (preconnectCDN.parentNode) document.head.removeChild(preconnectCDN);
      if (preconnectAPI.parentNode) document.head.removeChild(preconnectAPI);
      if (dnsPrefetch.parentNode) document.head.removeChild(dnsPrefetch);
    };
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Critical CSS inlined for faster FCP - variables needed immediately */}
      <style>{`
        :root {
          --costa-blue: #002B7F;
          --costa-red: #CE1126;
          --costa-white: #FFFFFF;
        }
        /* Critical above-the-fold styles */
        .nav-transition { transition: background-color 0.3s, box-shadow 0.3s; }
      `}</style>
      
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 nav-transition ${
          isScrolled || isMobileMenuOpen
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
                to={createPageUrl("Home")}
                className="flex items-center group"
              >
                <img 
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/d19c70359_logo5.png" 
                  alt="PuraWeb CR" 
                  className="h-10 md:h-12 w-auto transform group-hover:scale-105 transition-transform"
                  fetchpriority="high"
                  decoding="async"
                  width="120"
                  height="48"
                />
              </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to={createPageUrl("Servicios")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.services}
              </Link>
              <Link
                to={createPageUrl("Planes")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.pricing}
              </Link>
              <Link
                to={createPageUrl("Nosotros")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {language === 'es' ? 'Nosotros' : 'About'}
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.contact}
              </button>
              <Link
                to={createPageUrl("Support")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {language === 'es' ? 'Soporte' : 'Support'}
              </Link>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors font-medium"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-bold">{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
              <UserMenuButton />
              <GetStartedButton scrollToSection={scrollToSection} t={t} />
              </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-900"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3 border-t pt-4">
              <Link
                to={createPageUrl("Servicios")}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {t.nav.services}
              </Link>
              <Link
                to={createPageUrl("Planes")}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {t.nav.pricing}
              </Link>
              <Link
                to={createPageUrl("Nosotros")}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {language === 'es' ? 'Nosotros' : 'About'}
              </Link>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {t.nav.contact}
              </button>
              <Link
                to={createPageUrl("Support")}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {language === 'es' ? 'Soporte' : 'Support'}
              </Link>
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors font-medium"
              >
                <Globe className="w-5 h-5" />
                {language === 'es' ? 'English' : 'Español'}
              </button>
              <div className="flex justify-center">
                <UserMenuButton />
              </div>
              <GetStartedButtonMobile scrollToSection={scrollToSection} t={t} />
              </div>
              )}
              </div>
              </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/d19c70359_logo5.png" 
                    alt="PuraWeb CR" 
                    className="h-10 w-auto"
                  />
                  </div>
                <p className="text-blue-200 text-sm">
                {t.footer.description}
              </p>
              </div>
              <div>
              <h3 className="font-semibold mb-4">{t.footer.servicesTitle}</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>{t.footer.webDev}</li>
                <li>{t.footer.ecommerce}</li>
                <li>{t.footer.customApps}</li>
                <li>{t.footer.maintenance}</li>
              </ul>
              </div>
              <div>
              <h3 className="font-semibold mb-4">{t.footer.companyTitle}</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>{t.footer.about}</li>
                <li>{t.footer.process}</li>
                <li>{t.footer.caseStudies}</li>
                <li>{t.footer.contact}</li>
              </ul>
              </div>
              <div>
              <h3 className="font-semibold mb-4">{t.footer.contactTitle}</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>{t.footer.location}</li>
                <li>info@webcraftcr.com</li>
                <li>+506 1234 5678</li>
              </ul>
              </div>
              </div>
              <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-blue-200">
              <p>{t.footer.copyright}</p>
          </div>
          </div>
          </footer>
          </div>
          );
          });

          export default function Layout({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <LayoutContent children={children} currentPageName={currentPageName} />
    </LanguageProvider>
  );
}