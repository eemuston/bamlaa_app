import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case 'CUSTOM':
      return { message: action.payload.message, color: action.payload.color }
    case 'CLEAR':
      return { message: null, color: null }
    default:
      return { message: null, color: null }
  }
}

export const useNotificationValue = () => {
  const notificationandDispatch = useContext(NotificationContext)
  return notificationandDispatch[0]
}

export const useSetNotification = () => {
  const notificationandDispatch = useContext(NotificationContext)
  return notificationandDispatch[1]
}

let timeoutId

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(NotificationReducer, {
    message: null,
    color: null,
  })

  const setNotification = (type, notifi) => {
    notificationDispatch({ type, payload: notifi })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
      timeoutId = null
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext