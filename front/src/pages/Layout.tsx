import { Outlet, Link, useLocation } from "react-router-dom";

const Layout = () => {
    const location  = useLocation();
  
    const isHomePage = location.pathname === '/';

    if (isHomePage) {
        return <Outlet />;
    };

    return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Sign Out</Link>
          </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;