import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import NosotrosManifiesto from './pages/NosotrosManifiesto';
import PaymentSuccess from './pages/PaymentSuccess';
import Planes from './pages/Planes';
import Support from './pages/Support';
import UserDashboard from './pages/UserDashboard';
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Servicios from './pages/Servicios';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminDashboard": AdminDashboard,
    "Checkout": Checkout,
    "NosotrosManifiesto": NosotrosManifiesto,
    "PaymentSuccess": PaymentSuccess,
    "Planes": Planes,
    "Support": Support,
    "UserDashboard": UserDashboard,
    "Home": Home,
    "Nosotros": Nosotros,
    "Servicios": Servicios,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};