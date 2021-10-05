import { useEffect } from "react";
import { toast } from "react-toastify";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/User/action";
import { setLoading } from "./redux/Public/action";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";

import Loader from "./components/Loader";
import Main from "./pages/Main";
import { PrivateRoute } from "./components/Routes/PrivateRoute";
import { GlobalSocket } from "./components/Socket";
toast.configure();

const App = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.public);
  const SessionToken = localStorage.getItem("SessionToken");
  const history = useHistory();

  useEffect(() => {
    dispatch(setLoading(true));
    if (SessionToken) {
      dispatch(setLoading(false));
      history.push("/home");
    } else {
      dispatch(setLoading(false));
      history.push("/login");
      dispatch(setUser(null));
    }
  }, [SessionToken, dispatch, history]);

  return (
    <div>
      <GlobalSocket>
        {isLoading && <Loader />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/home" component={Main} />
        </Switch>
      </GlobalSocket>
    </div>
  );
};

export default App;
