/**
 * Logic for movie state updates
 */
export const initialState = {
    searchResults: [],
    watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
    lastRemoved: null,
    loading: false,
    error: null,
    filters: {
        sort: 'recent', // 'recent', 'rating', 'title'
        type: 'all'     // 'all', 'movie', 'series'
    }
};

export const ACTIONS = {
    SET_LOADING: 'SET_LOADING',
    SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
    ADD_TO_WATCHLIST: 'ADD_TO_WATCHLIST',
    REMOVE_FROM_WATCHLIST: 'REMOVE_FROM_WATCHLIST',
    UNDO_REMOVE: 'UNDO_REMOVE',
    SET_FILTERS: 'SET_FILTERS',
    SET_ERROR: 'SET_ERROR'
};

export function movieReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.payload };

        case ACTIONS.SET_SEARCH_RESULTS:
            return { ...state, searchResults: action.payload, loading: false };

        case ACTIONS.ADD_TO_WATCHLIST:
            const updatedWatchlistAdd = [...state.watchlist, action.payload];
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlistAdd));
            return { ...state, watchlist: updatedWatchlistAdd };

        case ACTIONS.REMOVE_FROM_WATCHLIST:
            const movieToRemove = state.watchlist.find(m => m.id === action.payload);
            const updatedWatchlistRemove = state.watchlist.filter(m => m.id !== action.payload);
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlistRemove));
            return { ...state, watchlist: updatedWatchlistRemove, lastRemoved: movieToRemove };

        case ACTIONS.UNDO_REMOVE:
            if (!state.lastRemoved) return state;
            const updatedWatchlistUndo = [...state.watchlist, state.lastRemoved];
            localStorage.setItem('watchlist', JSON.stringify(updatedWatchlistUndo));
            return { ...state, watchlist: updatedWatchlistUndo, lastRemoved: null };

        case ACTIONS.SET_FILTERS:
            return { ...state, filters: { ...state.filters, ...action.payload } };

        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload, loading: false };

        default:
            return state;
    }
}
