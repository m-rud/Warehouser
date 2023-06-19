import { React, useEffect, useState } from "react"
import './App.css';
import {
    Route, Routes
} from "react-router-dom";
import Navbar from './components/navbar';
import Items from "./pages/items";
import Map from "./pages/map";
import Home from "./pages/home";
import Scanner from "./components/Scanner";
import Login from "./pages/login"

import { collection, getDocs, getDoc, setDoc, doc, addDoc, orderBy, query, deleteDoc, where } from "firebase/firestore"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { db } from "./firebase"

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUser = async (userEmail) => {
        await getDocs(query(collection(db, "users"), where("email", "==", userEmail))).then((querySnapshot) => {
            setCurrentUser(querySnapshot.docs[0].data());
        })
    }

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            console.log("test");
            if (user) {
                getCurrentUser(user.email);
                renderLogin();
            }
        })
        // eslint-disable-next-line
    }, [])



    function renderLogin() {
        if (currentUser) {
            return (
                <div className="App">
                    <Navbar />
                    <div className='router'>
                        <Routes>
                            <Route path="/" exact element={<Home />} />
                            <Route path="/items" exact element={<Items user={currentUser} />} />
                            <Route path="/map" exact element={<Map user={currentUser} />} />
                        </Routes>
                    </div>
                    <div id="reader"></div>
                </div>
            )
        } else {
            return (
                <Login />
            )
        }
    }

    return renderLogin();
}

export default App;
