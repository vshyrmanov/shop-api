require('dotenv').config()
// const config = require('config');
const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const ShoppingRouter = require('./Routes/Shopping.routes');
const Users_shopRouter = require('./Routes/Users_shop.routes');
const home = require('./home');

const PORT = process.env.PORT || 80

app.use(express.json())
app.use(cors())
app.use('/shopping', ShoppingRouter);
app.use('/shop', Users_shopRouter);
app.use('/home', home);


async function start() {
	try {
		await mongoose.connect( process.env.URL_DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true
			// useCreateIndex: true
		})
		console.log('bd started')
	}
	catch (e) {
		console.log("server error", e.message);
	}
}

start()

app.listen(PORT, () => {
	console.log('server started')
})

