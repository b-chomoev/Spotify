import express from "express";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import Album from "../models/Album";

const albumRouter = express.Router();

albumRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);

        if (!artist) res.status(404).send({error: 'Artist not found'});
    }

    const albumData = {
        name: req.body.name,
        artist: req.body.artist,
        date: req.body.date,
        image: req.file ? 'images' + req.file.filename : null,
    }

    try {
        const album = new Album(albumData);
        await album.save();
        res.send(album);
    } catch (e) {
        next(e);
    }
});

export default albumRouter;