import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "./api";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/User/action";
import {setLoading} from './redux/Public/action';
import { Switch, Route, useHistory } from 'react-router-dom'

import Loader from "./components/Loader";
import Main from "./pages/Main";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import Navbar from "./components/Navbar";
toast.configure();
const App = () => {

  const dispatch = useDispatch();
  const {isLoading} = useSelector((state)=> state.public)
  const {user} = useSelector((state)=> state.user)
  const SessionToken = localStorage.getItem('SessionToken')
  const history = useHistory()

  useEffect(() => {
    socket.addEventListener("open", function (event) {
    });

    socket.onmessage = (message) => {
      const _message = JSON.parse(message.data);
      const response = JSON.parse(_message.o);

      if (_message.m === 1) {
        if (_message.n === "AuthenticateUser") {
          console.log(response)
          if(!response.Authenticated){
            toast.error(response.errormsg)
            dispatch(setLoading(false));
          }else{
            // Set user info to store and localstorage
            localStorage.setItem('SessionToken', response.SessionToken);
            localStorage.setItem('User', JSON.stringify(response.User));
            dispatch(setLoading(false));
            history.push('/home');
            toast.success('Logged In Successfully');
          }
        }else if(_message.n === 'LogOut'){
            if(response.result){
              history.push('/login');
              localStorage.removeItem('SessionToken');
              localStorage.removeItem('User');
              dispatch(setLoading(false));
            }
        }
      }
    };
  }, [dispatch]);

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
  }, [SessionToken, dispatch]);

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
