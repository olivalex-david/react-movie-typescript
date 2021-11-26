import React from "react";
//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config'
//Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
//Image
import NoImage from '../images/no_image.jpg'
//components
import HeroImage from "./HeroImage/heroImageIndex";
import Grid from './Grid/gridIndex';
//import Image from '../components/Thumb/thumbIndex';
import Spinner from './Spinner/spinnerIndex';
import SearchBar from "./SearchBar/searchBarIndex";
import Button from "./Button/buttonIndex";

import { nanoid } from 'nanoid';
import Thumb from "./Thumb/thumbIndex";

// Hooks
 const Home: React.FC = () => {
    const {state, loading, error, searchTerm, setSearchTerm, setLoadMore} = useHomeFetch();

    if(error) return <div>Something Went Wrong . . .</div>;
    

    return (
        <>
            {!searchTerm && state.results[0] ? (
                <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                            title={state.results[0].original_title}
                            text={state.results[0].overview}
                /> 
            )   : null}
            <SearchBar setSearchTerm={setSearchTerm}/>
            <Grid header={searchTerm ? 'Search Term: ' : 'Popular Movies'}>
                {state.results.map(movie => (
                    <Thumb
                        key={nanoid()}
                        movieName={movie.title}
                        clickable
                        image={
                            movie.poster_path ? 
                                IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
                                : NoImage 
                        }
                        movieId={movie.id}
                        />
                ))}
            </Grid>
            {loading && <Spinner /> }
            {state.page < state.total_pages && !loading && 
                (<Button text='Load More' callBack={ () => setLoadMore(true)}/>)}
        </>
    );
}

export default Home;