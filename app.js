//Libraries
const express = require('express');
const app = express();

//Controllers
const { healthCheck } = require('./controllers/health');
const { notFound } = require('./controllers/notfound');
const { getdron, status } = require('./controllers/dron');

//Variables
const PORT = process.env.PORT || 8080;

app.get('/health', healthCheck);
app.get('/status', status);
app.get('/getdron', getdron);

app.get('*', notFound);


app.listen(8080, function() {
  console.log( `Listening port: ${PORT}`);
});