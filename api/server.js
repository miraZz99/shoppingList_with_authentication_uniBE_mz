import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import User from "./models/User.js";
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const secret = 'secret123';

await mongoose.connect('mongodb+srv://Mz99:desperado74@clustertest.uxxke.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.log);

const app = express();

app.use(cookieParser());
app.use(bodyParser.json({extended:true}));
app.use(cors({
  credentials:true,
  origin: 'http://localhost:3000',  
}));

app.get('/', (req, res) => {
  res.send( 'ok' );
})
app.post('/register', (req, res) => {
  const {email, password} = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({password: hashedPassword, email});
  user.save().then(userInfo => {
    jwt.sign({id:userInfo._id, email:userInfo.email}, secret, (err, token) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.cookie('token', token).json({id:userInfo._id, email:userInfo.email});
      }
    });
  });
})
app.listen(4000);