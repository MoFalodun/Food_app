/* eslint-disable no-console */
import express, { json } from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
// require('./Models/seed')
import {
  userRouter, adminRouter, foodRouter, cartRouter,
} from './Routes';

require('dotenv').config();

const app = express();

app.use(json());
app.use(userRouter);
app.use(adminRouter);
app.use(foodRouter);
app.use(cartRouter);
app.use(logger('dev'));

mongoose.connect(process.env.DATABASE_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to Mongodb'))
  .catch((err) => console.log('Could not connect to Mongodb...', err));

app.listen(3000, () => console.log(`Listening on port ${3000}`));
