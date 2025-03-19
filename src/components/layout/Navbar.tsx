// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi'
import Button from '../ui/Button'
import Input from '../ui/Input'

export default function Navbar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q') || ''
  const [search, setSearch] = useState(searchQuery)

  return (
    <nav className="sticky top-0 z-50 w-full text-gray-900 dark:text-gray-200 bg-white border-b border-gray-300 dark:border-gray-700 py-[0.7rem] px-2 md:px-6  dark:bg-gray-900">
      <div className="mx-auto flex items-center justify-between gap-10">
        <div className="flex w-full md:max-w-2xl">
          <Input
            id="email-input"
            type="text"
            placeholder="Pesquisar Por..."
            className="rounded-r-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                router.push(`/produtos?q=${search}`)
              }
            }}
          />
          <Button
            onClick={() => router.push(`/produtos?q=${search}`)}
            className="rounded-l-none"
          >
            Pesquisar
          </Button>
        </div>
        <div className="hidden gap-2 md:flex">
          <Image
            src="/imgs/logo.png"
            alt="Invictus Engenharia"
            width={40}
            height={40}
          />
          <h1 className="tracking-tight leading-5">
            <span className="font-bold">R7Digital</span>
            <br />
            <span className="text-sm text-nowrap">Informática</span>
          </h1>
        </div>
        <MobileMenu />
      </div>
    </nav>
  )
}

const MobileMenuLink = ({ children, href, setMenuOpen }) => {
  return (
    <div className="relative text-neutral-950">
      <a
        onClick={(e) => {
          e.stopPropagation()
          setMenuOpen(false)
        }}
        href={href}
        className="flex w-full cursor-pointer items-center justify-between border-b border-neutral-300 py-6 text-start text-2xl font-semibold"
      >
        <span>{children}</span>
        <FiArrowRight />
      </a>
    </div>
  )
}

const MobileMenu = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="block md:hidden">
      <button onClick={() => setOpen(true)} className="block text-3xl">
        <FiMenu />
      </button>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            exit={{ x: '100vw' }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed left-0 top-0 flex h-screen w-full flex-col bg-white"
          >
            <div className="flex items-center justify-between p-6">
              <button onClick={() => setOpen(false)}>
                <FiX className="text-3xl text-neutral-950" />
              </button>
            </div>
            <div className="h-screen overflow-y-scroll bg-neutral-100 p-6">
              {LINKS.map((l) => (
                <MobileMenuLink
                  key={l.text}
                  href={l.href}
                  setMenuOpen={setOpen}
                >
                  {l.text}
                </MobileMenuLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

const LINKS = [
  {
    text: 'Dashboard',
    href: '/dashboard',
  },
  {
    text: 'Produtos',
    href: '/produtos',
  },
  {
    text: 'Selecionados v.2',
    href: '/selecionados',
  },
  {
    text: 'IA Aplicada v.2',
    href: '/ia',
  },
  {
    text: 'Análie v.3',
    href: '/analise',
  },
  {
    text: 'Usuários v.2',
    href: '/usuarios',
  },
]
