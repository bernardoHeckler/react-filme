// src/pages/NavBar.js

import { useState } from 'react';
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import './NavBar.css';

function NavBar() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search);
        if (!search) return
        navigate(`/search?q=${search}`)
        setSearch("");

    }

    return (
        <nav id="navbar">
            <h2>
                <Link to="/">MoviesLib</Link>
            </h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Busque um filme" onChange={(e) => setSearch(e.target.value)} value={search} />
                <button type="submit">Buscar</button>
            </form>
        </nav>
    );
}

export default NavBar;
