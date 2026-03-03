/**
 * Simple service for movie data
 */
class MovieService {
    constructor() {
        // API key should be provided in .env file as VITE_OMDB_API_KEY
        this.API_KEY = import.meta.env.VITE_OMDB_API_KEY || '538e1b00';
        this.BASE_URL = 'https://www.omdbapi.com/';
    }

    async searchMovies(query) {
        if (!query) return [];
        try {
            const response = await fetch(`${this.BASE_URL}?s=${encodeURIComponent(query)}&apikey=${this.API_KEY}`);
            const data = await response.json();
            if (data.Response === 'True') {
                return data.Search;
            }
            return [];
        } catch (error) {
            console.error('Search error:', error);
            return [];
        }
    }

    async getMovieDetails(id) {
        try {
            const response = await fetch(`${this.BASE_URL}?i=${id}&apikey=${this.API_KEY}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Details error:', error);
            return null;
        }
    }
}

const movieServiceInstance = new MovieService();
Object.freeze(movieServiceInstance);

export default movieServiceInstance;
