import { useState, useEffect } from 'react';
import API from '../API';
import { isPersistedState } from '../helpers';

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setError(false);
                setLoading(true);
    
                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
    
                // get director
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );
    
    
                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                });
    
            }catch(error){
                setError(true);
            }finally{
                setLoading(false);
            }
        };

        const sessionState = isPersistedState(movieId);
        if(sessionState){
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchMovie();
    }, [movieId]);

    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state));
    },[movieId, state]);

    return { state, loading, error };
}