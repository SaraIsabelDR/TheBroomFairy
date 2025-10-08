import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, Users, Shield, Zap, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

const Home: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Expertos Verificados',
      description: 'Todos nuestros profesionales están verificados y evaluados por la comunidad'
    },
    {
      icon: Zap,
      title: 'Reserva Instantánea',
      description: 'Reserva tu servicio en segundos con nuestro sistema inteligente'
    },
    {
      icon: Star,
      title: 'Calidad Garantizada',
      description: 'Garantizamos la satisfacción en cada servicio o te devolvemos tu dinero'
    },
    {
      icon: Heart,
      title: 'Cuidado Personal',
      description: 'Cada servicio se adapta a tus necesidades específicas'
    }
  ]

  const testimonials = [
    {
      name: 'María González',
      rating: 5,
      comment: 'Excelente servicio, muy profesional y confiable. ¡Totalmente recomendado!',
      avatar: '👩‍💼'
    },
    {
      name: 'Carlos Ruiz',
      rating: 5,
      comment: 'La mejor experiencia en limpieza que he tenido. Súper fácil de usar.',
      avatar: '👨‍💻'
    },
    {
      name: 'Ana Martínez',
      rating: 5,
      comment: 'Increíble atención al detalle. Mi hogar quedó perfecto.',
      avatar: '👩‍🎨'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-fairy-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-[url('/magical-pattern.svg')] opacity-5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-12 h-12 text-primary-600 mr-4 animate-magical-float" />
              <h1 className="text-5xl lg:text-7xl font-display font-bold gradient-text">
                The Broom Fairy
              </h1>
            </div>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Transforma tu hogar con el toque mágico de nuestros expertos en limpieza
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                leftIcon={<Sparkles />}
              >
                Reservar Ahora
              </Button>
              
              <Link to="/experts">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  leftIcon={<Users />}
                >
                  Ver Expertos
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              ¿Por qué elegir The Broom Fairy?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ofrecemos la mejor experiencia en servicios de limpieza con tecnología de vanguardia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-fairy-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-fairy-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Lo que dicen nuestros clientes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Miles de hogares transformados con nuestra magia
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.comment}"
                </p>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-fairy-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              ¿Listo para experimentar la magia?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Únete a miles de clientes satisfechos y transforma tu hogar hoy mismo
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-50"
              leftIcon={<Sparkles />}
            >
              Comenzar Ahora
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home