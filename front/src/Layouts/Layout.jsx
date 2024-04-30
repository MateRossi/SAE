import { Outlet } from "react-router-dom";
import "./Layout.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
    return (
        <div className="App">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;