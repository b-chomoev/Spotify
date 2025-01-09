import express from "express";
import * as mongoose from "mongoose";
import mongoDb from "./mongoDb";
import artistRouter from "./routers/artist";
import albumRouter from "./routers/album";
import trackRouter from "./routers/track";
import userRouter from "./routers/users";
import trackHistoriesRouter from "./routers/trackHistories";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);
app.use('/users', userRouter);
app.use('/track_history', trackHistoriesRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/spotify');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    })
};

run().catch(err => console.log(err));