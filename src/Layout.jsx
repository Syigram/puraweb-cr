import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Code2, Globe, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageProvider, useLanguage } from "@/components/LanguageContext";
import { translations } from "@/components/translations";
import { base44 } from "@/api/base44Client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function LayoutContent({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
    
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

  const handleLogout = async () => {
    await base44.auth.logout(createPageUrl("Home"));
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
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to={createPageUrl("Home")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
                PuraWeb CR
              </span>
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
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors font-medium"
                title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-bold">{language === 'es' ? 'EN' : 'ES'}</span>
              </button>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
                      <div className="text-right hidden lg:block">
                        <p className="text-sm font-medium text-gray-900">{user.full_name || "Usuario"}</p>
                        <p className="text-xs text-gray-500 truncate max-w-[120px]">{user.email}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-white shadow-sm flex items-center justify-center text-blue-900 font-bold text-lg">
                        {user.full_name ? user.full_name[0].toUpperCase() : "U"}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {user.role === 'admin' && (
                      <DropdownMenuItem onClick={() => navigate(createPageUrl("AdminDashboard"))}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Panel Admin</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => navigate(createPageUrl("UserDashboard"))}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Mi Perfil y Pagos</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6"
                >
                  {t.nav.getStarted}
                </Button>
              )}
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
              <button
                onClick={toggleLanguage}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition-colors font-medium"
              >
                <Globe className="w-5 h-5" />
                {language === 'es' ? 'English' : 'Español'}
              </button>
              {user ? (
                <>
                  <div className="px-4 py-2 border-t border-b bg-gray-50 my-2">
                    <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  {user.role === 'admin' && (
                    <Link
                      to={createPageUrl("AdminDashboard")}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Panel Admin
                    </Link>
                  )}
                  <Link
                    to={createPageUrl("UserDashboard")}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg"
                  >
                    <User className="w-4 h-4" />
                    Mi Cuenta
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                >
                  {t.nav.getStarted}
                </Button>
              )}
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
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">PuraWeb CR</span>
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