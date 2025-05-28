import LoginForm from "../LoginForm"
import Togglable from "../Togglable/Togglable"
import { useUser } from '../../UserContext'
import { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {
  const { user, userDispatch } = useUser()
  const LoginFormRef = useRef()
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log("clearing localstorage")
    window.localStorage.clear()
    userDispatch({ type: "LOGOUT" })
    navigate('/')
  }
  return (
    <div className="NavBarcontainer">
      {!user && (
        <div className="Navbarrow"> 
          <Link to="/">Koti</Link>
          <Link to="/suggestion">Ehdota uutta sanaa</Link>
          <Togglable buttonLabel="login" ref={LoginFormRef}>
            <LoginForm />
          </Togglable>
        </div>
        )}
      {user && (
        <div className="Navbarrow">
          <Link to="/">Koti</Link>
          <Link to="/suggestion">Ehdota uutta sanaa</Link>
          <Link to="/dashboard">Hallintapaneeli</Link>
          <div className="NavBarloggedin">{user.username} logged in</div>
          <button className="NavBarbutton" onClick={handleLogout}>log out</button>
        </div>
      )}
    </div>
  )
}

export default NavBar
