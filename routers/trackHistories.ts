import express from "express";
import User from "../models/User";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (req, res) => {
    const token = req.get('Authorization');

    if (!token) {
        res.status(401).send({error: 'No token presented'});
        return;
    }

    const user = await User.findOne({token});

    if (!user) {
        res.status(401).send({error: 'Wrong token'});
        return;
    }

    res.send({username: user.username, id_user: user._id});
});

export default trackHistoriesRouter;