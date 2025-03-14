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
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      layout
      className="fixed top-0 h-screen shrink-0 border-r border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-2 z-50"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiHome}
          title="Dashboard"
          open={open}
          href="/dashboard"
        />
        <Option
          Icon={FiMonitor}
          title="Produtos"
          open={open}
          href="/produtos"
        />
        <Option
          Icon={FiShoppingCart}
          title="Selecionados v.2"
          open={open}
          href="/selecionados"
        />
        <Option
          Icon={SiOpenai}
          title="IA aplicada v.2"
          open={open}
          href="/ia"
        />
        <Option
          Icon={FiBarChart}
          title="Análise v.3"
          open={open}
          href="/analise"
        />
        <Option
          Icon={FiUsers}
          title="Usuários v.2"
          open={open}
          href="/usuarios"
        />
      </div>

      <ToggleClose open={open} setOpen={setOpen} />
    </motion.nav>
  );  
};

const Option = ({ Icon, title, open, href }) => {
  const pathname = usePathname();
  const isActive = pathname === href.toLowerCase();

  return (
    <Link href={href}>
      <motion.button
        layout
        className={`relative cursor-pointer flex h-10 w-full items-center rounded-md transition-colors ${
          isActive
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
              <span className="block text-xs font-semibold dark:text-white">R7 Digital</span>
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
      className="grid size-10 shrink-0 place-content-center rounded-md"
    >
      <Image
        src="/imgs/logo.png"
        alt="Logo"
        width={40}
        height={40}
        layout="fixed"
      />
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