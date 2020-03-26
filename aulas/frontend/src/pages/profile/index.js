import React, { useState , useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  FiPower, FiTrash2  } from 'react-icons/fi';

import './styles.css';

import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';


export default function Profile() {

   const ongName = localStorage.getItem('ongName');
   const ongId   = localStorage.getItem('ongId');
   const [ Incident, setIncident ] = useState([]);
   const history = useHistory();

   async function handleDelete(id)
   {
      try {
        const response = await api.delete(`/incs/${id}`, { 
         headers: { 
            Authorization: ongId ,
         } 
         } );      

         setIncident( Incident.filter( Incident => Incident.id !== id )    );
      } catch (error) {
         alert('erro ao deletar Incidente');
      }
   }


   function handleLogout()
   {
      localStorage.clear();
      history.push('/');
   }
   
   useEffect(() => {
      api.get('/incs', { 
         headers: { 
            Authorization: ongId ,
         } 
      }).then( response => {
         setIncident( response.data );
      });
   }  , [ongId] );   
   

   return ( 
   
      <div className="profile-container">
         <header>
            <img src={LogoImg} alt="Be The Hero"/>
            <span>Bem vinda, { ongName }</span>

            <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
            <button type="button" onClick={handleLogout}>
                 <FiPower size={18} color= "#e02041" />
            </button>
         </header>

         <h1>Casos Cadastrados</h1>
         <ul>

            { Incident.map( incid => (
            <li key={incid.id}>
               <strong>CASO:</strong>
               <p>{ incid.title }</p>

               <strong>DESCRIÇÃO</strong>
               <p>{ incid.description }</p>

               <strong>VALOR</strong>
               <p>{ Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incid.value) }</p>

               <button type='button' onClick={ ()=> handleDelete( incid.id ) }>
                  <FiTrash2 size={20} color="#a8a8b3"/>
               </button>
            </li>
            ))}

            

         </ul>


      </div>
   
   
   );

}