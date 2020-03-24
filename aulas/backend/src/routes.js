const express = require('express');
const OngControl = require('../src/controllers/ongController');
const IncControl = require('../src/controllers/incidentController');
const SesControl = require('../src/controllers/sessionController');

const routes = express.Router();
 
routes.post('/ongs', OngControl.create);
routes.get('/ongs', OngControl.getAll);
routes.get('/ongs/:id', OngControl.getOne);
 

routes.post('/incs', IncControl.create);
routes.get('/incs', IncControl.getAll);
routes.get('/incs/:id', IncControl.getOne);
routes.delete('/incs/:id', IncControl.delOne);

routes.post('/session', SesControl.create);

module.exports = routes;