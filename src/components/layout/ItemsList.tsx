import { AnimatePresence, motion } from "framer-motion";

export default function ItemsList(
    { items }: { items: any[] }
) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <AnimatePresence>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {items.map((product) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="col-span-2 flex items-center">
                        <img
                          src={product.imagem}
                          alt={product.nome}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </div>
                      <div className="col-span-3">
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">
                          {product.nome}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {product.categoria}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-bold">
                          R${product.preco}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {product.fornecedor}
                        </p>
                      </div>
                      <div className="col-span-1">
                        <a
                          href={product.site}
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                          Visitar
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </div>
    )
}