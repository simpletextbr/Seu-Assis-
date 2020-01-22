import React, { useState } from 'react';
import api from '../../services/api';

//import Back from '../../assets/back.svg';

export default function Singin({ history }){
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[phone, setPhone] = useState('');
    const[password, setPassword] = useState('');
    const[create] = useState(true);
  
    async function Singin(e){
      e.preventDefault();
    try{
      
        await api.post('/sessions' , {name, email, phone, password, create});

        alert('usuario criado com sucesso, efetue o login para acessar sua pagina de cadastro de servicos');
        history.push('/');

        }catch(error){
            alert('O usuario ou senha digitados nao batem');
        }
  
    }
   
    return (
        <>
        <p>Crie aqui seu usuario e Senha para começar a atender pelo <strong>Seu Assis</strong></p>
        <form onSubmit={Singin} >
            <label htmlFor="name">Nome *</label>
                <input 
                    type="name"
                    id="name"
                    placeholder="Seu Assis da Silva"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
            <label htmlFor="email">Nome *</label>
                <input 
                    type="email"
                    id="email"
                    placeholder="seuemail@email.com.br"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
            <label htmlFor="phone">Telefone *</label>
                <l>(apenas Numeros)</l>
                <input 
                    type="phone"
                    id="phone"
                    placeholder="31912345678"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    />
            <label htmlFor="password">Senha</label>
                <input 
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
            <button className="btn" type="submit">Cadastrar</button>
        </form>
        
        </>
    )
    
}
