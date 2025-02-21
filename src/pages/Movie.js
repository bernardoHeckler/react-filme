import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieCard from "../components/MovieCard";

import "./Movie.css";

const moviesURL = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_API_KEY;

const Movie = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getMovie = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Erro HTTP! Status: ${res.status}`);
            }
            const data = await res.json();
            setMovie(data);
        } catch (err) {
            console.error("Erro ao buscar o filme:", err);
            setError("Ocorreu um erro ao carregar o filme.");
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (number) => {
        return number?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        }) || "N/A"; // Evita erro se o valor for `null`
    };

    useEffect(() => {
        if (id) {
            const movieUrl = `${moviesURL}${id}?api_key=${apiKey}`; // Corrigido o formato da URL
            getMovie(movieUrl);
        }
    }, [id]); // Adicionada `id` como dependência para evitar warnings

    return (
        <div className="movie-page">
            {loading && <p>Carregando...</p>}
            {error && <p className="error-message">{error}</p>}
            {movie && !loading && !error && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline || "Sem tagline disponível"}</p>
                    
                    <div className="info">
                        <h3>Budget:</h3>
                        <p>{formatCurrency(movie.budget)}</p>
                    </div>

                    <div className="info">
                        <h3>Revenue:</h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                    </div>

                    <div className="info">
                        <h3>Runtime:</h3>
                        <p>{movie.runtime ? `${movie.runtime} minutos` : "Desconhecido"}</p>
                    </div>

                    <div className="info description">
                        <h3>Description:</h3>
                        <p>{movie.overview || "Nenhuma descrição disponível."}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Movie;