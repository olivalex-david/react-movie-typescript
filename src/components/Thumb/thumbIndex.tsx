import React from "react";
import { Image, Text } from "./Thumb.styles";
import { Link } from "react-router-dom";
import { Fragment } from "react";

// Types
type Props = {
    image: string;
    movieName: string;
    movieId?: number;
    clickable: boolean;
}

const Thumb: React.FC<Props> = ({image, movieName, movieId, clickable}) => (
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


export default Thumb;