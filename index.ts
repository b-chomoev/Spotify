import express from "express";
import * as mongoose from "mongoose";
import mongoDb from "./mongoDb";
import artistRouter from "./routers/artist";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/artists', artistRouter);

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