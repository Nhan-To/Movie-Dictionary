import express from "express";
import {createMovie, getMovie, findMovie, updateMovie, deleteMovie} from "../controllers/movieController.js"
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const movieRouter = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

movieRouter.route('/').post(createMovie)
                      .get(getMovie);
                    
movieRouter.route('/:name').put(upload.single('image'), updateMovie)
                           .delete(deleteMovie);

movieRouter.route('/search').get(findMovie);
export { movieRouter };