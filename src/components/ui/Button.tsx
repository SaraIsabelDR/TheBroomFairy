import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'

import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/helpers'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  loadingText?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  loading = false,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loadingText,
  className,
  disabled,
  ...props
}, ref) => {
  const baseClasses = [
    'relative inline-flex items-center justify-center',
    'font-semibold transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
    'select-none touch-manipulation',
    // Better accessibility
    'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
  ].join(' ')
  
  const variants = {
    primary: [
      'bg-gradient-to-r from-primary-600 to-fairy-600',
      'hover:from-primary-700 hover:to-fairy-700',
      'active:from-primary-800 active:to-fairy-800',
      'text-white shadow-lg hover:shadow-magical',
      'border border-transparent',
      'focus:ring-primary-500'
    ].join(' '),
    
    secondary: [
      'bg-white/80 backdrop-blur-sm hover:bg-white/90',
      'text-primary-700 dark:text-primary-300',
      'border border-primary-200 hover:border-primary-300',
      'shadow-md hover:shadow-lg',
      'dark:bg-gray-800/80 dark:hover:bg-gray-800/90',
      'dark:border-gray-600 dark:hover:border-gray-500',
      'focus:ring-primary-500'
    ].join(' '),
    
    outline: [
      'bg-transparent hover:bg-primary-50',
      'text-primary-600 hover:text-primary-700',
      'border-2 border-primary-600 hover:border-primary-700',
      'dark:hover:bg-primary-950 dark:text-primary-400',
      'focus:ring-primary-500'
    ].join(' '),
    
    ghost: [
      'bg-transparent hover:bg-primary-50',
      'text-primary-600 hover:text-primary-700',
      'border border-transparent',
      'dark:hover:bg-primary-950 dark:text-primary-400',
      'focus:ring-primary-500'
    ].join(' '),
    
    destructive: [
      'bg-gradient-to-r from-red-600 to-red-700',
      'hover:from-red-700 hover:to-red-800',
      'active:from-red-800 active:to-red-900',
      'text-white shadow-lg hover:shadow-xl',
      'border border-transparent',
      'focus:ring-red-500'
    ].join(' '),
    
    success: [
      'bg-gradient-to-r from-green-600 to-emerald-600',
      'hover:from-green-700 hover:to-emerald-700',
      'active:from-green-800 active:to-emerald-800',
      'text-white shadow-lg hover:shadow-xl',
      'border border-transparent',
      'focus:ring-green-500'
    ].join(' ')
  }
  
  const sizes = {
    xs: 'px-2 py-1 text-xs rounded-md min-h-[28px]',
    sm: 'px-3 py-2 text-sm rounded-lg min-h-[36px]',
    md: 'px-4 py-2.5 text-base rounded-xl min-h-[44px]',
    lg: 'px-6 py-3 text-lg rounded-xl min-h-[52px]',
    xl: 'px-8 py-4 text-xl rounded-2xl min-h-[60px]'
  }

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
  }

  const isDisabled = disabled || loading

  const content = loading ? (loadingText || children) : children

  return (
    <button
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        'transition-transform hover:scale-105 active:scale-95',
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}

      {...props}
    >
      {/* Left Icon or Loading Spinner */}
      {loading ? (
        <Loader2 className={cn(iconSizes[size], "mr-2 animate-spin")} />
      ) : leftIcon ? (
        <span className={cn(iconSizes[size], "mr-2 flex-shrink-0")}>
          {leftIcon}
        </span>
      ) : null}
      
      {/* Button Content */}
      <span className="flex-1 truncate">
        {content}
      </span>
      
      {/* Right Icon */}
      {!loading && rightIcon && (
        <span className={cn(iconSizes[size], "ml-2 flex-shrink-0")}>
          {rightIcon}
        </span>
      )}
    </button>
  )
})

export default Button
