import React from 'react'
import { motion } from 'framer-motion'
import { Home, Search, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-fairy-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative mb-8"
          >
            <div className="text-8xl font-bold gradient-text mb-4">404</div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-0 right-0 text-4xl opacity-20"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              className="absolute bottom-0 left-0 text-3xl opacity-30"
            >
              🧙‍♀️
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Página no encontrada
              </h1>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
              La página que buscas parece haber desaparecido como por arte de magia. 
              ¡Pero no te preocupes, podemos ayudarte a encontrar lo que necesitas!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <Link to="/" className="block">
              <Button
                size="lg"
                className="w-full"
                leftIcon={<Home />}
              >
                Volver al inicio
              </Button>
            </Link>
            
            <Link to="/services" className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                leftIcon={<Search />}
              >
                Buscar servicios
              </Button>
            </Link>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ¿Necesitas ayuda? Contacta nuestro{' '}
              <Link
                to="/contact"
                className="text-primary-600 hover:text-primary-700 font-medium underline"
              >
                soporte técnico
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound