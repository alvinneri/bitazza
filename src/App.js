import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "./api";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/User/action";
toast.configure();
const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    socket.addEventListener("open", function (event) {
    });

    socket.onmessage = (message) => {
      const _message = JSON.parse(message.data);


      if (_message.m === 1) {
        if (_message.n === "AuthenticateUser") {
          const response = JSON.parse(_message.o);
          console.log(response)
          if(!response.Authenticated){
            toast.error(response.errormsg)
          }else{
            dispatch(setUser(response.User))
            toast.success('SUCCESS')
          }
        }
      }
    };
  }, []);

  return <div><Login/></div>;
};

export default App;
