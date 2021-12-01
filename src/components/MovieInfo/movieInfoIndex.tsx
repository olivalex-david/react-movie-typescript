import React, { useContext, useState } from "react";
import { Wrapper, Content, Text } from './MovieInfo.styles';
import Thumb from "../Thumb/thumbIndex";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from '../../images/no_image.jpg';
import { nanoid } from "nanoid";
import { MovieState } from '../../hooks/useMovieFetch';
import API from '../../API';
import Rate from '../Rate/RateIndex';
// Context
import { Context } from '../../context';

type Props = {
    movie: MovieState;
}

const MovieInfo: React.FC<Props> = ({ movie }) => {
    const [user] = useContext(Context);
    const [error, setError] = useState(false);
    const [ratingSuccess, setRatingSuccess] = useState(false);

    const handleRating = async (value: number) => {
        try{
            setRatingSuccess(false);
            setError(false);
            const rate = await API.rateMovie(user.sessionId,movie.id, String(value));
            
            console.log(rate);

            if(!rate.success){
                setError(true);
            }else{
                setRatingSuccess(true);
            }

        }catch(error){
            setError(true);
        }

    }

    return (
        <Wrapper backdrop={movie.backdrop_path}>
            <Content>
                <Thumb
                    image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : NoImage} 
                    movieName={movie.original_title}
                    clickable={false} 
                />
                <Text>
                    <h1>{movie.title}</h1>
                    <h3>PLOT</h3>
                    <p>{movie.overview}</p>

                    <div className="rating-directors">
                        <div>
                            <h3>RATING</h3>
                            <div className="score">
                                {movie.vote_average}
                            </div>
                        </div>
                        <div className="director"> 
                            <h3>
                                DIRECTOR{movie.directors.length > 1 ? 'S' : ''}
                            </h3>
                            <div >
                                {movie.directors.map(director => (
                                    <p key={nanoid()}>{director.name}</p>
                                ))}
                            </div> 
                        </div>
                    </div>
                    <div>
                        <p>Rate Movie</p>
                        {user ? 
                            error ?
                                <span>There was an error while rating!</span>
                                : <Rate callBack={handleRating}/>
                            : <span> Log in first</span>
                        }
                    </div>
                </Text>
            </Content>
        </Wrapper>
    );
}
export default MovieInfo;