import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { toast } from 'react-toastify'
import { authService } from '@/services/auth'
import type { 
  User, 
  AuthState, 
  AuthContextType, 
  LoginCredentials, 
  RegisterData, 
  WalletProvider,
  WalletInfo,
  ApiResponse
} from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthAction {
  type: string
  payload?: any
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  token: localStorage.getItem('token'),
  walletConnected: false,
  walletAddress: null
}

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        walletConnected: false,
        walletAddress: null
      }
    
    case 'CONNECT_WALLET':
      return {
        ...state,
        walletConnected: true,
        walletAddress: action.payload.address
      }
    
    case 'DISCONNECT_WALLET':
      return {
        ...state,
        walletConnected: false,
        walletAddress: null
      }
    
    default:
      return state
  }
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      try {
        if (state.token) {
          const user = await authService.getCurrentUser()
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token: state.token } })
        }
      } catch (error) {
        localStorage.removeItem('token')
        dispatch({ type: 'LOGOUT' })
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    initAuth()
  }, [state.token])

  const login = async (credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authService.login(credentials)
      
      localStorage.setItem('token', response.data.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
      
      toast.success('¡Bienvenido a The Broom Fairy!')
      return response
    } catch (error: any) {
      toast.error(error.message || 'Error al iniciar sesión')
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const loginWithGoogle = async (): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authService.loginWithGoogle()
      
      localStorage.setItem('token', response.data.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
      
      toast.success('¡Conectado con Google exitosamente!')
      return response
    } catch (error: any) {
      toast.error('Error al conectar con Google')
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const connectWallet = async (walletType: WalletProvider): Promise<WalletInfo> => {
    try {
      const response = await authService.connectWallet(walletType)
      dispatch({ type: 'CONNECT_WALLET', payload: response })
      toast.success(`Wallet ${walletType} conectada exitosamente`)
      return response
    } catch (error: any) {
      toast.error(`Error al conectar wallet ${walletType}`)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await authService.logout()
      localStorage.removeItem('token')
      dispatch({ type: 'LOGOUT' })
      toast.success('Sesión cerrada exitosamente')
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const register = async (userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await authService.register(userData)
      
      localStorage.setItem('token', response.data.token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data })
      
      toast.success('¡Cuenta creada exitosamente!')
      return response
    } catch (error: any) {
      toast.error(error.message || 'Error al crear la cuenta')
      throw error
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const value: AuthContextType = {
    ...state,
    login,
    loginWithGoogle,
    connectWallet,
    logout,
    register
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
