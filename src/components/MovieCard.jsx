/**
 * Individual movie display cards
 */
import React from 'react';
import { useMovieContext } from '../store/MovieProvider';
import { Plus, Trash2, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const MovieCard = ({ movie, isWatchlist = false }) => {
    const { addToWatchlist, removeFromWatchlist } = useMovieContext();

    return (
        <motion.div
            className="movie-card glass"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
        >
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            <div className="movie-info">
                <h3 className="movie-title truncate">{movie.title}</h3>
                <div className="movie-meta flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <Calendar size={14} /> {movie.year}
                    </span>
                    {movie.rating !== 'N/A' && (
                        <span className="flex items-center gap-1 text-yellow-400">
                            <Star size={14} fill="currentColor" /> {movie.rating}
                        </span>
                    )}
                </div>

                <div className="mt-4 flex gap-2">
                    {!isWatchlist ? (
                        <button
                            onClick={() => addToWatchlist(movie)}
                            className="btn btn-primary w-full justify-center"
                        >
                            <Plus size={16} /> Watchlist
                        </button>
                    ) : (
                        <button
                            onClick={() => removeFromWatchlist(movie.id)}
                            className="btn bg-red-500/20 hover:bg-red-500/40 text-red-400 w-full justify-center"
                        >
                            <Trash2 size={16} /> Remove
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default React.memo(MovieCard);
