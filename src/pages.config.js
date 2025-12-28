import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';
import Planes from './pages/Planes';
import Servicios from './pages/Servicios';
import Support from './pages/Support';
import UserDashboard from './pages/UserDashboard';
import Nosotros from './pages/Nosotros';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminDashboard": AdminDashboard,
    "Checkout": Checkout,
    "Home": Home,
    "PaymentSuccess": PaymentSuccess,
    "Planes": Planes,
    "Servicios": Servicios,
    "Support": Support,
    "UserDashboard": UserDashboard,
    "Nosotros": Nosotros,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};