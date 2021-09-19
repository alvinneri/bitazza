import { useEffect } from "react";
const socket = new WebSocket("wss://apexapi.bitazza.com/WSGateway");
const App = () => {
  useEffect(() => {
    socket.addEventListener("open", function (event) {
      console.log("Hello Server");

      let param = {
        Password: "Binbai13!",
        UserName: "alvin.neri.ece@gmail.com",
      };

      let frame = {
        m: 0,
        i: 2,
        n: "AuthenticateUser",
        o: "",
      };

      frame.o = JSON.stringify(param);
      socket.send(JSON.stringify(frame));
    });

    socket.onmessage = (message) => {
      const _message = JSON.parse(message.data);
      if (_message.m === 1) {
        if (_message.n === "AuthenticateUser") {
          const response = JSON.parse(_message.o);
          console.log(response);
        }
      }
    };
  }, []);

  return <div>Bitazza</div>;
};

export default App;
