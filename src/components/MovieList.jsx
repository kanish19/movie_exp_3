/**
 * List layout for our movies
 */
import React from 'react';
import MovieCard from './MovieCard';
import { motion, AnimatePresence } from 'framer-motion';

const MovieList = ({ movies, title, isWatchlist = false }) => {
    if (movies.length === 0 && !isWatchlist) return null;

    return (
        <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{title}</h2>
                <span className="badge">{movies.length} {movies.length === 1 ? 'Item' : 'Items'}</span>
            </div>

            <motion.div
                className="movie-grid"
                layout
            >
                <AnimatePresence mode="popLayout">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            isWatchlist={isWatchlist}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {movies.length === 0 && isWatchlist && (
                <div className="glass p-12 text-center rounded-2xl">
                    <p className="text-gray-400">Your watchlist is empty. Start exploring!</p>
                </div>
            )}
        </div>
    );
};

export default MovieList;
