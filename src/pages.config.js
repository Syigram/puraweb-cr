import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Contacto from './pages/Contacto';
import Nosotros from './pages/Nosotros';
import NosotrosManifiesto from './pages/NosotrosManifiesto';
import PaymentSuccess from './pages/PaymentSuccess';
import Planes from './pages/Planes';
import Servicios from './pages/Servicios';
import Support from './pages/Support';
import UserDashboard from './pages/UserDashboard';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminDashboard": AdminDashboard,
    "Checkout": Checkout,
    "Contacto": Contacto,
    "Nosotros": Nosotros,
    "NosotrosManifiesto": NosotrosManifiesto,
    "PaymentSuccess": PaymentSuccess,
    "Planes": Planes,
    "Servicios": Servicios,
    "Support": Support,
    "UserDashboard": UserDashboard,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};