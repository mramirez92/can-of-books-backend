'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL);


// *INVOKE MODEL from book.js

const Book = require('./models/book.js');

async function seed(){

  await Book.create({
    title: 'What It\'s Like to Be a Bird',

    description: 'The bird book for birders and nonbirders alike that will excite and inspire by providing a new and deeper understanding of what common, mostly backyard, birds are doing—and why: "Can birds smell?"; "Is this the same cardinal that was at my feeder last year?" "Do robins \'hear\' worms?" ',

    status: 'available',

  });

  await Book.create({
    title: 'The Body: A Guide for Occupants',

    description: 'Bill Bryson once again proves himself to be an incomparable companion as he guides us through the human body--how it functions, its remarkable ability to heal itself, and (unfortunately) the ways it can fail. Full of extraordinary facts (your body made a million red blood cells since you started reading this) and irresistible Bryson-esque anecdotes, The Body will lead you to a deeper understanding of the miracle that is life in general and you in particular. As Bill Bryson writes, "We pass our existence within this wobble of flesh and yet take it almost entirely for granted." The Body will cure that indifference with generous doses of wondrous, compulsively readable facts and information.',

    status: 'available',

  });

  console.log('bird book created');
  console.log('body book created');

  mongoose.disconnect();
}

seed();
