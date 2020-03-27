const conn   = require('../database/connection');
const crypto = require('crypto');

module.exports = {

async create( request, response) {
    const  { title, description, value } = request.body;
    const ong_id  = request.headers.authorization;
    const [ id ] = await conn('incidents').insert({ title, description, value, ong_id } );
    console.log(title);
    return response.json( { evento: 'incidente' , parametro:  title, id } );
},
 
async getAll( request, response ) {
  
   const { page = 1 } = request.query;  
   const ong_id  = request.headers.authorization;
 
   const [count] =  await conn('incidents')
   .select('*')
   .count()
   .where('ong_id',ong_id);
   response.header('X-Total-Count', count['count(*)']);

   const incs =  await conn('incidents')
   .join('ongs','ongs.id','=','incidents.ong_id')
   .limit(5) 
   .offset((page-1)*5)
   .select(['incidents.*' , 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
   .where('ong_id',ong_id);

   return response.json(incs);
},

async getAll2( request, response ) {
  
    const { page = 1 } = request.query; 
    const [count] =  await conn('incidents')
    .select('*')
    .count();
    response.header('X-Total-Count', count['count(*)']);
 
    const incs =  await conn('incidents')
    .join('ongs','ongs.id','=','incidents.ong_id')
	.limit(5)
    .offset((page-1)*5)
    .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf']);
     
    return response.json(incs);
 },
 
async getOne( request, response) {
    const incs =  await conn('incidents').select('*').where('id',request.params.id);
    console.log(request.params.id);
    return response.json(incs);
},

async delOne( request, response) { 
    const { id }  = request.params;
    const ong_id  = request.headers.authorization;

    const incOng = await conn('incidents').select('ong_id').where('id',id).first();
    if ( ! incOng )
    {
        return response.status(401).json({ error :'Register not found'});
    }


    if (incOng.ong_id != ong_id) {
       return response.status(401).json({ error :'Operation not permitted'});
    }

    const incs =  await conn('incidents').where('id',request.params.id).delete();

    console.log(request.params.id);
    return response.status(204).send();

},

async delAll( request, response) { 

    const incs =  await conn('incidents').delete();

    return response.status(204).send();

}

}