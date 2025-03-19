// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  FiBarChart,
  FiChevronsRight,
  FiHome,
  FiMonitor,
  FiShoppingCart,
  FiUsers,
} from 'react-icons/fi'
import { SiOpenai } from 'react-icons/si'
import ThemeToggle from './ThemeToggle'

export default function SideBar() {
  const [open, setOpen] = useState(true)

  return (
    <nav
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 py-2 z-50 hidden md:block"
      style={{
        width: open ? '200px' : 'fit-content',
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1 px-2">
        <Option Icon={FiHome} title="Dashboard" open={open} href="/dashboard" />
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
    </nav>
  )
}

const Option = ({ Icon, title, open, href }) => {
  const pathname = usePathname()
  const isActive = pathname === href.toLowerCase()

  return (
    <Link href={href}>
      <button
        className={`relative cursor-pointer flex h-10 w-full items-center rounded-md transition-colors ${
          isActive
            ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300'
            : 'text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
        }`}
      >
        <div className="grid h-full w-10 place-content-center text-lg">
          <Icon className="dark:text-slate-300" />
        </div>
        {open && (
          <span className="text-xs font-medium dark:text-slate-200">
            {title}
          </span>
        )}
      </button>
    </Link>
  )
}

const TitleSection = ({ open }) => {
  return (
    <div className="mb-2 pb-2 px-2 pt-1">
      <div className="flex items-center justify-between rounded-md transition-colors">
        <div className="flex items-center gap-2">
          <Logo />
          {open && (
            <div>
              <span className="block text-xs font-semibold dark:text-white">
                Perfil Teste
              </span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">
                Plano Pro
              </span>
            </div>
          )}
        </div>

        <div className={`${open ? 'block' : 'hidden'} flex items-center gap-2`}>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

const Logo = () => {
  return (
    <div className="grid size-10 shrink-0 place-content-center">
      <Image
        src="/imgs/logo.png"
        alt="Logo"
        width={40}
        height={40}
        layout="fixed"
        className="rounded"
      />
    </div>
  )
}

const ToggleClose = ({ open, setOpen }) => {
  return (
    <button
      onClick={() => setOpen((pv) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t cursor-pointer border-slate-300 dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
    >
      <div className="flex items-center p-2">
        <div className="grid size-10 place-content-center text-lg">
          <FiChevronsRight
            className={`transition-transform ${open && 'rotate-180'} dark:text-slate-300`}
          />
        </div>
        {open && (
          <span className="text-xs font-medium dark:text-white">Reduzir</span>
        )}
      </div>
    </button>
  )
}
