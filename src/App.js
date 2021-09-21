import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "./api";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/User/action";
import {setLoading} from './redux/Public/action';
import { Switch, Route, useHistory } from 'react-router-dom'
import './App.css'

import Loader from "./components/Loader";
import Main from "./pages/Main";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { setInstruments, setTickerHistories} from "./redux/Instruments/action";
import { InstrumentsApi } from "./api/instruments";
import { API_CONSTANTS } from "./constants";
toast.configure();
const App = () => {

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state)=> state.public)
  const SessionToken = localStorage.getItem('SessionToken')
  const history = useHistory()

  useEffect(() => {

    socket.onmessage = (message) => {
      const _message = JSON.parse(message.data);
      if(!_message.o){
        return;
      }
      const response = JSON.parse(_message.o);


      if (_message.m === 1) {
        if (_message.n === API_CONSTANTS.AUTH_USER) {
          if(!response.Authenticated){
            toast.error(response.errormsg)
            dispatch(setLoading(false));
          }else{
            // Set user info to store and localstorage
            localStorage.setItem('SessionToken', response.SessionToken);
            localStorage.setItem('User', JSON.stringify(response.User));
            InstrumentsApi.getInstruments();
            dispatch(setLoading(false));
            history.push('/home');
            toast.success('Logged In Successfully');
          }
        }else if(_message.n === API_CONSTANTS.LOGOUT){
            if(response.result){
              history.push('/login');
              localStorage.removeItem('SessionToken');
              localStorage.removeItem('User');
              dispatch(setLoading(false));
            }
        }else if(_message.n === API_CONSTANTS.GET_INSTRUMENTS){
          dispatch(setInstruments(response))
        }else if(_message.n === API_CONSTANTS.GET_TICKER_HISTORY){
          if(response.length){
            const firstArray = response[0]
            const lastArray = response[response.length - 1];

            const fCloseValue = firstArray[4];
            const id = firstArray[8];
            const lCloseValue = lastArray[4];

            const percentChange = ((lCloseValue - fCloseValue) / fCloseValue) * 100
            const payload = {
              percentChange,
              id
            }


            dispatch(setTickerHistories(payload))
          }
        }
      }
    };
  }, [dispatch, history]);

  useEffect(() => {
    dispatch(setLoading(true))
    if (SessionToken) {
      dispatch(setLoading(false))
      history.push('/home');
    } else {
      dispatch(setLoading(false))
      history.push('/login')
      dispatch(setUser(null))
    }
  }, [SessionToken, dispatch, history]);

  return (
    <div>
      {isLoading && <Loader />}
      <Switch>
        <Route
          exact
          path="/login"
          component={Login}
        />
        <PrivateRoute
          exact
          path="/home"
          component={Main}
        />
      </Switch>

    </div>
  )
};

export default App;
