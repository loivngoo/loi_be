import Helper from '../helpers';
require('dotenv').config();
import sequelize from '../config/connection';
import initWebRouter from '../api/web.js';
import { Server } from 'socket.io';

import path, { dirname } from 'path';
import cors from 'cors';
import express from 'express';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import { Chat } from '../controllers/Chat';
import { connectDb } from '../config/mongod';
import SupportSocket from '../controllers/Support/SupportSocket';
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

initWebRouter(app);

app.use(express.static(path.join(__dirname, 'public')));

app.get(/./, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist.'));
});

app.use((err, req, res, next) => {
    res.json({
        status: err.status || 500,
        message: err.message,
    });
});

/****************************************************** */

const port = process.env.PORT_SERVER;

const USE_SSL = false;

let httpServer = null;
if (!USE_SSL) {
    httpServer = require('http').createServer(app);
} else {
    let options = Helper.ssl;
    httpServer = require('https').createServer(options, app);
}

const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

io.on('connection', async(socket) => {
    await Chat(io, socket);
    await SupportSocket(io, socket);
}).on('disconnect', (socket) => {
    console.log('user disconnected');
});

connectDb()
    .then(() => {
        httpServer.listen(port, async() => {
            try {
                await sequelize.authenticate();
                console.log('Connection Database successfully.');
            } catch (error) {
                console.error('Kết nối tới database thất bại: ', error);
            }
            console.log('Server start port: ' + port);
        });
    })
    .catch((err) => {
        console.log(err);
    });