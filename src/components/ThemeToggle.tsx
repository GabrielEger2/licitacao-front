'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg bg-indigo-100 dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 cursor-pointer"
        aria-label="Toggle theme"
    >
        <AnimatePresence mode="wait" initial={false}>
        <motion.div
            key={isDarkMode ? 'dark' : 'light'}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {isDarkMode ? (
            <FaSun className="w-4 h-4" />
            ) : (
            <FaMoon className="w-4 h-4" />
            )}
        </motion.div>
        </AnimatePresence>
    </motion.button>
  );
}

export default ThemeToggle;
