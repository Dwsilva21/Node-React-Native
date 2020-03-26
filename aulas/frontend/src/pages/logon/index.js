import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png'
import LogoImg from '../../assets/logo.svg'


export default function Logon() {

    const [ id, setId ] = useState('');
    const history = useHistory();

    async function handleLogin(e)
    {
        e.preventDefault();
 
        try {
            const response = await api.post('/session',{ id } ) ;

            //const response = await api.get(`/ongs/${id}`) ;
            console.log( response.data.name );
            
            localStorage.setItem('ongId', id );
            localStorage.setItem('ongName', response.data.name);
            
            history.push('/profile');
    
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
