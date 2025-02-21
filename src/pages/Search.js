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
    const [loading, setLoading] = useState(true);
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Erro HTTP! Status: ${res.status}`);
            }
            const data = await res.json();
            setMovies(data.results);
        } catch (error) {
            console.error("Erro ao buscar os filmes:", error);
            setMovies([]); // Evita estado indefinido
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            const searchWithQueryURL = `${searchURL}?api_key=${apiKey}&query=${query}`;
            getSearchedMovies(searchWithQueryURL);
        }
    }, [query]);

    return (
        <div className="container">
            <h2 className="title">
                Resultados para: <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                {loading && <p>Carregando...</p>}
                {!loading && movies.length === 0 && <p>Nenhum filme encontrado.</p>}
                {movies.length > 0 && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Search;