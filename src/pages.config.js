import Checkout from './pages/Checkout';
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import NosotrosManifiesto from './pages/NosotrosManifiesto';
import PaymentSuccess from './pages/PaymentSuccess';
import Planes from './pages/Planes';
import Politicas from './pages/Politicas';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';
import Support from './pages/Support';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GuiaBienvenida from './pages/GuiaBienvenida';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import TerminosCondiciones from './pages/TerminosCondiciones';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Checkout": Checkout,
    "Contacto": Contacto,
    "Home": Home,
    "NosotrosManifiesto": NosotrosManifiesto,
    "PaymentSuccess": PaymentSuccess,
    "Planes": Planes,
    "Politicas": Politicas,
    "PoliticasPrivacidad": PoliticasPrivacidad,
    "Support": Support,
    "UserDashboard": UserDashboard,
    "AdminDashboard": AdminDashboard,
    "GuiaBienvenida": GuiaBienvenida,
    "Nosotros": Nosotros,
    "Servicios": Servicios,
    "TerminosCondiciones": TerminosCondiciones,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};