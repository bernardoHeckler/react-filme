// ./src/pages/Search.js
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

const apiKey = process.env.REACT_APP_API_KEY;
const searchURL = process.env.REACT_APP_SEARCH;

const Search = () => {
    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);
    const query = searchParams.get("query");

    const getSearchedMovies = async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
    };

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
        getSearchedMovies(searchWithQueryURL);
    }, [query]);

    return (
        <div className="container">
            <h2 className="title">
                Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Search;