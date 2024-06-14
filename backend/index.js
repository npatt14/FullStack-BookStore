import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json());

//Middleware for handling CORS Policy
app.use(cors());
// app.use(
//     cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE' ],
//     allowHeaders: ['Content-Type'],
// })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).send('Welcome to MERN Stack');
});

app.use('/books', booksRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`app is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })