import { useEffect} from "react"
import { useUser } from "./context/UserContext"
import NavBar from "./components/NavBar/NavBar"
import suggestionService from "./services/suggestions"
import wordService from "./services/words"
import Notification from "./components/Notification/Notification"
import Dashboard from "./components/Dashboard/Dashboard"
import Documentation from "./components/Documentation/Documentation"
import Home from "./components/Home/Home"
import Quiz from "./components/Quiz/Quiz"
import Words from "./components/Words/Words"
import { Routes, Route } from "react-router-dom"

const App = () => {
  const { user, userDispatch } = useUser()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBamlaaUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: "LOGIN", payload: user })
      wordService.setToken(user.token)
      suggestionService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <NavBar user={user} />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/api-documentation" element={<Documentation />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/words" element={<Words />} />
      </Routes>
    </div>
  )
}

export default App
