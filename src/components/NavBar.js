// src/pages/NavBar.js

import React from "react";
import { Link } from "react-router-dom";

import './NavBar.css';

function NavBar() {
    return (
        <nav id="navbar">
            <h2>
                <Link to="/">MoviesLib</Link>
            </h2>
            <form>
                <input type="text" placeholder="Busque um filme" />
                <button type="submit">Buscar</button>
            </form>
        </nav>
    );
}

export default NavBar;
