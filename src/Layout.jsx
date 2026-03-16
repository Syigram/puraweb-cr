import React, { useState, useEffect, useLayoutEffect, memo, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { Menu, X, Globe, User, LogOut, LayoutDashboard, Shield, ChevronDown } from "lucide-react";
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
import Chatbot from "@/components/Chatbot";

// Shared auth state to avoid multiple API calls
let authPromise = null;
let cachedAuthState = null;

const getAuthState = async () => {
  // Return cached state if available
  if (cachedAuthState !== null) {
    return cachedAuthState;
  }
  
  // Use single promise to avoid duplicate requests
  if (!authPromise) {
    authPromise = (async () => {
      try {
        // First check if authenticated (fast check)
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          cachedAuthState = { user: null, isAuthenticated: false };
          return cachedAuthState;
        }
        // Only call me() if authenticated
        const user = await base44.auth.me();
        cachedAuthState = { user, isAuthenticated: true };
        return cachedAuthState;
      } catch {
        cachedAuthState = { user: null, isAuthenticated: false };
        return cachedAuthState;
      }
    })();
  }
  return authPromise;
};

function ContactButtonMobile() {
  const { language } = useLanguage();
  return (
    <Link to={createPageUrl("Contacto")}>
      <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white">
        {language === 'es' ? 'Contacto' : 'Contact'}
      </Button>
    </Link>
  );
}

function ContactButton() {
  const { language } = useLanguage();
  return (
    <Link to={createPageUrl("Contacto")}>
      <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6">
        {language === 'es' ? 'Contacto' : 'Contact'}
      </Button>
    </Link>
  );
}

