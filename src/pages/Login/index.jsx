import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthApi } from '../../api/auth';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const login = () => {

      let payload = {
        username,
        password
      }
      AuthApi.loginUser(payload);
    }

    return (
        <div>
          <form onSubmit={login} style={{width: '100%', height: '100vh', justifyContent: 'center', alignItems:'center', display: 'flex', flexDirection:'column'}}>    
            <TextField
              variant="outlined"
              type={'email'}
              name={'email'}
              label={'Username'}
              placeholder='Email'
              style={{margin: '0.5em', width: '400px'}}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              />
            <TextField
            variant="outlined"
            label={'Password'}
            type={'password'}
            name={'password'}
            placeholder='Password'
            style={{margin: '0.5em',width: '400px'}}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
            <Button variant="contained" onClick={login} 
            style={{margin: '0.5em',width: '400px'}}>LOGIN</Button>
          </form>
        </div>
    )

}

export default Login