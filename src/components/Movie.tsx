import React from "react";
import { useParams } from "react-router-dom";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
// Components
import Grid from './Grid/gridIndex';
import Spinner from './Spinner/spinnerIndex';
import BreadCrumb from "./BreadCrumb/breadCrumbIndex";
import MovieInfo from "./MovieInfo/movieInfoIndex";
import MovieInfoBar from "./MovieInfoBar/movieInfoBarIndex";
import Actor from "./Actor/actorIndex";
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg'
import { nanoid } from "nanoid";


const Movie: React.FC = () => {
    const { movieId } = useParams();
    const { state: movie, loading, error } = useMovieFetch(Number(movieId));
    
    if(loading) return <Spinner />

    if(error) return <div>Something went wrong . . .</div>

    return (
        <>
            <BreadCrumb movieTitle={movie.original_title} />
            <MovieInfo movie={movie} />
            <MovieInfoBar 
                time={movie.runtime} 
                budget={movie.budget} 
                revenue={movie.revenue} 
            />
            <Grid header='Actors'>
                {movie.actors.map(actor => (
                    <Actor 
                        key={nanoid()} 
                        name={actor.name}
                        character={actor.character}
                        imageUrl={
                            actor.profile_path ?
                            `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                            : NoImage
                        }
                    />
                ))}
            </Grid>

        </>
    );
    
};

// changed to MovieWithParams for class component
export default Movie;