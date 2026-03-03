/**
 * App - Main Assembly
 */
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import { useMovieContext } from './store/MovieProvider';
import { Film, Layout, Search, List } from 'lucide-react';

function App() {
    const { searchResults, watchlist, loading, lastRemoved, undoRemove } = useMovieContext();
    const [activeTab, setActiveTab] = useState('search'); // 'search' | 'watchlist'

    return (
        <div className="container">
            <header className="flex flex-col items-center mb-12">
                <div className="flex items-center gap-3 mb-2">
                    <Film className="text-primary" size={40} />
                    <h1>Movie Explorer</h1>
                </div>
                <p className="text-gray-400 text-center max-w-md">
                    A modern dashboard to discover and manage your personalized cinema collection.
                </p>
            </header>

            <nav className="flex justify-center mb-12">
                <div className="glass p-1 rounded-xl flex gap-1">
                    <button
                        onClick={() => setActiveTab('search')}
                        className={`btn ${activeTab === 'search' ? 'btn-primary' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Search size={18} /> Discover
                    </button>
                    <button
                        onClick={() => setActiveTab('watchlist')}
                        className={`btn ${activeTab === 'watchlist' ? 'btn-primary' : 'text-gray-400 hover:text-white'}`}
                    >
                        <List size={18} /> My Watchlist
                    </button>
                </div>
            </nav>

            {activeTab === 'search' ? (
                <main>
                    <SearchBar />

                    {loading ? (
                        <div className="flex justify-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <MovieList movies={searchResults} title="Search Results" />
                    )}

                    {searchResults.length === 0 && !loading && (
                        <div className="text-center py-20 opacity-50">
                            <Layout size={64} className="mx-auto mb-4" />
                            <p>Type something to start exploring movies</p>
                        </div>
                    )}
                </main>
            ) : (
                <main>
                    {lastRemoved && (
                        <div className="glass p-6 rounded-2xl mb-10 flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-300 border border-white/10">
                            <p className="text-gray-200 font-medium">Removed "{lastRemoved.title}" from watchlist.</p>
                            <button
                                onClick={undoRemove}
                                className="btn bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
                            >
                                Undo
                            </button>
                        </div>
                    )}
                    <MovieList movies={watchlist} title="Saved for Later" isWatchlist={true} />
                </main>
            )}

            <footer className="mt-20 py-8 border-t border-white/5 text-center text-gray-500 text-sm">
            </footer>
        </div>
    );
}

export default App;
