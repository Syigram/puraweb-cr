import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Code2, Globe, User, LogOut, LayoutDashboard, Shield, HelpCircle } from "lucide-react";
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

function GetStartedButtonMobile({ scrollToSection, t }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await base44.auth.me();
        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading || isAuthenticated) return null;

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await base44.auth.me();
        setIsAuthenticated(true);
      } catch (e) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading || isAuthenticated) return null;

  return (
    <Button
      onClick={() => scrollToSection("contact")}
      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6"
    >
      {t.nav.getStarted}
    </Button>
  );
}

function UserMenuButton() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return null;

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
}

function LayoutContent({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        :root {
          --costa-blue: #002B7F;
          --costa-red: #CE1126;
          --costa-white: #FFFFFF;
        }
      `}</style>
      
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/0da20b464_logo4.png" 
                  alt="PuraWeb CR" 
                  className="h-10 md:h-12 w-auto transform group-hover:scale-105 transition-transform"
                />
              </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.services}
              </button>
              <Link
                to={createPageUrl("Planes")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.pricing}
              </Link>
              <button
                onClick={() => scrollToSection("benefits")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.benefits}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium"
              >
                {t.nav.contact}
              </button>
              <Link
                to={createPageUrl("Support")}
                className="text-gray-700 hover:text-blue-900 transition-colors font-medium flex items-center gap-1"
              >
                <HelpCircle className="w-4 h-4" />
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
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {t.nav.services}
              </button>
              <Link
                to={createPageUrl("Planes")}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {t.nav.pricing}
              </Link>
              <button
                onClick={() => scrollToSection("benefits")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {t.nav.benefits}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                {t.nav.contact}
              </button>
              <Link
                to={createPageUrl("Support")}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
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
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6901cf191d3736d23a1ebf19/0da20b464_logo4.png" 
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
}

export default function Layout({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <LayoutContent children={children} currentPageName={currentPageName} />
    </LanguageProvider>
  );
}