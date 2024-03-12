import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <>
            <div>Admin layout</div>
            <Outlet />
        </>
    )
}

export default AdminLayout;