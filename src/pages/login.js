import { React, useEffect, useState } from "react"

import { collection, getDocs, getDoc, setDoc, doc, addDoc, orderBy, query, deleteDoc, where } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { db } from "../firebase"

function Login() {
    const [credentials, setCredentials] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCredentials(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        console.log(credentials);
        event.preventDefault();
        const auth = getAuth();
        signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        setCredentials([]);
    }

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", justifyContent: "center", backgroundColor: "yellowgreen" }}>
            <div style={{ width: "70%", height: "35%", margin: "10px auto", borderRadius: "25px", boxShadow: "5px 10px 18px #888888", backgroundColor: "white" }}>
                <form style={{ display: "flex", flexFlow: "column", padding: "20px" }} onSubmit={handleSubmit}>
                    <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Email:<br></br>
                        <input style={{ marginTop: "10px", width: "98%" }} type="email" name="email" value={credentials.email || ""} onChange={handleChange} />
                    </label>
                    <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Hasło:<br></br>
                        <input style={{ marginTop: "10px", width: "98%" }} type="password" name="password" value={credentials.password || ""} onChange={handleChange} />
                    </label>
                    <input style={{ margin: "30px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "lightgreen" }} type="submit" value="Zaloguj" />
                </form>
            </div>
        </div>
    );
}

export default Login;