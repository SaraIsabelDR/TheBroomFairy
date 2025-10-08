import React from 'react'
import { motion } from 'framer-motion'
import { Home, Building, Zap } from 'lucide-react'

const Services: React.FC = () => {
  const services = [
    {
      icon: Home,
      name: 'Limpieza Residencial',
      description: 'Servicio completo para tu hogar',
      price: 'Desde $50'
    },
    {
      icon: Building,
      name: 'Limpieza Comercial',
      description: 'Soluciones para oficinas y locales',
      price: 'Desde $80'
    },
    {
      icon: Zap,
      name: 'Limpieza Profunda',
      description: 'Limpieza detallada y especializada',
      price: 'Desde $120'
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Nuestros Servicios ✨
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="card"
            >
              <div className="p-6">
                <service.icon className="w-12 h-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <span className="text-2xl font-bold text-primary-600">
                  {service.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services