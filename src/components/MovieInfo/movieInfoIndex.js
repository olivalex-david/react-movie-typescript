import React from "react";
import { Wrapper, Content, Text } from '../MovieInfo/MovieInfo.styles';
import Thumb from "../Thumb/thumbIndex";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import NoImage from '../../images/no_image.jpg';
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';

const MovieInfo = ({ movie }) => (
    <Wrapper backdrop={movie.backdrop_path}>
        <Content>
            <Thumb className="thumb"
                image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : NoImage} 
                clickable={false} 
                alt='movie-thumb'   
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
            </Text>
        </Content>
    </Wrapper>
);

MovieInfo.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieInfo;