import LoginForm from "../LoginForm/LoginForm";
import Togglable from "../Togglable/Togglable";
import { useUser } from "../../context/UserContext";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  const { user, userDispatch } = useUser();
  const LoginFormRef = useRef();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("clearing localstorage");
    window.localStorage.clear();
    userDispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="NavBarcontainer">
      {!user && (
        <div className="NavBarWrapper">
            <h3 className="NavBartitle">Bamlaa.fi</h3>
            <div className="Navbarrow">
            <Link className="NavBarcontainer-Link" to="/">Koti</Link>
            <Link className="NavBarcontainer-Link" to="/suggestion">Ehdota uutta sanaa</Link>
            <Link className="NavBarcontainer-Link" to="/api-documentation">Devaajille</Link>
            <Togglable buttonLabel="login" ref={LoginFormRef}>
              <LoginForm />
            </Togglable>
          </div>
        </div>
      )}
      {user && (
        <div className="NavBarWrapper">
          <h3 className="NavBartitle">Bamlaa.fi</h3>
          <div className="Navbarrow">
          <Link className="NavBarcontainer-Link" to="/">Koti</Link>
          <Link className="NavBarcontainer-Link" to="/suggestion">Ehdota uutta sanaa</Link>
          <Link className="NavBarcontainer-Link" to="/api-documentation">Devaajille</Link>
          <Link className="NavBarcontainer-Link" to="/dashboard">Hallintapaneeli</Link>
          <div className="NavBarloggedin">{user.username} logged in</div>
          <button className="NavBarbutton" onClick={handleLogout}>
            log out
          </button>
          </div>
      </div>
      )}
    </div>
  );
};

export default NavBar;
