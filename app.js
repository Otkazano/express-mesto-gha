import express, { json } from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import router from './routes/index.js';

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(json());

async function startApp() {
  try {
    await mongoose
      .connect(DB_URL)
      .then(() => {
        console.log('Connected to database');
      })
      .catch((error) => {
        console.log('Error', error);
      });
    app.use(router);
    app.listen(PORT, () => {
      console.log('Server is working on port', PORT);
    });
  } catch (error) {
    console.log('Error', error);
  }
}

startApp();
