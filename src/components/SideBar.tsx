// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import React, { useState } from "react";
import {
  FiBarChart,
  FiChevronsRight,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import { SiOpenai } from "react-icons/si";
import { motion } from 'framer-motion';
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/dashboard"
        />
        <Option
          Icon={FiMonitor}
          title="Produtos"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/produtos"
        />
        <Option
          Icon={FiShoppingCart}
          title="Selecionados v.2"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/selecionados"
        />
        <Option
          Icon={SiOpenai}
          title="IA aplicada v.2"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/ia"
        />
        <Option
          Icon={FiBarChart}
          title="Análise v.3"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/analise"
        />
        <Option
          Icon={FiUsers}
          title="Usuários v.2"
          selected={selected}
          setSelected={setSelected}
          open={open}
          href="/usuarios"
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );
};

const Option = ({ Icon, title, selected, setSelected, open, href }) => {
  return (
    <Link href={href}>
      <motion.button
        layout
        onClick={() => {setSelected(title)}}
        className={`relative cursor-pointer flex h-10 w-full items-center rounded-md transition-colors ${
          selected === title 
            ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300" 
            : "text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
        }`}
      >
        <motion.div
          layout
          className="grid h-full w-10 place-content-center text-lg"
        >
          <Icon className="dark:text-slate-300" />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium dark:text-slate-200"
          >
            {title}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const TitleSection = ({ open }) => {
  return (
    <div className="mb-3 border-b border-slate-300 dark:border-slate-700 pb-3">
      <div className="flex items-center justify-between rounded-md transition-colors">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold dark:text-white">Cliente Pago</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">Plano Pro</span>
            </motion.div>
          )}
        </div>
        

        {open && (
        <ThemeToggle />
        )}
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    >
      <svg
        width="24"
        height="auto"
        viewBox="0 0 50 39"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-slate-50"
      >
        <path
          d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
          stopColor="#000000"
        ></path>
        <path
          d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
          stopColor="#000000"
        ></path>
      </svg>
    </motion.div>
  );
};

const ToggleClose = ({ open, setOpen }) => {
  return (
    <motion.button
      layout
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t cursor-pointer border-slate-300 dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"} dark:text-slate-300`}
          />
        </motion.div>
        {open && (
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium dark:text-white"
          >
            Reduzir
          </motion.span>
        )}
      </div>
    </motion.button>
  );
};