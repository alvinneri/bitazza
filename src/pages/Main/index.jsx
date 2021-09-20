import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {socket} from '../../api/index'
import { InstrumentsApi } from '../../api/instruments';
import { setInstruments } from '../../redux/Instruments/action';
import InstrumentsTable from './Instrument';

const Main = () => {

    const {user} = useSelector(state => state.user);
    const {isLoading} = useSelector(state => state.public)
    const { instruments } = useSelector(state => state.instruments)
    const dispatch = useDispatch()


    useEffect(() => {
        socket.addEventListener("open", function (event) {
            InstrumentsApi.getInstruments();

            socket.onmessage = (message) => {
                const _message = JSON.parse(message.data);
                const response = JSON.parse(_message.o);
          
                if (_message.m === 1) {
                  if (_message.n === "GetInstruments") {
                    dispatch(setInstruments(response))
                    }
                }


              };
        });

        socket.onmessage = (message) => {
            const _message = JSON.parse(message.data);
            const response = JSON.parse(_message.o);
      
            console.log(response)
          };

    },[socket])


    return (
        <div>
        {instruments.length > 0 ? 
            <div style={{paddingTop: '5em'}}><InstrumentsTable /></div> : null
        
        }
        </div>
    )

}

export default Main