import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png'
import LogoImg from '../../assets/logo.svg'


export default function Logon() {

    const [ id, setId ] = useState('0');

    async function handleLogin(e)
    {
        e.preventDefault();
 
        try {
            const response = await api.get(`/ongs/${id}`) ;
            console.log( response.data );
            
             
    
        } catch (err) {
            alert('Erro ONG não cadastrada!');
        }     
        
  
    }

    return (

    <div className="logon-container">
        <section className="form">
            <img src={LogoImg} alt="Be the Hero"/>

            <form onSubmit={handleLogin}>
                <h1>Faça seu Logon</h1>
                <input placeholder="Sua Id"
                 value={id}
                 onChange={ e=>setId(e.target.value)}
                 />
                <button className="button" type="submit">Entrar</button>

                <Link className="back-link" to="/register">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho cadastro
                </Link>

            </form>
        </section>

        <img src={heroesImg} alt="Heroes"/>

     </div>
        
        
    );
}
