import { API_CONSTANTS } from "../../constants";
import { socket } from "../index"

export const InstrumentsApi = {

    getInstruments: async () => {

        let param = {
            "OMSId":  1,
        }
        
        let frame = {
            m: 0,
            i: 2,
            n: API_CONSTANTS.GET_INSTRUMENTS,
            o: "",
          };

        frame.o = JSON.stringify(param);

        return socket.send(JSON.stringify(frame)) 

    },

    getTickerHistory: async (payload) => {

        const { instrumentId , fromDate, toDate,} = payload;

        let param = {
            "OMSId":  1,
            "InstrumentId": instrumentId,
            "Interval": 60,
            "FromDate": fromDate,
            "ToDate": toDate,
            
        }
        
        let frame = {
            m: 0,
            i: 2,
            n: API_CONSTANTS.GET_TICKER_HISTORY,
            o: "",
          };

        frame.o = JSON.stringify(param);

        return socket.send(JSON.stringify(frame)) 

    },

}