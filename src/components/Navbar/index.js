import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AuthApi } from "../../api/auth";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/Public/action";
import { useHistory } from "react-router";
import logo from "../../assets/img/logo.jpeg";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    dispatch(setLoading(true));
    AuthApi.logoutUser();
    history.push("/login");
    localStorage.removeItem("SessionToken");
    localStorage.removeItem("User");
    dispatch(setLoading(false));
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <img
            style={{ width: "50px", marginRight: "1em" }}
            alt="Loader"
            src={logo}
          />
          <Typography variant="h6" className={classes.title}>
            Bitazza
          </Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
