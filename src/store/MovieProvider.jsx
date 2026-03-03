/**
 * Context for managing our movie list
 */
import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { movieReducer, initialState, ACTIONS } from './movieReducer';
import movieApi from '../api/movieApi';
import { MovieFactory } from '../movie-module/movieHelpers';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState);

    const searchMovies = async (query) => {
        if (!query) {
            dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: [] });
            return;
        }

        dispatch({ type: ACTIONS.SET_LOADING, payload: true });
        try {
            const results = await movieApi.searchMovies(query);
            const normalizedResults = results.map(m => MovieFactory.createMovie(m));
            dispatch({ type: ACTIONS.SET_SEARCH_RESULTS, payload: normalizedResults });
        } catch (err) {
            dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to fetch movies' });
        }
    };

    const addToWatchlist = (movie) => {
        if (state.watchlist.some(m => m.id === movie.id)) return;
        dispatch({ type: ACTIONS.ADD_TO_WATCHLIST, payload: movie });
    };

    const removeFromWatchlist = (id) => {
        dispatch({ type: ACTIONS.REMOVE_FROM_WATCHLIST, payload: id });
    };

    const undoRemove = () => {
        dispatch({ type: ACTIONS.UNDO_REMOVE });
    };

    const setFilters = (filters) => {
        dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
    };

    // Memoized value to avoid unnecessary re-renders
    const value = useMemo(() => ({
        ...state,
        searchMovies,
        addToWatchlist,
        removeFromWatchlist,
        undoRemove,
        setFilters
    }), [state]);

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};

export const useMovieContext = () => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext must be used within a MovieProvider');
    }
    return context;
};
