const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();
const config = process.env;

const link = require('./Schemas/link.js');
const account = require('./Schemas/account.js');

mongoose.set('strictQuery', false);
mongoose.connect(`${config.MongoDB}`).then(() => {
    console.log('Connected to the database');
});

app.set('views', path.join(__dirname, './Views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './Views')));

app.get('/', async (request, response) => {
    return response.render('index');
});

app.listen(config.PORT, () => {
    return console.log('Beep! App running on http://localhost:' + config.PORT);
});