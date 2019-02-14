const express = require('express');
const logger = require('volleyball');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(logger);
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/ping', (req, res) => {
    res.status(200).json('pong');
});

app.get('/', (req, res) => {
    const d = new Date();
    const date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    res.status(200).json(date);
});

require('./database')(app);

module.exports = app;
