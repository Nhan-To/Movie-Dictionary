import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    introduce: {
        type: String,
        required: true
    }
});

const movieModel = mongoose.model('Movie', movieSchema);

export { movieModel };
