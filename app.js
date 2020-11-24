//Libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

//Controllers
const { healthCheck } = require('./controllers/health');
const { notFound } = require('./controllers/notfound');
const { getdron, status } = require('./controllers/dron');
const { readDeliveryFile } = require('./controllers/file');

//Variables
const PORT = process.env.PORT || 8080;

//App Uses
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('combined'));

//Endpoints
app.get('/health', healthCheck);
app.get('/status', status);
app.get('/getdron', getdron);
app.post('/delivery', readDeliveryFile);

app.get('*', notFound);


app.listen(8080, () =>  console.log( `Listening port: ${PORT}`));

exports.module = app;