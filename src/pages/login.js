import { React, useEffect, useState } from "react"

import { collection, getDocs, getDoc, setDoc, doc, addDoc, orderBy, query, deleteDoc, where } from "firebase/firestore"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { db } from "../firebase"

function Login() {
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [credentials, setCredentials] = useState({});

    const error = {
        color: "red",
        fontSize: "15px",
        marginTop: "5px",
    }

    const handleChange = (event) => {
        if (event.target.name == "email") setEmailErrorMessage("");
        if (event.target.name == "password") setPasswordErrorMessage("");
        const name = event.target.name;
        const value = event.target.value;
        setCredentials(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        setEmailErrorMessage("");
        setPasswordErrorMessage("");

        event.preventDefault();
        if (!credentials.email) {
            setEmailErrorMessage("To pole jest wymagane.");
            return;
        }
        if (!credentials.password) {
            setPasswordErrorMessage("To pole jest wymagane.");
            return;
        }
        login();
    }

    const login = async (event) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, credentials.email, credentials.password).catch((error) => {
            setEmailErrorMessage("Brak użytkownika o podanym email lub haśle.");
        })
        setCredentials([]);
    }

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexFlow: "column", justifyContent: "center", backgroundColor: "yellowgreen" }}>
            <div style={{ width: "70%", margin: "10px auto", borderRadius: "25px", boxShadow: "5px 10px 18px #888888", backgroundColor: "white" }}>
                <form style={{ display: "flex", flexFlow: "column", padding: "20px" }} onSubmit={handleSubmit}>
                    <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Email:<br></br>
                        <input style={{ marginTop: "10px", width: "98%" }} type="email" name="email" value={credentials.email || ""} onChange={handleChange} />
                        {emailErrorMessage && <div style={error}>{emailErrorMessage}</div>}
                    </label>
                    <label style={{ textAlign: "left", width: "100%", marginBottom: "20px" }}>Hasło:<br></br>
                        <input style={{ marginTop: "10px", width: "98%" }} type="password" name="password" value={credentials.password || ""} onChange={handleChange} />
                        {passwordErrorMessage && <div style={error}>{passwordErrorMessage}</div>}
                    </label>
                    <input style={{ margin: "10px auto 0", width: "80%", height: "50px", fontSize: "21px", fontWeight: "bold", backgroundColor: "lightgreen" }} type="submit" value="Zaloguj" />
                </form>
            </div>
        </div>
    );
}

export default Login;