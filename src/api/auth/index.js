import { API_CONSTANTS } from "../../constants";
import { socket } from "../index"

export const AuthApi = {

    loginUser: (payload) => {

        const {username, password} = payload;

        let param = {
            UserName: username,
            Password: password
        }
        
        let frame = {
            m: 0,
            i: 2,
            n: API_CONSTANTS.AUTH_USER,
            o: "",
          };

        frame.o = JSON.stringify(param);

        return socket.send(JSON.stringify(frame)) 

    },

    logoutUser: () => {
        let frame = {
            m: 0,
            i: 2,
            n: API_CONSTANTS.LOGOUT,
            o: "",
          };

        return socket.send(JSON.stringify(frame)) 

    }

}