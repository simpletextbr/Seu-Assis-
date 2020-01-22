import React,{ useState, useEffect } from 'react';
import api from '../../../services/api';

import './styles.css'


export default function Detail(){
 const [reques, setReques] = useState([]);


    
useEffect(()=> {
    async function loadDetail(){
        const request_id = localStorage.getItem('request')
        const response = await api.get('/detail', {
            headers: { request_id}
        });

        setReques(response.data)
    }

    loadDetail();
},[]);
    
async function handleAccept(id){

    await api.post(`/requests/${id}/approvals`)

    setReques(reques.filter(request => request._id !== id ));

}

async function handleReject(id){

    await api.post(`/requests/${id}/rejections`)

    setReques(reques.filter(request => request._id !== id ));
}

    return(
        <>
            <p>
                <strong className='title'>Fila de Assistências</strong>
            </p>
            <ul className='box-notify'>
                {reques.map(request => (
                <li key={request._id} className='box'>
                    <p>
                    <p>
                        <strong className='inner'>Problema relatado:</strong>
                        <spam>{request.problem}</spam>
                    </p>
                    <p>
                        <strong className='inner'>Detalhes do problema:</strong>
                        <spam>{request.detail}</spam>
                    </p>
                    <p>
                        <strong className='inner'>Numero do Any Desk:</strong>
                        <spam>{request.anynumber ? request.anynumber : 'Primeira Solicitação'}</spam>
                    </p>
                    </p>
                    <button className='accept' onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className='reject'onClick={() => handleReject(request._id)}>REJEITAR</button>
                </li>
                ))}
            </ul>
        </>
    )
}