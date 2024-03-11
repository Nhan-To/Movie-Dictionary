import { movieModel } from "../models/movieModel.js";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const createMovie = async (req, res) => {
    try {
        const {
            ID,
            name,
            time,
            year,
            image,
            introduce
        } = req.body;
        
        const newMovie = new movieModel({
            ID,
            name,
            time,
            year,
            image,
            introduce
        });

        const savedMovie = await newMovie.save();

        res.status(201).json({
            message: 'Movie created successfully',
            data: savedMovie
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getMovie = async (req, res) => {
    try {
        let { page, limit, sort } = req.query;
        const moviesPerPage = limit; 
        const skipValue = page * moviesPerPage;
        
        let sortOptions = {};
        if (sort === 'ascending') {
            sortOptions = { name: 1 }; 
        } else if (sort === 'descending') {
            sortOptions = { name: -1 }; 
        } else {
            sortOptions = { name: 1 }; 
        }

        const movies = await movieModel.find().sort(sortOptions).skip(skipValue).limit(moviesPerPage);

        res.status(200).json({
            message: 'Successful',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const findMovie = async (req, res) => {
    try {
        const { keyword, page, limit, sort } = req.query;
        const regexPattern = new RegExp(keyword, 'i');
        const moviesPerPage = limit; 
        const skipValue = page * moviesPerPage;
        let sortOptions = {};
        if (sort === 'ascending') {
            sortOptions = { name: 1 }; 
        } else if (sort === 'descending') {
            sortOptions = { name: -1 }; 
        } else {
            sortOptions = { name: 1 }; 
        }
        const movies = await movieModel.find({ name: { $regex: regexPattern } })   
                                       .sort(sortOptions)         
                                       .skip(skipValue)
                                       .limit(limit);
        res.status(200).json({
            message: 'Movies found successfully',
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateMovie = async (req, res) => {
    try {
        const { name } = req.params;
        const {
            time,
            year,
            introduce
        } = req.body;

        let imageUrl = req.file ? (await cloudinary.uploader.upload(req.file.path)).secure_url : undefined;

        const updatedMovie = await movieModel.findOneAndUpdate({ name }, {
            time,
            year,
            image: imageUrl,
            introduce
        }, { new: true });

        res.status(200).json({
            message: 'Movie updated successfully',
            data: updatedMovie
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { name } = req.params;
        await movieModel.findOneAndDelete({ name });
        res.status(200).json({
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


export { createMovie, getMovie, findMovie, updateMovie, deleteMovie };
