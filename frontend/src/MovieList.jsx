import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MovieList.css';

const MovieList = ({ movies: initialMovies = [], onMovieClick }) => {
    const [movies, setMovies] = useState(initialMovies);
    const [currentPage, setCurrentPage] = useState(0);
    const moviesPerPage = 4;
    const [hasNextPage, setHasNextPage] = useState(true);
    const [sortOrder, setSortOrder] = useState('ascending');

    useEffect(() => {
        console.log(initialMovies)
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/movies?page=${currentPage}&limit=${moviesPerPage}&sort=${sortOrder}`);
                setMovies(response.data.data);
                checkNextPage(currentPage + 1);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        if (initialMovies.length === 0) {
            fetchMovies();
        }
        else {
            setMovies(initialMovies);
        }
    }, [currentPage, initialMovies, sortOrder]);

    const checkNextPage = async (nextPage) => {
        try {
            const response = await axios.get(`http://localhost:3001/movies?page=${nextPage}&limit=${moviesPerPage}`);
            setHasNextPage(response.data.data.length > 0);
        } catch (error) {
            console.error('Error checking next page:', error);
        }
    };

    const nextPage = () => setCurrentPage(page => page + 1);
    const prevPage = () => setCurrentPage(page => page - 1);

    const toggleSortOrder = () => {
        const newSortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
        setSortOrder(newSortOrder);
    };

    const handleMovieClick = (movie) => {
        onMovieClick(movie);
    };

    return (
        <div className="movie-list-container">
            <div className="sort-buttons">
            </div>
            <ul className="movie-list">
                {movies.map(movie => (
                    <li key={movie.ID} className="movie-item" onClick={() => handleMovieClick(movie)}>
                        <img src={movie.image} alt={movie.name} className="movie-image" />
                        <span>{movie.name}</span>
                    </li>
                ))}
            </ul>
            <button onClick={toggleSortOrder}>
                {sortOrder === 'ascending' ? 'Sort from Z-A' : 'Sort from A-Z'} Order
            </button>
            <div>
                <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
                <button onClick={nextPage} disabled={!hasNextPage}>Next</button>
            </div>
        </div>
    );
};

export default MovieList;