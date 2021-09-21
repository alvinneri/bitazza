import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoading } from "../../redux/Public/action";
import io from "socket.io-client";
import { API_CONSTANTS } from "../../constants";

const { socketPoint } = config;
  const { user } = useSelector((state) => state.public);
  const dispatch = useDispatch();




export const SocketContext = React.createContext();
const SocketProvider = SocketContext.Provider;

let socket;

export const GlobalSocket = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    socket = io("wss://apexapi.bitazza.com/WSGateway");
    // socket = new WebSocket("wss://apexapi.bitazza.com/WSGateway");

    // socket.addEventListener("open", function (event) {
    // });

    // socket.on(API_CONSTANTS.LOGOUT,() =>{

    // } )


    socket.onmessage = (message) => {
      const _message = JSON.parse(message.data);
      const response = JSON.parse(_message.o);

      if (_message.m === 1) {
        if (_message.n === "AuthenticateUser") {
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

  }, [dispatch, history]);
        


  return <SocketProvider value={{ socket }}>{children}</SocketProvider>;
};
