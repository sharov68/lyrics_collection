"use strict";
const config = require("./config");
const localConfig = require("./local-config");
const _ = require("lodash");
const cfg = _.merge(config, localConfig);
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

const app = express();

// Подключение к MongoDB
mongoose.connect(`mongodb://${cfg.mongodb.host}:${cfg.mongodb.port}/${cfg.mongodb.lyrics_collection}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// Конфигурация шаблонизатора Handlebars
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршруты
app.get('/', (req, res) => {
	res.render('index', { title: 'Главная страница' });
});
app.use('/api', apiRoutes);

// Запуск сервера
app.listen(cfg.port, () => {
	console.log(`Server is running on http://localhost:${cfg.port}`);
});
