import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <>
            <AdminMenu />
            <Outlet />
        </>
    )
}

export default AdminLayout;