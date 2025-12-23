import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';
import Planes from './pages/Planes';
import Support from './pages/Support';
import UserDashboard from './pages/UserDashboard';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminDashboard": AdminDashboard,
    "Checkout": Checkout,
    "Home": Home,
    "PaymentSuccess": PaymentSuccess,
    "Planes": Planes,
    "Support": Support,
    "UserDashboard": UserDashboard,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};