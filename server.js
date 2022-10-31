'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const axios = require('axios');

// * require model
const Book = require('./models/book.js');

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received');

});

app.get('/', (request, response)=>{
  response.status(200).send('Welcome to Can of Books!');
});

app.get('/books',getBooks);

async function getBooks(request, response,next){
  try{
    let results = await Book.find();
    response.status(200).send(results);

  }catch(error){
    next(error);
  }
}

app.get('*', (request, response)=> {
  response.status(404).send('Not Available');
});

app.use((error, request, response, next) =>{
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
