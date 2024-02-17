import React, { useState, useEffect } from 'react';
import axios from '../services/axios';

export default function Root() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get('/courses')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });
    }, []);

    return (
        <>
            <nav className=''>
                <a>Entrar</a>
                <a>Solicitar cadastro</a>
            </nav>
            <div>
                {data ? (
                    <ul>
                        {data.map(item => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}