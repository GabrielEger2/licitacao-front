// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import { FiArrowRight, FiMenu, FiX } from 'react-icons/fi'
import Input from '../ui/Input'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full text-gray-900 dark:text-gray-200 bg-white border-b border-gray-300 dark:border-gray-700 py-[0.7rem] px-2 md:px-6  dark:bg-gray-900">
      <div className="mx-auto flex items-center justify-between">
        <Input
          id="email-input"
          type="text"
          placeholder="Pesquisar Por..."
          className="w-full max-w-2xl"
        />
        <div className="hidden gap-2 lg:flex">
          <Image
            src="/imgs/logo.png"
            alt="Invictus Engenharia"
            width={40}
            height={40}
          />
          <h1 className="tracking-tight leading-5">
            <span className="font-bold">R7Digital</span>
            <br />
            <span className="text-sm">Informática e Serviços</span>
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
    <div className="block lg:hidden">
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
              <Logo color="black" />
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
              <MobileMenuLink
                href="#contato"
                key="Contato"
                setMenuOpen={setOpen}
              >
                Contato
              </MobileMenuLink>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

const LINKS = [
  {
    text: 'Sobre Nós',
    href: '#sobre-nos',
  },
  {
    text: 'Serviços',
    href: '#servicos',
  },
  {
    text: 'Projetos',
    href: '#projetos',
  },
  {
    text: 'FAQ',
    href: '#faq',
  },
]
