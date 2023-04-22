import React from "react";
import './App.css';
import {
    Route, Routes
} from "react-router-dom";
import Navbar from './components/navbar';
import Items from "./pages/items";
import Map from "./pages/map";
import Home from "./pages/home";

function App() {
    return (
        <div className="App">
            <Navbar />
            <div className='router'>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/items" exact element={<Items />} />
                    <Route path="/map" exact element={<Map />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;