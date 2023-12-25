const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config();

const app = express();
const config = process.env;

const link = require('./Schemas/link.js');

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

app.get('/redirect', async (request, response) => {
    return response.render('redirect');
});

app.post('/create', async (request, response) => {
    const shortURL = request.body.shortURL;
    const longURL = request.body.longURL;
    const createdAt = Date.now();
    const expiresAt = request.body.expiresAt || 'Never';

    if (!longURL || !shortURL) {
        return response.send({
            status: 'warning',
            message: 'You need to either input a link or a short link!'
        });
    }

    const linkSchema = await link.findOne({
        shortURL: shortURL
    });

    if (linkSchema) {
        return response.send({
            status: 'error',
            message: 'A link with the same Cliqit ID (Short link) already exists!'
        });
    }

    if (Date.parse(expiresAt) < new Date()) {
        return response.send({
            status: 'warning',
            message: 'The expiry date is before the current time! Change it to a later date or leave it empty for no expiry.'
        });
    }

    await link.create({
        shortURL: shortURL,
        longURL: longURL,
        createdAt: createdAt,
        expiresAt: expiresAt === 'Never' ? 'Never' : new Date(expiresAt).getTime()
    });

    return response.send({
        status: 'success',
        message: `Cliqit ID (Short link) has been created! (${shortURL})`
    });
});

app.listen(config.PORT, () => {
    return console.log('Beep! App running on http://localhost:' + config.PORT);
});