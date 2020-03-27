const express = require('express');
const OngControl = require('../src/controllers/ongController');
const IncControl = require('../src/controllers/incidentController');
const SesControl = require('../src/controllers/sessionController');

const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router(); 
 
routes.post('/ongs', celebrate({
    [Segments.BODY]:Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(11).max(13),
        city: Joi.string().required().length(2),
    })
}) , OngControl.create);
routes.get('/ongs', OngControl.getAll);
routes.get('/ongs/:id', OngControl.getOne);
 

routes.post('/incs', IncControl.create);

routes.get('/incs', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}), IncControl.getAll);


routes.get('/incs2', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),IncControl.getAll2);




routes.get('/incs/:id', IncControl.getOne);

routes.delete('/incs/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),IncControl.delOne);


routes.delete('/incsxyz', IncControl.delAll);

routes.post('/session', SesControl.create);

module.exports = routes;