'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.use((error, request, response, next)=>{
  response.status(500).send(error.message);
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
