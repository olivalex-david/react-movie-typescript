import React from "react";
import API from '../API';
//config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config'
//Hook
//import { useHomeFetch } from '../hooks/useHomeFetch';
//Image
import NoImage from '../images/no_image.jpg'
//components
import HeroImage from "./HeroImage/heroImageIndex";
import Grid from '../components/Grid/gridIndex';
//import Image from '../components/Thumb/thumbIndex';
import Spinner from '../components/Spinner/spinnerIndex';
import SearchBar from "./SearchBar/searchBarIndex";
import Button from "../components/Button/buttonIndex";

import { nanoid } from 'nanoid';
import Thumb from "../components/Thumb/thumbIndex";

// class component
const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

class Home extends React.Component {
    state = { 
        movies: initialState,
        searchTerm: '',
        isLoadingMore: false,
        loading: false,
        error: false
    }
    
    fetchMovies = async (page, searchTerm = '') => {
        try {
            this.setState({
                error: false,
                loading: true
            });

            console.log('page: ' + page);
            const movies = await API.fetchMovies(searchTerm, page);
            console.log('movies');
            console.log(movies);
            this.setState( prev => ({
                ...prev.movies,
                movies: {
                    ...movies,
                    results:
                        page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
                },
                loading: false
                }));
        }catch(error){
            this.setState({ 
                error: true,
                loading: false
            });
        }
    }

    componentDidMount(){
        this.fetchMovies(1);
    }

    handleSearch = searchTerm => {
        this.setState({
            movies: initialState,
            searchTerm
        }, () => this.fetchMovies(1, this.state.searchTerm));
    }

    handleLoadMore = () => {
        this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);
    }

    render() {
        const { error, searchTerm, movies, loading } = this.state;

        if(error) return <div>Something Went Wrong . . .</div>;
        return (
            <>
                {!searchTerm && movies.results[0] ? (
                    <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
                                title={movies.results[0].original_title}
                                text={movies.results[0].overview}
                    /> 
                )   : null}
                <SearchBar setSearchTerm={this.handleSearch}/>
                <Grid header={searchTerm ? 'Search Term: ' : 'Popular Movies'}>
                    {movies.results.map(movie => (
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
                {movies.page < movies.total_pages && !loading && 
                    (<Button text='Load More' callBack={ () => this.handleLoadMore(true)}/>)}
            </>
        );
    }

}

// Hooks
//  const Home = () => {
//     const {state, loading, error, searchTerm, setSearchTerm, setLoadMore} = useHomeFetch();

//     if(error) return <div>Something Went Wrong . . .</div>;
    

//     return (
//         <>
//             {!searchTerm && state.results[0] ? (
//                 <HeroImage image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
//                             title={state.results[0].original_title}
//                             text={state.results[0].overview}
//                 /> 
//             )   : null}
//             <SearchBar setSearchTerm={setSearchTerm}/>
//             <Grid header={searchTerm ? 'Search Term: ' : 'Popular Movies'}>
//                 {state.results.map(movie => (
//                     <Thumb
//                         key={nanoid()}
//                         movieName={movie.title}
//                         clickable
//                         image={
//                             movie.poster_path ? 
//                                 IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path 
//                                 : NoImage 
//                         }
//                         movieId={movie.id}
//                         />
//                 ))}
//             </Grid>
//             {loading && <Spinner /> }
//             {state.page < state.total_pages && !loading && 
//                 (<Button text='Load More' callBack={ () => setLoadMore(true)}/>)}
//         </>
//     );
// }

export default Home;