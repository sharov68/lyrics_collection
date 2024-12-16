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
	const songName = "Троллиная рыбалка";
	const songText = `
На сером утёсе сидел старый тролль,
И рыбу удил он в пучине морской,
К удилищу из трёхсотлетней сосны
Привязан канат корабельный
В пучине у Ньёрда чудовищных тварей
Косаток свирепых и змеев морских
Хватает в избытке, но только беда:
В садке было пусто у тролля

Ведь на башку священника не ловится!
На младенца мёртвого не ловится!
На пизду-лохматку старой скотницы
И на жопу Ульва рыбака!
Ходит тролль по фьорду с удой,
Людям всем грозит он бедой,
Только вот улов-то худой,
Рыба не клюёт у дурака!
Баребухов тролль прямо с жопы наскрёб
И с девственной кровью монашки смешал,
Прикормка такая должна бы помочь,
Но клёва по-прежнему нету!
Тут мимо шагал деревенский дурак
И троллю совет он осмелился дать:
"Коль хочешь, чтоб клюнуло наверняка -
Елду свою сделай наживкой!"

И тролль бестолковый схватился за хуй
На крюк исполинский его наживил
И в море забросил, угрюмо ворча
В голодные серые волны
И клюнул на удочку змей Йормундганд
И тролля в пучину рывком уволок
И сгинул в волне непутёвый рыбак
И больше его не видали!
	`;
	return { songName, songText };
}
