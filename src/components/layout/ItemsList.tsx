import Link from 'next/link'
import { BiHeart } from 'react-icons/bi'
import Button from '../ui/Button'

export default function ItemsList({ items }: { items: any[] }) {
  return (
    <div className="overflow-hidden">
      <div className="space-y-2">
        {items.map((product) => (
          <div
            key={product.id}
            className="flex gap-4 px-10 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800 rounded shadow-sm"
          >
            <div className="w-full flex gap-10 items-center">
              <div className="flex items-center">
                <img
                  src={product.imagem}
                  alt={product.nome}
                  className="w-28 h-28 object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-sm text-gray-400 dark:text-gray-400">
                  {product.fornecedor}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-semibold max-w-lg">
                  {product.nome}
                </p>
              </div>
            </div>
            <div className="w-96 border-l-2 border-gray-200 dark:border-gray-900 pl-4 flex flex-col items-center justify-between">
              <div className="w-full justify-end flex">
                <BiHeart
                  size={24}
                  className="text-gray-300 dark:text-gray-600 hover:text-red-500 transition-colors cursor-pointer"
                />
              </div>
              <div className="pb-2 w-full text-left">
                <p className="text-2xl text-gray-600 dark:text-gray-300 font-semibold">
                  R${product.preco}
                </p>
              </div>
              <Link href={product.site}>
                <Button className="w-68">Visitar</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
