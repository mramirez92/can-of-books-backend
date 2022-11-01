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

// ** MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;


// ** ENDPOINTS 

app.get('/test', (request, response) => {

  response.send('test request received');

});

app.get('/', (request, response) => {
  response.status(200).send('Welcome to Can of Books!');
});

app.get('/books', getBooks);

app.post('/books', postBooks);

// !ask about param
app.delete('/books/:bookID', deleteBooks);

//  ** ASYNC FUNCTIONS

async function getBooks(request, response, next) {
  try {
    let results = await Book.find();
    response.status(200).send(results);

  } catch (error) {
    next(error);
  }
}

async function postBooks(request, response, next){
  try{
    let createdBook = await Book.create(request.body);
    response.status(200).send(createdBook);
    console.log('book created');
  }catch(error){
    next (error);
  }
}

async function deleteBooks(request, response, next){
  try{
    let bookID = request.params.bookID;
    await Book.findByIdAndDelete(bookID);
    response.status(200).send('Book was removed.');
    console.log('book removed');
  }catch(error){
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Our apologies, this book is currently not available.');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
