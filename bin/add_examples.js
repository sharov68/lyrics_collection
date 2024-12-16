const config = require("../config");
const localConfig = require("../local-config");
const _ = require("lodash");
const cfg = _.merge(config, localConfig);
const mongoose = require('mongoose');
const Bands = require('../models/Bands');
const Songs = require('../models/Songs');

const bandName = "Införnal FuckЪ";
const { songName, songText } = getSong();

mongoose.connect(`mongodb://${cfg.mongodb.host}:${cfg.mongodb.port}/${cfg.mongodb.name}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
	console.log('Connected to MongoDB');
	(async () => {
		try {
			let band = await Bands.findOne({ name:bandName });
			if (_.isEmpty(band)) {
				const newBand = new Bands({ name:bandName });
				band = await newBand.save();
			}
			console.log(band);
			const newSong = new Songs({ name:songName, text:songText, _idband:band._id });
			band = await newSong.save();
			process.exit();
		} catch (error) {
			console.log(error);
			process.exit();
		}
	})();
});

function getSong(){
	const songName = "Долбослав"; 
	const songText = `
Am
Нынче утром к нам пристав
G
Конспиролог-долбослав
Am
С Велесовой книжкою
F C Em Am
Нёс её под мышкою
Нам втирал, что гадят миру
Рептилоиды с Нибиру
Лишь славяне могут их
Победить, в рот им чих-пых
========
Предки жили, бед не знали,
Храбро мамонтов седлали,
Начитавшись мудрых вед,
Жили каждый тыщу лет,
Рептилоиды прилетали,
Веру мудрую украли,
Скрыли знания от нас,
Дали в рог, нассали в квас
========
Оттого всё плохо тут,
Что историки нам врут,
Знанья тайные сокрыты
Мировой жидоэлитой
Начертил нам тайный символ
На полене долбослав,
Мы сказали - кракозябры,
Он поправил - гальдрастав!
=======
Затирал про веру дедов,
Про Сварога и про Веды,
Про коварных про жидов,
И про СкАйрим для нордОв
Предложил нам выпить мёду,
Типа в мёде - мудрость Рода,
Первый тост за Алконост,
А второй за холокост
=========
Предъявили за свастон
Он бзданул и вышел вон,
Следом мчались санитары
С галоперидольной карой
	`;
	return { songName, songText };
}
