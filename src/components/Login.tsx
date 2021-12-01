import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
// components
import Button from './Button/buttonIndex';
//Styles
import { Wrapper } from './Login.styles';
//Context
import { Context } from '../context';

const Login: React.FC = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [_user, setUser] = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError(false);

        try{
            const requestToken = await API.getRequestToken();
            const sessionId = await API.authenticate(requestToken,username,password);

            setUser({
                sessionId: sessionId.session_id,
                username
            });
            console.log(sessionId);
            navigate('/');

        }catch(error){
            setError(true);
            setPassword('');
        }
    };

    const handleInput = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        const name = target.name;
        const value = target.value;
        if(name === 'username') setUserName(value);

        if(name === 'password') setPassword(value);
    };

    return (
        <Wrapper>
            {error && <div className='error'>There was an error!</div>}
            <label>Username:</label>
            <input
                type='text'
                placeholder='enter username'
                value={username}
                name='username'
                onChange={handleInput}
            />
            <label>Password:</label>
            <input 
                type='password'
                placeholder='enter password'
                value={password}
                name='password'
                onChange={handleInput}
            />
            <Button text='Login' callBack={handleSubmit} />
        </Wrapper>
        
    );
};

export default Login;