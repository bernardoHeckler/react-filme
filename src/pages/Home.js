import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css"

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = process.env.REACT_APP_API;

function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const getTopRatedMovies = async () => {
            try {
                const response = await fetch(`${apiUrl}top_rated?api_key=${apiKey}`);

                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.status}`);
                }

                const data = await response.json();
                setMovies(data.results);
            } catch (error) {
                console.error("Erro ao buscar os filmes:", error);
            }
        };

        getTopRatedMovies();
    }, []);

    return (
        <div className="container">
            <h2 className="title">Melhores Filmes:</h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && movies.map((movies) => <MovieCard key={movies} movie={movies}/>)}
            </div>
        </div>
    );

}

export default Home;
