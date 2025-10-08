import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  systemTheme: 'light' | 'dark'
  effectiveTheme: 'light' | 'dark'
}

interface ThemeContextType extends ThemeState {
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeAction {
  type: 'SET_THEME' | 'SET_SYSTEM_THEME'
  payload: Theme | 'light' | 'dark'
}

const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

const getStoredTheme = (): Theme => {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('theme') as Theme) || 'system'
  }
  return 'system'
}

const calculateEffectiveTheme = (theme: Theme, systemTheme: 'light' | 'dark'): 'light' | 'dark' => {
  return theme === 'system' ? systemTheme : theme as 'light' | 'dark'
}

const initialState: ThemeState = {
  theme: getStoredTheme(),
  systemTheme: getSystemTheme(),
  effectiveTheme: calculateEffectiveTheme(getStoredTheme(), getSystemTheme())
}

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME': {
      const newTheme = action.payload as Theme
      const effectiveTheme = calculateEffectiveTheme(newTheme, state.systemTheme)
      return {
        ...state,
        theme: newTheme,
        effectiveTheme
      }
    }
    case 'SET_SYSTEM_THEME': {
      const newSystemTheme = action.payload as 'light' | 'dark'
      const effectiveTheme = calculateEffectiveTheme(state.theme, newSystemTheme)
      return {
        ...state,
        systemTheme: newSystemTheme,
        effectiveTheme
      }
    }
    default:
      return state
  }
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  const setTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme)
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  const toggleTheme = () => {
    const newTheme = state.effectiveTheme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch({ 
        type: 'SET_SYSTEM_THEME', 
        payload: e.matches ? 'dark' : 'light' 
      })
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    
    // Remove all theme classes
    root.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(state.effectiveTheme)
    
    // Set color-scheme for better browser integration
    root.style.colorScheme = state.effectiveTheme
  }, [state.effectiveTheme])

  const value: ThemeContextType = {
    ...state,
    setTheme,
    toggleTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}