/**
 * Helpers for cleaning up movie objects
 */
export const MovieFactory = {
    createMovie(apiData) {
        return {
            id: apiData.imdbID || Math.random().toString(36).substr(2, 9),
            title: apiData.Title || 'Unknown Title',
            year: apiData.Year || 'N/A',
            poster: apiData.Poster !== 'N/A' ? apiData.Poster : 'https://via.placeholder.com/300x450?text=No+Poster',
            type: apiData.Type || 'movie',
            rating: apiData.imdbRating || 'N/A',
            genre: apiData.Genre || 'N/A',
            plot: apiData.Plot || 'No description available.',
            addedAt: new Date().toISOString()
        };
    }
};
