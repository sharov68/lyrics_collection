const config = require("../config");
const localConfig = require("../local-config");
const _ = require("lodash");
const cfg = _.merge(config, localConfig);
const mongoose = require('mongoose');
const Bands = require('../models/Bands');
const Songs = require('../models/Songs');

const bandName = "Сколот";
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
	const songName = "Варяги";
	const songText = `
А ну, брат, на весла давай налегай!
Хэ-хэй! Налегай!
А кто не гребет, тот сам огребет.
Ой, ай-яй-яй-яй!
Там, за морями, за океанами,
Нас заждались у огня.
Хватит уже украшать тела шрамами!
Нам возвращаться пора!
Припев:
Нас накрывало волнами, швыряло на скалы,
Но мы твердо шли вперед
Туда, куда синее небо и море зовет.
Нас накрывало дождями-снегами,
Но мы твердо знали то,
Что дом… Нас согреет наш дом.
А ну, брат, давай, веселей наливай!
Хэ-хэй! Наливай!
А кто не нальет, тот сам знаешь что.
Ой, ай-яй-яй-яй!
Здесь, за столами, накрытыми яствами,
В свете домашних костров,
Мы вернулись из боя с богатствами,
Так выпьем во славу Дедов!
Припев:
Нас накрывало волнами, швыряло на скалы,
Но мы твердо шли вперед
Туда, куда синее небо и море зовет.
Нас накрывало дождями-снегами,
Но мы твердо знали то,
Что дом… Нас согреет наш дом.
	`;
	return { songName, songText };
}
