import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Contacto from './pages/Contacto';
import GuiaBienvenida from './pages/GuiaBienvenida';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import NosotrosManifiesto from './pages/NosotrosManifiesto';
import PaymentSuccess from './pages/PaymentSuccess';
import Planes from './pages/Planes';
import Politicas from './pages/Politicas';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';
import Servicios from './pages/Servicios';
import Support from './pages/Support';
import TerminosCondiciones from './pages/TerminosCondiciones';
import UserDashboard from './pages/UserDashboard';
import Sitemap from './pages/Sitemap';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminDashboard": AdminDashboard,
    "Checkout": Checkout,
    "Contacto": Contacto,
    "GuiaBienvenida": GuiaBienvenida,
    "Home": Home,
    "Nosotros": Nosotros,
    "NosotrosManifiesto": NosotrosManifiesto,
    "PaymentSuccess": PaymentSuccess,
    "Planes": Planes,
    "Politicas": Politicas,
    "PoliticasPrivacidad": PoliticasPrivacidad,
    "Servicios": Servicios,
    "Support": Support,
    "TerminosCondiciones": TerminosCondiciones,
    "UserDashboard": UserDashboard,
    "Sitemap": Sitemap,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};