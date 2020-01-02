const express = require('express');
const cors = require('cors');

const backendApp = express();

backendApp.use(cors());

backendApp.get('/', (req, res) => {
  return res.send('');
});

backendApp.post('/test-endpoint1', (req, res) => {
  return res.json({ 'test-endpoint1': true });
});

backendApp.post('/test-endpoint2', (req, res) => {
  return res.json({ 'test-endpoint2': true });
});

backendApp.listen(8000);
