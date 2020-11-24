//Libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require("helmet");

//Controllers
const { healthCheck } = require('./controllers/health');
const { notFound } = require('./controllers/notfound');
const { deliveryFile } = require('./controllers/dron');

//Variables
const PORT = process.env.PORT || 8080;

//App Uses
app.use(helmet());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('combined'));

//Endpoints
app.get('/health', healthCheck);
app.post('/delivery', deliveryFile);
app.get('*', notFound);

app.listen(8080, () =>  console.log( `Listening port: ${PORT}`));
