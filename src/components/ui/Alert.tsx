import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Info, X, XCircle, LucideIcon } from 'lucide-react'
import { cn } from '@/utils/helpers'
import Button from './Button'

export interface AlertProps {
  variant: 'success' | 'error' | 'warning' | 'info'
  title?: string
  children: ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  className?: string
  icon?: LucideIcon
}

const Alert: React.FC<AlertProps> = ({
  variant,
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
  icon
}) => {
  const variants = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
      icon: 'text-green-600 dark:text-green-400',
      defaultIcon: CheckCircle
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
      icon: 'text-red-600 dark:text-red-400',
      defaultIcon: XCircle
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
      icon: 'text-yellow-600 dark:text-yellow-400',
      defaultIcon: AlertTriangle
    },
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
      icon: 'text-blue-600 dark:text-blue-400',
      defaultIcon: Info
    }
  }

  const variantConfig = variants[variant]
  const IconComponent = icon || variantConfig.defaultIcon

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'relative rounded-xl border p-4',
        'flex items-start space-x-3',
        variantConfig.container,
        className
      )}
      role="alert"
    >
      {/* Icon */}
      <div className={cn('flex-shrink-0 mt-0.5', variantConfig.icon)}>
        <IconComponent size={20} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h3 className="text-sm font-medium mb-1">
            {title}
          </h3>
        )}
        <div className="text-sm">
          {children}
        </div>
      </div>

      {/* Dismiss Button */}
      {dismissible && (
        <Button
          variant="ghost"
          size="xs"
          onClick={onDismiss}
          className={cn(
            'flex-shrink-0 p-1 -mr-1 -mt-1',
            'hover:bg-black/5 dark:hover:bg-white/5',
            variantConfig.icon
          )}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </Button>
      )}
    </motion.div>
  )
}

export default Alert