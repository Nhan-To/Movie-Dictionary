import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css'; 

const SearchBar = ({ onSearch, onRefresh }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleSearch = () => {
        axios.get(`http://localhost:3001/movies/search?keyword=${query}`)
        .then(response => {
            onSearch(response.data.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={handleChange}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">Search</button>
            <button onClick={onRefresh} className="refresh-button">Refresh</button>
        </div>
    );
}

export default SearchBar;
