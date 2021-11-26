import React from "react";
import { useParams } from "react-router-dom";
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from "../config";
// Components
import Grid from '../components/Grid/gridIndex';
import Spinner from '../components/Spinner/spinnerIndex';
import BreadCrumb from "./BreadCrumb/breadCrumbIndex";
import MovieInfo from "./MovieInfo/movieInfoIndex";
import MovieInfoBar from "./MovieInfoBar/movieInfoBarIndex";
import Actor from "./Actor/actorIndex";
// Hook
//import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg'
import { nanoid } from "nanoid";
// API for classComponent instead of hooks
import API from '../API';



class Movie extends React.Component{
    state = {
        movie: {},
        loading: true,
        error: false
    };

    fetchMovie = async () => {
        const { movieId } = this.props.params;
        try {
            this.setState({ error: false, loading: true });

            const movie = await API.fetchMovie(movieId);
            const credits = await API.fetchCredits(movieId);
            const directors = credits.crew.filter(
                member => member.job === 'Director'
            );

            this.setState({
                movie: {
                    ...movie,   
                    actors: credits.cast,
                    directors
                },
                loading: false
            });

        }catch(error){
            this.setState({
                error: true,
                loading: false
            })
        }
    }

    componentDidMount() {
        this.fetchMovie();
    }

    render() {
        const { movie, error, loading } = this.state;

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
    }

}

/* const Movie = () => {
    const { movieId } = useParams();
    const { state: movie, loading, error } = useMovieFetch(movieId);
    
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
    
}; */

// get parameters from react router V6 for CLASS COMPONENTS
const MovieWithParams = props => <Movie { ...props } params={useParams()} />

// changed to MovieWithParams for class component
export default MovieWithParams;