import { InputHTMLAttributes, forwardRef } from 'react'

import { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/helpers'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: LucideIcon
  helperText?: string
  variant?: 'default' | 'filled' | 'outlined'
  inputSize?: 'sm' | 'md' | 'lg'
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon: Icon,
  helperText,
  variant = 'default',
  inputSize = 'md',
  className,
  ...props
}, ref) => {
  const baseClasses = 'w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    default: 'border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm hover:border-purple-300 focus:border-purple-500',
    filled: 'border-0 rounded-xl bg-gray-100 hover:bg-gray-200 focus:bg-white',
    outlined: 'border-2 border-purple-200 rounded-xl bg-transparent hover:border-purple-400 focus:border-purple-600'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-5 py-4 text-lg'
  }

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}
        
        <input
          ref={ref}
          className={cn(
            baseClasses,
            variants[variant],
            sizes[inputSize],
            Icon && 'pl-10',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-500',
            'transition-transform focus:scale-105',
            className
          )}
          {...props}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center mt-1 animate-fadeIn">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500 mt-1">
          {helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input