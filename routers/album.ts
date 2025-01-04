import express from "express";
import {imagesUpload} from "../multer";
import Artist from "../models/Artist";
import Album from "../models/Album";

const albumRouter = express.Router();

albumRouter.get('/', async (req, res, next) => {
    const albumArtistQuery = req.query.artist;

    try {

        if (albumArtistQuery) {
            const albums = await Album.find({artist: albumArtistQuery}).populate('artist', '-_id name');
            res.send(albums);
            return;
        }

        const albums = await Album.find().select('-__v');
        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const album = await Album.findById(id);

        if (!album) res.status(404).send({error: 'Album not found'});

        res.send(album);
    } catch (e) {
        next(e);
    }
});

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