const UserMenuButton = memo(function UserMenuButton() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    getAuthState().then(state => { 
      setUser(state.user); 
      setIsLoading(false);
    });
  }, []);

  // Show nothing while checking auth status
  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" className="text-gray-700" disabled>
        <User className="w-4 h-4 mr-2 animate-pulse" />
      </Button>
    );
  }

  // Show login button only after confirming user is NOT authenticated
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

  // User is authenticated - show dropdown menu
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
  const [isAboutOpen, setIsAboutOpen] = useState(false);
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

  const handleTopNavigation = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsMobileMenuOpen(false);
    setIsAboutOpen(false);
  }, [location.pathname, location.search]);

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
                onClick={handleTopNavigation}
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
            <div className="hidden md:flex items-center gap-6">
              {/* Primary Navigation Links */}
              <Link
                to={createPageUrl("Home")}
                onClick={handleTopNavigation}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {language === 'es' ? 'Inicio' : 'Home'}
              </Link>
              <Link
                to={createPageUrl("Servicios")}
                onClick={handleTopNavigation}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.services}
              </Link>
              <Link
                to={createPageUrl("Planes")}
                onClick={handleTopNavigation}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.pricing}
              </Link>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-gray-700 hover:text-blue-900 transition-colors font-medium">
                    {language === 'es' ? 'Nosotros' : 'About'}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <Link to={createPageUrl("Nosotros")} onClick={handleTopNavigation}>
                    <DropdownMenuItem className="cursor-pointer">
                      {language === 'es' ? 'Sobre Nosotros' : 'About Us'}
                    </DropdownMenuItem>
                  </Link>
                  <Link to={createPageUrl("ComoTrabajamos")} onClick={handleTopNavigation}>
                    <DropdownMenuItem className="cursor-pointer">
                      {language === 'es' ? 'Cómo Trabajamos' : 'How We Work'}
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link
                to={createPageUrl("Portafolio")}
                onClick={handleTopNavigation}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {language === 'es' ? 'Portafolio' : 'Portfolio'}
              </Link>
              <Link
                to={createPageUrl("Support")}
                onClick={handleTopNavigation}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {language === 'es' ? 'Soporte' : 'Support'}
              </Link>

              {/* Separator */}
              <div className="h-6 w-px bg-gray-300" />

              {/* Utility Controls */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-gray-600 hover:text-blue-900 transition-colors"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
              <UserMenuButton />

              {/* Primary CTA */}
              <ContactButton />
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
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              {/* Primary Navigation Links */}
              <div className="space-y-1 mb-4">
                <Link
                  to={createPageUrl("Home")}
                  onClick={handleTopNavigation}
                  className="block w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-900"
                >
                  {language === 'es' ? 'Inicio' : 'Home'}
                </Link>
                <Link
                  to={createPageUrl("Servicios")}
                  onClick={handleTopNavigation}
                  className="block w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-900"
                >
                  {t.nav.services}
                </Link>
                <Link
                  to={createPageUrl("Planes")}
                  onClick={handleTopNavigation}
                  className="block w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-900"
                >
                  {t.nav.pricing}
                </Link>
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-900"
                >
                  <span>{language === 'es' ? 'Nosotros' : 'About'}</span>
                  <motion.div
                    animate={{ rotate: isAboutOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isAboutOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <Link
                        to={createPageUrl("Nosotros")}
                        onClick={handleTopNavigation}
                        className="block w-full px-4 py-3 pl-8 text-left font-medium text-gray-700 transition-colors hover:text-blue-900"
                      >
                        {language === 'es' ? 'Sobre Nosotros' : 'About Us'}
                      </Link>
                      <Link
                        to={createPageUrl("ComoTrabajamos")}
                        onClick={handleTopNavigation}
                        className="block w-full px-4 py-3 pl-8 text-left font-medium text-gray-700 transition-colors hover:text-blue-900"
                      >
                        {language === 'es' ? 'Cómo Trabajamos' : 'How We Work'}
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Link
                  to={createPageUrl("Portafolio")}
                  onClick={handleTopNavigation}
                  className="block w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-900"
                >
                  {language === 'es' ? 'Portafolio' : 'Portfolio'}
                </Link>
                <Link
                  to={createPageUrl("Support")}
                  onClick={handleTopNavigation}
                  className="block w-full rounded-lg px-4 py-3 text-left font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-900"
                >
                  {language === 'es' ? 'Soporte' : 'Support'}
                </Link>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-200 my-3" />

              {/* Utility Controls */}
              <div className="flex items-center justify-between px-4 py-2 mb-4">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-900 transition-colors"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">{language === 'es' ? 'English' : 'Español'}</span>
                </button>
                <UserMenuButton />
              </div>

              {/* Primary CTA */}
              <div className="px-4">
                <ContactButtonMobile />
              </div>
            </div>
          )}
              </div>
              </nav>

      {/* Main Content */}
      <AnimatePresence mode="wait" initial={true}>
        <motion.main
          key={`${location.pathname}${location.search}`}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Chatbot */}
      <Chatbot disabled={isMobileMenuOpen} />

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#003580] via-[#004099] to-[#003580] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8">
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
                <li>
                  <Link to={createPageUrl("Nosotros")} className="hover:text-white transition-colors">
                    {t.footer.about}
                  </Link>
                </li>
                <li>{t.footer.process}</li>
                <li>{t.footer.caseStudies}</li>
                <li>
                  <Link to={createPageUrl("Contacto")} className="hover:text-white transition-colors">
                    {t.footer.contact}
                  </Link>
                </li>
              </ul>
              </div>
              <div>
              <h3 className="font-semibold mb-4">{t.footer.contactTitle}</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>{t.footer.location}</li>
                <li>info@puraweb.cr</li>
                <li>+506 1234 5678</li>
              </ul>
              </div>
              <div>
              <h3 className="font-semibold mb-4">{language === 'es' ? 'Legal' : 'Legal'}</h3>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>
                  <Link to={createPageUrl("PoliticasPrivacidad")} className="hover:text-white transition-colors">
                    {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                  </Link>
                </li>
                <li>
                  <Link to={createPageUrl("TerminosCondiciones")} className="hover:text-white transition-colors">
                    {language === 'es' ? 'Términos y Condiciones' : 'Terms and Conditions'}
                  </Link>
                </li>
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