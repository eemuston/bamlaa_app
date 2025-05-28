import LoginForm from "../LoginForm"
import Togglable from "../Togglable/Togglable"
import { useUser } from '../../UserContext'
import { useRef } from 'react'

import './NavBar.css'

const NavBar = () => {
  const { user, userDispatch } = useUser()
  const LoginFormRef = useRef()

  const handleLogout = () => {
    console.log("clearing localstorage")
    window.localStorage.clear()
    userDispatch({ type: "LOGOUT" })
  }
  return (
    <div className="NavBarcontainer">
      {!user && (
        <Togglable buttonLabel="login" ref={LoginFormRef}>
          <LoginForm />
        </Togglable>
        )}
      {user && (
        <div className="Navbarrow">
          <div className="NavBarloggedin">{user.username} logged in</div>
          <button className="NavBarbutton" onClick={handleLogout}>log out</button>
        </div>
      )}
    </div>
  )
}

export default NavBar
