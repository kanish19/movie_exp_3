/**
 * The main search input
 */
import React, { useState, useCallback } from 'react';
import { useMovieContext } from '../store/MovieProvider';
import debounce from 'lodash.debounce';
import { Search } from 'lucide-react';

const SearchBar = () => {
    const { searchMovies } = useMovieContext();
    const [query, setQuery] = useState('');

    // Debounce the search function
    const debouncedSearch = useCallback(
        debounce((nextValue) => {
            searchMovies(nextValue);
        }, 500),
        [searchMovies]
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedSearch(value);
    };

    return (
        <div className="search-container">
            <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
            />
            <input
                type="text"
                className="search-input"
                placeholder="Search for movies, series..."
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
