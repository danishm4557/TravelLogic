////////////////////// REQUIRE DEPENDENCIES //////////////////////
const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const MONGODB_URI = process.env.MONGODB_URI
//////////////////////////////////////////////////////////////////







//////////////////////// SET UP API KEY //////////////////////////
const baseUrl = ""
const apiKey = process.env.APIKEY
//////////////////////////////////////////////////////////////////







///////////////////// SET UP CORS MIDDLEWARE//////////////////////
const allowedList = ['http://localhost:3000', 'https://travel-logic-frontend.herokuapp.com']
const corsOptions = {
	origin: (origin, callback) => {
		if(allowedList.indexOf(origin) !== -1 || !origin) {
		  callback(null, true)
		} else {
		  callback(new Error('Not allowed by CORS'))
		}
	},
	credentials: true
}
//////////////////////////////////////////////////////////////////







//////////////////////// CORS MIDDLEWARE /////////////////////////
app.use(cors(corsOptions))
// app.use(express.urlencoded({extended: true, limit: '100kb'}))
app.use(express.json({limit: '50mb'}))
//////////////////////////////////////////////////////////////////







/////////////////////// CONNECT MONGOOSE /////////////////////////
const db = mongoose.connection
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, () => {
	console.log('Database Connected')
})

db.on('error', (err) => { console.log('Error: ', err) })
db.on('connected', () => { console.log('Mongo Connected') })
db.on('disconnected', () => { console.log('Mongo Disconnected') })
//////////////////////////////////////////////////////////////////







/////////////////////////// MIDDLEWARE////////////////////////////
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//////////////////////////////////////////////////////////////////







///////////////////////// SET UP ROUTES //////////////////////////
app.get('/', (req, res) => {
	// res.redirect('http://localhost:3000/home')
	res.redirect('/home')
}) 

app.use('/home', require('./controllers/homeController'))
//////////////////////////////////////////////////////////////////





app.listen(PORT, () => {
	console.log(`PORT running on Port ${PORT}`)
})