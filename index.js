require('dotenv').config()
// const config = require('config');
const express = require('express');
const app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const ShoppingRouter = require('./Routes/Shopping.routes');
const Users_shopRouter = require('./Routes/Users_shop.routes');
const home = require('./home');

const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs-extra');

const PORT = process.env.PORT || 80

const upload = multer({dest: "uploads/"});

app.post('/read', upload.single('file'), (req, res) => {
  try {
    if (req.file?.filename == null || req.file?.filename == "undefined") {
      res.status(400).json('No file')
    } else {
      const filePath = 'uploads/' + req.file.filename

      const excelData = excelToJson({
        sourceFile: filePath,
        
        sheets: [{
          name: "testik",
          header: {
            rows: 1
          },
          columnToKey: {
            "A": "lastName",
            "B": "Name",
            "C": "fatherName",
            "D": "speciality",
            "E": "adress",
          }
        },
        {
          name: "TO",
          header: {
            rows: 1
          },
          columnToKey: {
            "A": "lastName",
            "B": "Name",
            "C": "fatherName",
            "D": "speciality",
            "E": "adress"
          }
        }
      ]
        
      })

      fs.remove(filePath)

      res.status(200).json(excelData)
    }
  } catch {
    res.status(500)
  }
})

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

