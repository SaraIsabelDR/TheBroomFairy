import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import type { LoginCredentials, WalletProvider } from '@/types'

interface WalletOption {
  name: string
  icon: string
  type: WalletProvider
}

const walletOptions: WalletOption[] = [
  { name: 'MetaMask', icon: '🦊', type: 'metamask' },
  { name: 'Bitcoin', icon: '₿', type: 'bitcoin' },
  { name: 'Binance', icon: '🔶', type: 'binance' },
  { name: 'ByBit', icon: '⚡', type: 'bybit' }
]

const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, loginWithGoogle, connectWallet, isLoading } = useAuth()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string>('')

  const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>()

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    try {
      setLoginError('')
      await login(data)
      navigate('/dashboard')
    } catch (error: any) {
      setLoginError(error.message || 'Credenciales incorrectas')
    }
  }

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      await loginWithGoogle()
      navigate('/dashboard')
    } catch (error) {
      console.error('Google login error:', error)
    }
  }

  const handleWalletConnect = async (walletType: WalletProvider): Promise<void> => {
    try {
      await connectWallet(walletType)
      setShowWalletModal(false)
      navigate('/dashboard')
    } catch (error) {
      console.error('Wallet connection error:', error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-purple-600 mr-2" />
              <h1 className="text-2xl font-display font-bold gradient-text">
                The Broom Fairy
              </h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Bienvenido
            </h2>
            <p className="text-gray-600">
              Inicia sesión para acceder a tu cuenta
            </p>
          </div>

          {/* Error Message */}
          {loginError && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"
            >
              ❌ Usuario no registrado
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="lombook@gmail.com"
                icon={Mail}
                {...register('email', {
                  required: 'El email es requerido',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email inválido'
                  }
                })}
                error={errors.email?.message}
              />
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  icon={Lock}
                  {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 6,
                      message: 'Mínimo 6 caracteres'
                    }
                  })}
                  error={errors.password?.message}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full btn-primary"
              loading={isLoading}
            >
              Iniciar Sesión
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Continúa con</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              onClick={handleGoogleLogin}
              className="w-full btn-secondary flex items-center justify-center"
            >
              <span className="mr-2">🔍</span>
              Google
            </Button>

            <Button
              onClick={() => setShowWalletModal(true)}
              className="w-full btn-secondary flex items-center justify-center"
            >
              <span className="mr-2">👛</span>
              Una Wallet
            </Button>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <Link
              to="/forgot-password"
              className="text-sm text-purple-600 hover:text-purple-700 block"
            >
              ¿Olvidaste tus credenciales?
            </Link>
            <Link
              to="/reset-password"
              className="text-sm text-purple-600 hover:text-purple-700 block"
            >
              ¡Restablece tus credenciales aquí!
            </Link>
            <div className="pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">¿No tienes cuenta? </span>
              <Link
                to="/register"
                className="text-sm text-purple-600 hover:text-purple-700 font-semibold"
              >
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Wallet Selection Modal */}
      <Modal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        title="Selecciona tu Wallet"
      >
        <div className="grid grid-cols-2 gap-4">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.type}
              onClick={() => handleWalletConnect(wallet.type)}
              className="flex flex-col items-center p-4 border border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-300"
            >
              <span className="text-2xl mb-2">{wallet.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {wallet.name}
              </span>
            </button>
          ))}
        </div>
      </Modal>
    </div>
  )
}

export default Login
