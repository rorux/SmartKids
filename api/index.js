require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const router = require('./routers');
app.use(router);

const PORT = process.env.PORT || 3000;

async function start() {
    try {
      
      await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useFindAndModify: false
      })
  
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
      })
  
    } catch (e) {
      console.log(e)
    }
  }

start();