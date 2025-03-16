// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import ItemsList from '@/components/layout/ItemsList'
import PageLayout from '@/components/layout/PageLayout'
import { DefaultPagination } from '@/components/layout/Pagination'
import { Select } from '@/components/ui/Select'
import { motion } from 'framer-motion'
import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'
import { FaFileExcel } from 'react-icons/fa'
import { TbCategory, TbMenu2 } from "react-icons/tb"
import { SyncLoader } from 'react-spinners'
import * as XLSX from 'xlsx'

interface Product {
  id: string
  nome: string
  categoria: string
  preco: string
  fornecedor: string
  site: string
  imagem: string
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json')
        if (!response.ok) {
          throw new Error('Failed to load products')
        }

        const data = await response.json()
        setProducts(data.Sheet1)

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const fuseStrict = new Fuse(products, {
    keys: [
      { name: 'nome', weight: 0.9 },
      { name: 'fornecedor', weight: 0.1 },
    ],
    includeScore: true,
    shouldSort: true,
    threshold: 0.3,
    ignoreLocation: false,
    useExtendedSearch: true,
  })

  const fuseLoose = new Fuse(products, {
    keys: [
      { name: 'nome', weight: 0.9 },
      { name: 'fornecedor', weight: 0.1 },
    ],
    includeScore: true,
    shouldSort: true,
    threshold: 0.4,
    ignoreLocation: true,
    useExtendedSearch: true,
  })

  let sortedProducts = products

  if (searchQuery.length > 0) {
    const strictResults = fuseStrict.search(`^${searchQuery}`)

    if (strictResults.length > 0) {
      sortedProducts = strictResults.map((result) => result.item)
    } else {
      sortedProducts = fuseLoose
        .search(searchQuery)
        .map((result) => result.item)
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex justify-between -translate-y-2'>
          <div className="flex w-full gap-2 items-center">
            <Select
              label="Exibir"
              id="itens-number-select"
              options={[
                { value: '20', label: '20 Itens' },
                { value: '40', label: '40 Itens' },
                { value: '80', label: '80 Itens' },
                { value: '100', label: '100 Itens' },
              ]}
              className="max-w-40"
            />
            <Select
              label="Preço Médio"
              id="itens-number-select"
              options={[
                { value: 0, label: 'Todos' },
                { value: [0, 50], label: 'R$0-50' },
                { value: [50, 200], label: 'R$50-200' },
                { value: [200, 1000], label: 'R$200-1000' },
                { value: 1000, label: 'Mais de R$1000' },
              ]}
              className="max-w-60"
            />
            <button
              onClick={() => {
                const worksheet = XLSX.utils.json_to_sheet(sortedProducts)
                const workbook = XLSX.utils.book_new()
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos')
                XLSX.writeFile(workbook, 'produtos.xlsx')
              }}
              className="flex items-center px-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer translate-y-1"
            >
              <FaFileExcel size={24} />
            </button>
          </div>
          <div className="flex gap-4 items-center text-gray-700 dark:text-gray-300">
            <p className='whitespace-nowrap font-semibold'>1024 Items</p>
            <TbCategory size={24} />
            <TbMenu2 size={24} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <SyncLoader color="#4f46e5" />
          </div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-lg text-red-700 dark:bg-red-200 dark:text-red-800">
            {error}
          </div>
        ) : (
          <>
            <ItemsList items={currentItems} />
            
            <div className='mt-8 flex justify-center'>
              <DefaultPagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
            </div>
          </>
        )}
      </motion.div>
    </PageLayout>
  )
}
