import { Link, useLocation } from "react-router-dom"
import '../App.css';

function Navbar() {
    const location = useLocation();

    const routes = [
        {
            label: "HOME",
            path: "/",

        },
        {
            label: "ITEMS",
            path: "/items",

        },
        {
            label: "MAP",
            path: "/map",
        }
    ]

    return (
        <div className="navbar">
            {routes.map((route) => (
                <Link key={route.label} to={route.path}><div className={location.pathname === route.path ? "navbarButton-visited" : "navbarButton"}>{route.label}</div></Link>
            ))}
        </div>
    );
}

export default Navbar;
