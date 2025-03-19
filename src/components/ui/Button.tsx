import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <motion.button
      className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 cursor-pointer
        bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-600
        ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export default Button
