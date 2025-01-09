import express from "express";
import Link from "../models/Links";

const linksRouter = express.Router();

linksRouter.post('/',  async (req, res, next) => {
    if (!req.body.originalUrl) {
        res.status(400).send({error: 'Original URL must be present in the request'});
        return;
    }

    const generateShortUrl = (length = 7) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let shortUrl = '';

        for (let i = 0; i < length; i++) {
            shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return shortUrl;
    }

    let shortUrl = null;
    let isUnique = false;

    while (!isUnique) {
        shortUrl = generateShortUrl();
        const existingLink = await Link.findOne({shortUrl});

        if (!existingLink) {
            isUnique = true;
        }
    }

    const newLink = new Link({
        shortUrl: shortUrl,
        originalUrl: req.body.originalUrl,
    });

    try {
        await newLink.save();
        res.send(newLink);
    } catch (e) {
        next(e);
    }
});

linksRouter.get('/:shortUrl', async (req, res, next) => {
    const shortUrl = req.params.shortUrl;

    if (!shortUrl) {
        res.status(400).send({error: 'ShortUrl must be present in the request'});
        return;
    }

    try {
        const link = await Link.find({shortUrl});

        if (!link) {
            res.status(404).send({error: 'Link not found'});
            return;
        }

        res.status(301).redirect(link[0].originalUrl);
    } catch (e) {
        next(e);
    }
});

export default linksRouter;