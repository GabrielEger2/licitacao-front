// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { motion } from 'framer-motion'

const selectVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export const Select = ({
  label,
  id,
  options,
  required = false,
  className = '',
  variants = selectVariants,
  ...props
}) => {
  return (
    <motion.div
      variants={variants}
      className={`w-full mb-4 ${className}`}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.3 }}
    >
      <label
        htmlFor={id}
        className="mb-1 inline-block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <select
        id={id}
        className={`w-full rounded border border-slate-300 px-3 py-2 text-sm cursor-pointer transition-colors
          focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
          dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:ring-indigo-500
          appearance-none
          bg-no-repeat bg-[right_0.5rem_center]`}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="dark:bg-slate-800"
          >
            {option.label}
          </option>
        ))}
      </select>
    </motion.div>
  )
}
