import React, { useState } from 'react';
import MovieList from './MovieList';
import MoviePopup from './MoviePopup';
import SearchBar from './SearchBar';
import './App.css'

const App = () => {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [searchResults, setSearchResults] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleClosePopup = () => {
        setSelectedMovie(null);
    };

    const handleSearch = (results) => {
        setSearchResults(results);
        setCurrentPage(0); // Reset pagination to the first page when performing a new search
    }

    const handleRefresh = () => {
        setSearchResults(null);
        setCurrentPage(0); // Reset pagination when refreshing
    }

    // Calculate the subset of movies to display on the current page
    const getMoviesForCurrentPage = () => {
        if (!searchResults) return [];
        const startIndex = currentPage * 4;
        const endIndex = startIndex + 4;
        return searchResults.slice(startIndex, endIndex);
    };

    const handleNextPage = () => {
        setCurrentPage(page => page + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(page => Math.max(page - 1, 0));
    };

    return (
        <div>
            <div className='title-container'>
                <h2 className='title'>Movie List</h2>
            </div>
            <SearchBar onSearch={handleSearch} onRefresh={handleRefresh}/>
            <MovieList
                movies={getMoviesForCurrentPage()}
                onMovieClick={handleMovieClick}
                nextPage={handleNextPage}
                prevPage={handlePrevPage}
                currentPage={currentPage}
                hasNextPage={searchResults && searchResults.length > (currentPage + 1) * 4}
                hasPrevPage={currentPage > 0}
            />
            {selectedMovie && <MoviePopup movie={selectedMovie} onClose={handleClosePopup} />}
        </div>
    );
};

export default App;
