import React from 'react'
import { motion } from 'framer-motion'
import { Users, Calendar, Star, DollarSign } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const Dashboard: React.FC = () => {
  const { user } = useAuth()

  const stats = [
    {
      name: 'Reservas Totales',
      value: '24',
      icon: Calendar,
      change: '+12%',
      changeType: 'increase'
    },
    {
      name: 'Calificación Promedio',
      value: '4.9',
      icon: Star,
      change: '+0.1',
      changeType: 'increase'
    },
    {
      name: 'Ingresos del Mes',
      value: '$2,340',
      icon: DollarSign,
      change: '+18%',
      changeType: 'increase'
    },
    {
      name: 'Clientes Activos',
      value: '89',
      icon: Users,
      change: '+7%',
      changeType: 'increase'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ¡Bienvenido de vuelta, {user?.name}! ✨
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Aquí tienes un resumen de tu actividad reciente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                  <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center py-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Dashboard en construcción 🚧
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Pronto tendrás acceso a todas las funcionalidades avanzadas
          </p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard