import mongoose from "mongoose";

const Schema = mongoose.Schema;
const LinkSchema = new Schema({
    shortUrl: {
        type: String,
    },
    originalUrl: {
        type: String,
    },
});

const Link = mongoose.model('Link', LinkSchema);

export default Link;