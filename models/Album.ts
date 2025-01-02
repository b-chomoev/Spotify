import mongoose from "mongoose";

const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist',
        required: [true, 'Artist is required'],
    },
    date: {
        type: Number,
        required: true,
    },
    image: String,
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;