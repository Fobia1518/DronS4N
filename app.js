//Libraries
const express = require('express');
const app = express();

//Controllers
const { healthCheck } = require('./controllers/health');
const { notFound } = require('./controllers/notfound');
const { getdron, status } = require('./controllers/dron');
const { readDeliveryFile } = require('./controllers/file');

//Variables
const PORT = process.env.PORT || 8080;

app.get('/health', healthCheck);
app.get('/status', status);
app.get('/getdron', getdron);
app.get('/delivery', readDeliveryFile);

app.get('*', notFound);


app.listen(8080, () =>  console.log( `Listening port: ${PORT}`));