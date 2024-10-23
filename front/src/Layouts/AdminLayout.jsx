import { Outlet } from "react-router-dom";
import AdminMenu from "../components/AdminMenu";

function AdminLayout() {
    return (
        <>
            <AdminMenu />
            <Outlet />
        </>
    )
}

export default AdminLayout;