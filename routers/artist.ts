import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";

const artistRouter = express.Router();

artistRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find().select('-__v');
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({error: 'Name must be present in the request'});
        return;
    }

    const artistData = {
        name: req.body.name,
        description: req.body.description,
        image: req.file ? 'images' + req.file.filename : null,
    };

    try {
        const artist = new Artist(artistData);
        await artist.save();
        res.send(artist);
    } catch (e) {
        next(e);
    }
});

export default artistRouter;