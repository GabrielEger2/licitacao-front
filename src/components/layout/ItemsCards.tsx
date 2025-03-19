/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from 'next/link'
import { BiHeart } from 'react-icons/bi'
import Button from '../ui/Button'

export default function ItemsCards({ items }: { items: unknown[] }) {
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="flex flex-col p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800 rounded-lg shadow-sm"
          >
            <div className="relative mb-4">
              <img
                src={product.imagem}
                alt={product.nome}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2">
                <BiHeart
                  size={24}
                  className="text-gray-300 dark:text-gray-700 hover:text-red-500 transition-colors cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col flex-grow">
              <p className="text-sm text-gray-400 dark:text-gray-400 mb-1">
                {product.fornecedor}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold mb-4">
                {product.nome}
              </p>

              <div className="mt-auto">
                <p className="text-2xl text-gray-600 dark:text-gray-300 font-semibold mb-4">
                  R${product.preco}
                </p>
                <Link href={product.site} target="_blank" className="block">
                  <Button className="w-full">Visitar</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
