import React from "react";
import { Image, Text } from "./Thumb.styles";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import PropTypes from "prop-types";

const Thumb = ({image, movieName, movieId, clickable}) => (
    <div>
        {clickable ? (
            <Link to={`/${movieId}`}>
                <Image src={image} alt='movie-thumb' />
                <Text >{movieName}</Text>
            </Link>
        ) : (<Fragment>
                <Image src={image} alt='movie-thumb' />
                <Text >{movieName}</Text>
            </Fragment>
        )}
    </div>
);

Thumb.propTypes = {
    image: PropTypes.string.isRequired,
    movieId: PropTypes.number,
    clickable: PropTypes.bool.isRequired
}

export default Thumb;