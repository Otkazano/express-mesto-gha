import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import router from './routes/index.js'

const { PORT = 3000 } = process.env
const DB_URL = `mongodb://localhost:27017/mestodb `

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    _id: '65532fdbf756804b5649fa36' 
  };

  next();
}); 

async function startApp () {
  try {
    await mongoose
      .connect(DB_URL)
      .then(() => {
        console.log('Connected to database')
      })
      .catch(err => {
        console.log(`Erorr ${err.name} ${err.message}`)
      })
    app.use(router)
    app.listen(PORT, () => {
      console.log('server is working on port', PORT)
    })
  } catch (err) {
    console.log('Ошибка', err)
  }
}

startApp()
