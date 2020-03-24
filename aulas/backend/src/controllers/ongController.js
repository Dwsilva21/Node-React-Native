const conn   = require('../database/connection');
const crypto = require('crypto');

module.exports = {

async create( request, response) {
    const  { name, email, whatsapp, city, uf } = request.body;
    const id  = crypto.randomBytes(4).toString('HEX');
    await conn('ongs').insert({ id,name,email,whatsapp,city,uf} );
    console.log(name);
    return response.json( {evento: 'dia legal mesmo sss= ' , parametro:  email, ID: id } );
},

async getAll( request, response ) {
   const ongs =  await conn('ongs').select('*');
   return response.json(ongs);
},

async getOne( request, response) {
    const ongs =  await conn('ongs').select('*').where('id',request.params.id);
    return response.json(ongs);
}


}