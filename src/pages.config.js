import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Contacto from './pages/Contacto';
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
import GuiaBienvenida from './pages/GuiaBienvenida';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminDashboard": AdminDashboard,
    "Checkout": Checkout,
    "Contacto": Contacto,
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
    "GuiaBienvenida": GuiaBienvenida,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};