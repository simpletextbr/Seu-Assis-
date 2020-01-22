import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg';
import './styles.css'

export default function New({ history }){
    const [thumbnail, setThumbnail] = useState(null);
    const [ type, setType ] = useState('');
    const [ service, setService ] = useState('');
    const [ price, setPrice ] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
        },
        [thumbnail]
    )

    async function CreateSpot(e){
        e.preventDefault();
        const data = new FormData();
        const suporter_id = localStorage.getItem('suporter');

        data.append('thumbnail', thumbnail);
        data.append('type', type);
        data.append('service', service);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: {suporter_id}
        })

        history.push('/dashboard');

    }
    
    return (
        <form onSubmit={CreateSpot}>
            <label
             id="thumbnail"
             style={{ backgroundImage: `url(${preview})` }}
             className={thumbnail ? 'has-thumbnail' : ''}
             >
                <input type="file" onChange={ e => setThumbnail(e.target.files[0])}/>
                <img src={camera} alt='Select your card'/>
            </label>
             <label htmlFor="service" > SERVIÇO *</label>
            <input
                id="service"
                placeholder="Manutenção, Suporte, Remoto, Celular"
                value={service}
                onChange={e => setService(e.target.value)}
            />
             <label htmlFor="company" > TIPO *</label>
            <input
                id="type"
                placeholder="Troca de Memoria"
                value={type}
                onChange={e => setType(e.target.value)}
            />
             <label htmlFor="price" > PREÇO *</label>
            <input
                id="price"
                placeholder="R$ 30,00"
                value={price}
                onChange={e => setPrice(e.target.value)}
            />
            <button className="btn" type="submit">Criar</button>
        </form>
    )
}