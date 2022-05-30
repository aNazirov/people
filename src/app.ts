import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from 'passport';
import path from 'path';
import { passportStatic } from './midelwares/passport';
import { AuthRouter, UserRouter } from './routes';

const app = express();

async function start() {
  try {
    await mongoose
      .connect(process.env.MONGO_URI || '')
      .then(() => console.log(`MongoDB connected`));
  } catch (error) {
    console.log('Server error', error);
    process.exit(1);
  }
}

start();

app.use(passport.initialize());
passportStatic(passport);

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', AuthRouter.default);
app.use('/api/user', UserRouter.default);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

export default app;
1653766376952-1625689876_6