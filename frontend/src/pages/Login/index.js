import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[create] = useState(false);
  
    async function Login(e){
      e.preventDefault();
        try{
      const response = await api.post('/sessions' , {email, password, create});
  
      const {_id} = response.data;
  
      localStorage.setItem('suporter', _id);

      history.push('/dashboard');

        }catch(error){
            alert('O usuario ou senha digitados nao batem');
        }
  
    }
    async function Singin(e){
        e.preventDefault();

        history.push('/singin');
    }
    return (
        <>
        <p>
        Área reservada para <strong>Suporters</strong> cadastrados no <strong>Seu Assis.</strong>
        </p>

      <form onSubmit={Login}>
        <label htmlFor="email">E-MAIL *</label>
        <input 
          type="email"
          id="email"
          placeholder="seuemail@email.com.br"
          value={email}
          onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">SENHA *</label>
        <input 
          type="password"
          id="password"
          placeholder="********"
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className='btn'>LOGIN</button>
          </form>
        <form onClick={Singin}>
          <button type="submit" className='simple'>Cadastrar-se</button>
        </form>
      </>
    )
}
