import { Outlet } from "react-router-dom";
import GraduateMenu from "../components/GraduateMenu";

function GraduateLayout() {
    return (
        <>
            <GraduateMenu />
            <Outlet />
        </>
    )
}

export default GraduateLayout;