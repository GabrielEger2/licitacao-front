'use client'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { FiArrowUpRight, FiStar } from 'react-icons/fi'

export default function Home() {
  return (
    <section className="grid min-h-screen grid-cols-1 bg-slate-50 md:grid-cols-2">
      <Logo />
      <Form />
      <SupplementalContent />
    </section>
  )
}

const Form = () => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      className="flex items-center justify-center pb-4 pt-20 md:py-20"
    >
      <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
        <motion.h1
          variants={primaryVariants}
          className="mb-2 text-center text-4xl font-semibold"
        >
          Análise Licitação Produtos
        </motion.h1>
        <motion.p variants={primaryVariants} className="mb-8 text-center">
          Faça login para acessar
        </motion.p>

        <form onSubmit={(e) => e.preventDefault()} className="w-full">
          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <Input
              id="email-input"
              label="Email"
              type="email"
              placeholder="Insira seu email"
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants} className="mb-2 w-full">
            <Input
              id="password-input"
              label="Senha"
              type="password"
              placeholder="Insira sua senha"
              required
            />
          </motion.div>

          <motion.div variants={primaryVariants}>
            <Link href="/dashboard">
              <Button className="w-full mt-1 mb-2">Entrar</Button>
            </Link>
          </motion.div>
          <motion.p variants={primaryVariants} className="text-xs">
            Ainda não tem uma conta?{' '}
            <a className="text-indigo-600 underline" href="#">
              Entrar em contato
            </a>
          </motion.p>
        </form>
      </div>
    </motion.div>
  )
}

const SupplementalContent = () => {
  return (
    <Link
      href="https://www.r7digital.com.br/"
      target="_blank"
      className="group sticky top-4 m-4 h-80 overflow-hidden rounded-3xl rounded-tl-[4rem] bg-slate-950 md:h-[calc(100vh_-_2rem)] cursor-pointer"
    >
      <Image
        alt="An example image"
        src="/imgs/login-poster.jpg"
        className="h-full w-full bg-white object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
        width={1000}
        height={2000}
      />

      <div className="absolute right-2 top-4 z-10">
        <FiArrowUpRight className="rotate-45 text-6xl text-indigo-200 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        viewport={{ once: true }}
        className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-slate-950/90 to-slate-950/0 p-8"
      >
        <motion.h2
          className="mb-2 text-3xl font-semibold leading-[1.25] text-white lg:text-4xl"
          variants={primaryVariants}
        >
          R7 Digital
        </motion.h2>
        <motion.p
          variants={primaryVariants}
          className="mb-6 max-w-md text-sm text-slate-300"
        >
          Localizada em Florianópolis, Santa Catarina, estamos há mais de 10
          anos no mercado de TI. Trabalhamos exclusivamente com órgãos públicos
          nas esferas federal, estadual e municipal.
        </motion.p>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <motion.img
              variants={avatarVariants}
              className="h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="https://blog.emania.com.br/wp-content/uploads/2016/06/foto-de-perfil-fidelidade.jpg"
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="https://blog.emania.com.br/wp-content/uploads/2016/06/foto-de-perfil-fidelidade.jpg"
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="https://blog.emania.com.br/wp-content/uploads/2016/06/foto-de-perfil-fidelidade.jpg"
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="https://blog.emania.com.br/wp-content/uploads/2016/06/foto-de-perfil-fidelidade.jpg"
            />
            <motion.img
              variants={avatarVariants}
              className="-ml-4 h-8 w-8 rounded-full border-[1px] border-slate-100 object-cover shadow-inner"
              alt="A placeholder testimonial image"
              src="https://blog.emania.com.br/wp-content/uploads/2016/06/foto-de-perfil-fidelidade.jpg"
            />
          </div>
          <div>
            <motion.div variants={primaryVariants} className="flex gap-0.5">
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <FiStar className="fill-yellow-300 text-sm text-yellow-300" />
              <span className="ml-2 text-sm text-white -translate-y-0.5">
                5.0
              </span>
            </motion.div>
            <motion.p
              variants={primaryVariants}
              className="text-xs text-slate-300"
            >
              Aprovada por mais de 100,000.00 clientes
            </motion.p>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

const Logo = () => {
  return (
    <div className="absolute left-[50%] top-4 -translate-x-[50%] fill-slate-950 md:left-4 md:-translate-x-0">
      <Image
        alt="R7 Digital Logo"
        src="/imgs/logo.png"
        width={50}
        height={50}
      />
    </div>
  )
}

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
}

const avatarVariants = {
  initial: {
    x: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
}
