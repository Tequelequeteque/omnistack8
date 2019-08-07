import React, { useState } from 'react';

import './Login.css'
import logo from '../assets/logo.svg'
import api from '../services/api';

function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const data = (await api.post('/devs', { username })).data;
        console.table([data]);
        const { _id } = data;
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} >
                <img src={logo} alt="Tindev" />
                <input
                    placeholder="Digite seu usuário do github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </div>

    );
}

export default Login