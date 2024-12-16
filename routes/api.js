const express = require('express');
const router = express.Router();
const Item = require('../models/Item'); // это пример, не забыть потом удалить

// API: Получить список элементов
router.get('/items', async (req, res) => {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (error) {
		res.status(500).json({ error: 'Ошибка при получении данных' });
	}
});

// API: Добавить новый элемент
router.post('/items', async (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Имя обязательно' });
	}
	try {
		const newItem = new Item({ name });
		await newItem.save();
		res.status(201).json(newItem);
	} catch (error) {
		res.status(500).json({ error: 'Ошибка при добавлении элемента' });
	}
});

module.exports = router;
