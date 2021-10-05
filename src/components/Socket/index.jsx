import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setLoading } from "../../redux/Public/action";
import { API_CONSTANTS } from "../../constants";
import { InstrumentsApi } from "../../api/instruments";
import {
  setInstruments,
  setTickerHistories,
} from "../../redux/Instruments/action";
import { socket } from "../../api";

export const SocketContext = React.createContext();
const SocketProvider = SocketContext.Provider;

export const GlobalSocket = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    socket.onmessage = (message) => {
      const _message = JSON.parse(message.data);
      if (!_message.o) {
        return;
      }
      const response = JSON.parse(_message.o);

      if (_message.m === 1) {
        if (_message.n === API_CONSTANTS.AUTH_USER) {
          if (!response.Authenticated) {
            toast.error(response.errormsg);
            dispatch(setLoading(false));
          } else {
            // Set user info to store and localstorage
            localStorage.setItem("SessionToken", response.SessionToken);
            localStorage.setItem("User", JSON.stringify(response.User));
            InstrumentsApi.getInstruments();
            dispatch(setLoading(false));
            history.push("/home");
            toast.success("Logged In Successfully");
          }
        } else if (_message.n === API_CONSTANTS.LOGOUT) {
          if (response.result) {
            history.push("/login");
            localStorage.removeItem("SessionToken");
            localStorage.removeItem("User");
            dispatch(setLoading(false));
          }
        } else if (_message.n === API_CONSTANTS.GET_INSTRUMENTS) {
          dispatch(setInstruments(response));
        } else if (_message.n === API_CONSTANTS.GET_TICKER_HISTORY) {
          if (response.length) {
            const firstArray = response[0];
            const lastArray = response[response.length - 1];

            const fCloseValue = firstArray[4];
            const id = firstArray[8];
            const lCloseValue = lastArray[4];

            const percentChange =
              ((lCloseValue - fCloseValue) / fCloseValue) * 100;
            const payload = {
              percentChange,
              id,
            };

            dispatch(setTickerHistories(payload));
          }
        }
      }
    };
  }, [dispatch, history]);

  return <SocketProvider value={{ socket }}>{children}</SocketProvider>;
};
