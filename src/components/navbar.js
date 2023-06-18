import { Link, useLocation } from "react-router-dom"
import { React, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { db } from "../firebase"

import '../App.css';

function Navbar() {
    const location = useLocation();


    const routes = [
        {
            label: "HOME",
            path: "/",

        },
        {
            label: "PRODUKTY",
            path: "/items",

        },
        {
            label: "DOSTAWA",
            path: "/map",
        },
    ]

    const logOut = () => {
        const auth = getAuth();
        signOut(auth);
        window.location.reload(false);
    }

    return (
        <div className="navbar">
            <div className="navbar">
                {routes.map((route) => (
                    <Link key={route.label} to={route.path}><div className={location.pathname === route.path ? "navbarButton-visited" : "navbarButton"}>{route.label}</div></Link>
                ))}
            </div>
            <button onClick={() => logOut()} >Logout</button>
        </div>
    );
}

export default Navbar;
