import { useState, useEffect, useRef } from "react";
import { useUser } from "./UserContext";
import NavBar from "./components/NavBar/NavBar";
import suggestionService from "./services/suggestions";
import wordService from "./services/words";
import Notification from "./components/Notification/Notification";

const App = () => {
  const { user, userDispatch } = useUser();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBamlaaUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "LOGIN", payload: user });
      wordService.setToken(user.token);
      suggestionService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <NavBar user={user} />
      <Notification />
    </div>
  );
};

export default App;
