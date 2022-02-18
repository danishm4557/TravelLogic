const express = require('express')
const places = express.Router()
const Place = require('../models/placeModel')
const compression = require('compression')

places.use(compression())  // Data coming from Front-End too large. Using this to compress it.

places.get('/', (req, res) => {
	Place.find({}, (error, foundPlace) => {
	  if(error) {
		res.status(400).json({ error: error.message})
	  } else {
		res.status(200).json(foundPlace)
	  }
	})
  })

places.post('/', (req, res) => {
	console.log(req.body);
	Place.create(req.body, (error, createdPlaces) => {
	  if(error) {
		res.status(400).json({ error: error.message})
	  } else {
		res.flush()
		console.log(createdPlaces);
		res.status(200).json(createdPlaces)

	  }
	})
  })

//   let placeFoundById = []
// // Add ID as a parameter to the route    (/:id/:date)
//   places.get('/:_id', (req, res) => {
// 	Place.find().where({_id: req.params._id}), (error, foundPlan) => {
// 	  if(error) {
// 		res.status(400).json({ error: error.message})
// 	  } else {
// 		res.status(200).json(foundPlan)
// 		// placeFoundById = foundPlan
// 		// placeFoundById.where({ places. })
// 	  }
// 	}
//   })



module.exports = places