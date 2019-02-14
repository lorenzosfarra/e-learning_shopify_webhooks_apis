const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const _ = require('lodash');

const ProductConfig = require('./product/config');

// CONFIG
const SERVER_PORT = 5000;

// Express app
const app = express();
app.use(bodyParser.json());

// Handle the products/create event
app.post('/webhooks/product/create', (req, res, next) => {
  // req.body <- product
  const product = _.pick(req.body, ProductConfig.KEYS);
  console.info(`${colors.gray('[PRODUCT/CREATE]')} for ${product.title} (${product.id}) by ${product.vendor} - ${colors.green("OK")}`);
  res.sendStatus(200);
});

// Handle the products/update event
app.post('/webhooks/product/update', (req, res, next) => {
  // req.body <- product
  const product = _.pick(req.body, ProductConfig.KEYS);
  console.info(`${colors.gray('[PRODUCT/UPDATE]')} for ${product.title} (${product.id}) by ${product.vendor} - LAST UPDATE: ${colors.cyan(product.updated_at)} - ${colors.green("OK")}`);
  res.sendStatus(200);
});

// Listen
app.listen(SERVER_PORT, () => {
  console.log(`[SERVER] Running on port ${SERVER_PORT}: ${colors.green("OK")}`);
});
