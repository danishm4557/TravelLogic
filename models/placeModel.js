const mongoose = require('mongoose')
const {Schema, model} = mongoose

const placeSchema = new Schema ({
	name: String,
	date: String,
	places: Array,
	latitude: Number,
	longitude: Number,
	description: String,
	imageUrl: String
})

const Place = model('Place', placeSchema)

module.exports = Place