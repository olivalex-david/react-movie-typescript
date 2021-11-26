import {useState, useEffect} from 'react';
import API from '../API';

//helpers
import { isPersistedState } from '../helpers';

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};

export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [error,setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState(initialState);
    const [loadMore, setLoadMore] = useState(false);

    const fetchMovies = async (page, searchTerm = '') => {
        try{
            setError(false);
            setLoading(true);
            
            const movies = await API.fetchMovies(searchTerm,page);    
            
            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            }));
        }catch(error){
            console.log(error);
            setError(true);
        }finally{
            setLoading(false);
        }
        
    }
    
    console.log(state);

    // Initial render (only runs once) and search
    useEffect(() =>{
        if (!searchTerm){
            const sessionState = isPersistedState('homeState');
            
            if(sessionState) {
                console.log('Grabbing from Session Storage');
                setState(sessionState);
                return;
            }
        }

        console.log('Grabbing from API');
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);


    // Load More
    useEffect( () => {
        if(!loadMore) return;
        
        fetchMovies(state.page + 1, searchTerm);
        setLoadMore(false);
    }, [loadMore, searchTerm, state.page]);

    // Write to sessionStorage
    useEffect(() => {
        if(!searchTerm){
            sessionStorage.setItem('homeState', JSON.stringify(state));
        }
    }, [searchTerm, state]);

    return {state, loading, error, searchTerm, setSearchTerm, setLoadMore};
};