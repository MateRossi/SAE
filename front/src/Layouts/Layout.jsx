import { Outlet } from "react-router-dom";

function Layout() {
    return (
        <>
            <header>This is the layout</header>
            <Outlet />
        </>
    )
}

export default Layout;