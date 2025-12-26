import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import PaymentSuccess from './pages/PaymentSuccess';
import Support from './pages/Support';
import UserDashboard from './pages/UserDashboard';
import Planes from './pages/Planes';
import __Layout from './Layout.jsx';


export const PAGES = {
    "AdminDashboard": AdminDashboard,
    "Checkout": Checkout,
    "Home": Home,
    "PaymentSuccess": PaymentSuccess,
    "Support": Support,
    "UserDashboard": UserDashboard,
    "Planes": Planes,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};