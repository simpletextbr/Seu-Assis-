import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard({ history }){
    const [spots, setSpots] = useState([]);
    const [reques, setReques] = useState([]);

    const suporter_id = localStorage.getItem('suporter')

    const socket = useMemo(() => socketio('http://localhost:3333', {
        query:{ suporter_id },
    }), [suporter_id]);

    useEffect(()=>{
        socket.on('requested', data => {
            setReques([...reques, data]);
        })

    },[reques, socket]);

    useEffect(() =>{
        async function loadspots(){
            const suporter_id = localStorage.getItem('suporter');
            const response = await api.get('/dashboard',{
                headers: {suporter_id}
            });

            setSpots(response.data);
        }

        loadspots();
    }, []);
    
    async function senddata(){
        const response = await api.get('/detail');
  
        const {_id} = response.data;
    
        localStorage.setItem('request', _id);
  
        history.push('/detail');
    }

    return (
        <>
        <ul className="notifications">
            {reques.map(request => (
                <li key={request._id}>
                    <p>
                        <strong>{request.user.name}</strong> está solicitanto uma assistência técnica em <strong>{request.spot.service}</strong>
                    </p>
                    <button className='detail' type='submit' onClick={senddata}>Detalhes</button>
                </li>
            ))}

        </ul>

        <ul className="spot-list">
            {spots.map(spot => (
                <li key={spot._id}>
                    <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}/>
                    <strong>{spot.type}</strong>
                    <span>{spot.service}</span>
                    <span>{spot.price ? `R$${spot.price},00` : 'REQUER AVALIAÇÃO'}</span>
                </li>
            ))}
        </ul>

        <Link to='/new' >
            <button className="btn">Criar novo serviço</button>
        </Link>
        </>
    ) 
    
}