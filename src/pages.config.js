import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import NosotrosManifiesto from './pages/NosotrosManifiesto';
import PaymentSuccess from './pages/PaymentSuccess';
import Planes from './pages/Planes';
import Politicas from './pages/Politicas';
import Servicios from './pages/Servicios';
import Support from './pages/Support';
import UserDashboard from './pages/UserDashboard';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';
import TerminosCondiciones from './pages/TerminosCondiciones';
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
    "Servicios": Servicios,
    "Support": Support,
    "UserDashboard": UserDashboard,
    "PoliticasPrivacidad": PoliticasPrivacidad,
    "TerminosCondiciones": TerminosCondiciones,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};