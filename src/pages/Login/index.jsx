import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { setLoading } from '../../redux/Public/action'
import { AuthApi } from '../../api/auth';
import { useDispatch } from 'react-redux';
import logo from '../../assets/img/logo.jpeg'
import { theme } from '../../theme';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const login = () => {
      dispatch(setLoading(true));
      let payload = {
        username,
        password
      }
      AuthApi.loginUser(payload);
    }

    return (
        <div>

          <form onSubmit={login} style={{width: '100%', height: '100vh', justifyContent: 'center', alignItems:'center', display: 'flex', flexDirection:'column'}}> 
          <img src={logo} style={{margin: '1em'}} />   
            <TextField
              variant="outlined"
              type={'email'}
              name={'email'}
              label={'Username'}
              placeholder='Email'
              style={{margin: '0.5em', width: '400px', }}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                style: {color: theme.palette.common.white}
              }}
              InputLabelProps={{
                style: {color: theme.palette.common.white}
              }}
              value={username}
              />
            <TextField
            InputProps={{
              style: {color: theme.palette.common.white}
            }}
            InputLabelProps={{
              style: {color: theme.palette.common.white}
            }}
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