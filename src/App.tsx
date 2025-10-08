import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Context Providers
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import { AppProvider } from '@/context/AppContext'

// Components
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import ProtectedRoute from '@/components/common/ProtectedRoute'

// Pages
import Home from '@/pages/Home'
import Login from '@/components/features/auth/Login'
import Register from '@/components/features/auth/Register'
import Dashboard from '@/pages/Dashboard'
import Services from '@/pages/Services'
import Experts from '@/pages/Experts'
import Profile from '@/pages/Profile'
import Bookings from '@/pages/Bookings'
import NFTCollection from '@/pages/NFTCollection'
import Chat from '@/pages/Chat'
import NotFound from '@/components/common/NotFound'

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <AuthProvider>
            <AppProvider>
              <Router>
                <div className="min-h-screen bg-gradient-to-br from-purple-50 to-fairy-50">
                  <Navbar />
                  <main className="pt-16">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/experts" element={<Experts />} />
                      
                      {/* Protected Routes */}
                      <Route 
                        path="/dashboard" 
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/bookings" 
                        element={
                          <ProtectedRoute>
                            <Bookings />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/nft-collection" 
                        element={
                          <ProtectedRoute>
                            <NFTCollection />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/chat/:roomId?" 
                        element={
                          <ProtectedRoute>
                            <Chat />
                          </ProtectedRoute>
                        } 
                      />
                      
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </div>
              </Router>
            </AppProvider>
          </AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  )
}

export default App
