//src/components/MovieCard.js
import { Link } from 'react-router-dom';

const imageUrl = process.env.REACT_APP_IMG;

const MovieCard = ({ movie, showLink = true }) => {
    return (
        <div className='movie-card'>
            <img src={imageUrl + movie.poster_path} alt={movie.title}></img>
            <h2>{movie.title}</h2>
            <p>
                {movie.vote_average}
            </p>
            {showLink && <Link to={`/movie/${movie.id}`}>Detalhes</Link>}
        </div>
    )
}

export default MovieCard;