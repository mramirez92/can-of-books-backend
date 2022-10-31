'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL);

// *INVOKE MODEL from book.js

const Book = require('./models/book.js');

require('dotenv').config();

async function seed(){

  await Book.create({
    title: 'What It\'s Like to Be a Bird',

    description: 'The bird book for birders and nonbirders alike that will excite and inspire by providing a new and deeper understanding of what common, mostly backyard, birds are doing—and why: "Can birds smell?"; "Is this the same cardinal that was at my feeder last year?" "Do robins \'hear\' worms?" ',

    status: 'available',

  });

  console.log('bird book created');
  mongoose.disconnect();
}

seed();
