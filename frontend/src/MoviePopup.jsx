import React, { useState } from 'react';
import './MoviePopUp.css';
import axios from 'axios';

const MoviePopup = ({ movie, onClose }) => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', image);

        axios.put(`http://localhost:3001/movies/${movie.name}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Image uploaded successfully');
            onClose();
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
    };

    return (
        <div className="popup-container"> 
            <div className="popup-overlay" onClick={onClose}></div> 
            <div className="popup-content">
                <img src={movie.image} alt={movie.name} className="popup-image" />
                <div className="popup-detail">
                    <button className="close-btn" onClick={onClose}>X</button>
                    <h2>{movie.name}</h2>
                    <p className='faded'> {movie.year}</p>
                    <p className='faded'> {movie.time} minutes</p>
                    <p>{movie.introduce}</p> 
                    <input type="file" onChange={handleImageChange} />
                    <button onClick={handleUpload}>Upload Image</button>
                </div>
            </div>
        </div>
    );
};

export default MoviePopup;
