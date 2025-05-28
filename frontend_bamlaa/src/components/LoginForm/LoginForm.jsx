import loginService from '../../services/login'
import wordService from '../../services/words'
import suggestionService from '../../services/suggestions'
import { useUser } from '../../UserContext'
import { useSetNotification } from '../../NotificationContext'
import { useState} from 'react'


const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { user, userDispatch } = useUser()
    const dispatch = useSetNotification()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username,
                password,
            })
            window.localStorage.setItem('loggedBamlaaUser', JSON.stringify(user))
            wordService.setToken(user.token)
            suggestionService.setToken(user.token)
            userDispatch({ type: 'LOGIN', payload: user })
            setUsername('')
            setPassword('')
        } catch (exception) {
         dispatch('CUSTOM', { message: 'wrong credentials', color: 'red' })
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
            <div>
                username:
                <input
                type="text"
                value={username}
                name="Username"
                data-testid="username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password:
                <input
                type="password"
                value={password}
                name="Password"
                data-testid="password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm