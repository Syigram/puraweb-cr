import Home from './pages/Home';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Checkout": Checkout,
    "PaymentSuccess": PaymentSuccess,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};