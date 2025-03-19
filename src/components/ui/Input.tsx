import { motion } from 'framer-motion'

interface InputProps {
  label: string
  id: string
  type?: string
  required?: boolean
  placeholder: string
  className?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type = 'text',
  required = false,
  placeholder,
  className = '',
  value,
  onKeyDown,
  onChange,
  ...props
}) => {
  return (
    <motion.div
      className={`w-full ${className}`}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
      {...props}
    >
      <label
        htmlFor={id}
        className="mb-1 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={`w-full rounded border border-slate-300 px-3 py-2 text-sm transition-colors
          focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
          dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500
          dark:placeholder-slate-400 ${className}`}
      />
    </motion.div>
  )
}

export default Input
