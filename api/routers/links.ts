import express from "express";
import {ILinkMutation} from "../types";
import Link from "../models/Links";

const linksRouter = express.Router();

linksRouter.post('/',  async (req, res, next) => {
    const generateShortUrl = (length = 7) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let shortUrl = '';

        for (let i = 0; i < length; i++) {
            shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return shortUrl;
    }

    const shortUrl = generateShortUrl();

    const result: ILinkMutation  = {
        shortUrl: shortUrl,
        originalUrl: req.body.originalUrl,
    }

    try {
        const link = new Link(result);
        await link.save();
        res.send(link);
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
        const link = await Link.findOne({shortUrl});

        if (!link) {
            res.status(404).send({error: 'Link not found'});
            return;
        }

        res.status(301).redirect(link.originalUrl as string);
    } catch (e) {
        next(e);
    }
});

export default linksRouter;