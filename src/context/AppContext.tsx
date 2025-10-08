import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { toast } from 'react-toastify'

interface AppState {
  isLoading: boolean
  notifications: Notification[]
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  connectionStatus: 'online' | 'offline'
  language: 'es' | 'en'
}

interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface AppContextType extends AppState {
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markNotificationAsRead: (id: string) => void
  clearNotifications: () => void
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  setLanguage: (language: 'es' | 'en') => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppAction {
  type: string
  payload?: any
}

const initialState: AppState = {
  isLoading: false,
  notifications: [],
  sidebarOpen: true,
  mobileMenuOpen: false,
  connectionStatus: 'online',
  language: (localStorage.getItem('language') as 'es' | 'en') || 'es'
}

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date(),
            read: false
          },
          ...state.notifications
        ]
      }
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      }
    
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] }
    
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    
    case 'TOGGLE_MOBILE_MENU':
      return { ...state, mobileMenuOpen: !state.mobileMenuOpen }
    
    case 'SET_CONNECTION_STATUS':
      return { ...state, connectionStatus: action.payload }
    
    case 'SET_LANGUAGE':
      localStorage.setItem('language', action.payload)
      return { ...state, language: action.payload }
    
    default:
      return state
  }
}

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading })
  }

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
    
    // Also show toast notification
    const toastOptions = {
      position: 'top-right' as const,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    }

    switch (notification.type) {
      case 'success':
        toast.success(notification.message, toastOptions)
        break
      case 'error':
        toast.error(notification.message, toastOptions)
        break
      case 'warning':
        toast.warning(notification.message, toastOptions)
        break
      case 'info':
        toast.info(notification.message, toastOptions)
        break
    }
  }

  const markNotificationAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id })
  }

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' })
  }

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' })
  }

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MOBILE_MENU' })
  }

  const setLanguage = (language: 'es' | 'en') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language })
  }

  // Monitor online/offline status
  React.useEffect(() => {
    const handleOnline = () => {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'online' })
      addNotification({
        type: 'success',
        title: 'Conexión restaurada',
        message: 'Se ha restablecido la conexión a internet'
      })
    }

    const handleOffline = () => {
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'offline' })
      addNotification({
        type: 'warning',
        title: 'Sin conexión',
        message: 'No hay conexión a internet. Algunas funciones pueden no estar disponibles.'
      })
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const value: AppContextType = {
    ...state,
    setLoading,
    addNotification,
    markNotificationAsRead,
    clearNotifications,
    toggleSidebar,
    toggleMobileMenu,
    setLanguage
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): AppContextType => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}