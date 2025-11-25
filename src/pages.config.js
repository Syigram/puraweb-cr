import Home from './pages/Home';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import Planes from './pages/Planes';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Checkout": Checkout,
    "PaymentSuccess": PaymentSuccess,
    "Planes": Planes,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};