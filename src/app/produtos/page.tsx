// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import Filters from '@/components/layout/Filters'
import ItemsCards from '@/components/layout/ItemsCards'
import ItemsList from '@/components/layout/ItemsList'
import PageLayout from '@/components/layout/PageLayout'
import { DefaultPagination } from '@/components/layout/Pagination'
import { Select } from '@/components/ui/Select'
import { motion } from 'framer-motion'
import Fuse from 'fuse.js'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaFileExcel } from 'react-icons/fa'
import { TbCategory, TbMenu2 } from 'react-icons/tb'
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
  const searchParams = useSearchParams()

  const searchQuery = searchParams.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid')

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

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  let sortedProducts = products.filter((p) => {
    const price = parseFloat(p.preco)
    const isPriceInRange =
      price >= priceRange[0] &&
      (priceRange[1] >= 1000 || price <= priceRange[1])

    return (
      isPriceInRange &&
      (selectedTypes.length === 0 || selectedTypes.includes(p.categoria))
    )
  })

  const fuseStrict = new Fuse(sortedProducts, {
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

  const fuseLoose = new Fuse(sortedProducts, {
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

  const paginate = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setCurrentPage(pageNumber)
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start">
          <div className="w-full">
            <div className="flex justify-between -translate-y-2 md:mt-0 mt-4">
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
                  value={itemsPerPage.toString()}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                />
                <button
                  onClick={() => {
                    const worksheet = XLSX.utils.json_to_sheet(sortedProducts)
                    const workbook = XLSX.utils.book_new()
                    XLSX.utils.book_append_sheet(
                      workbook,
                      worksheet,
                      'Produtos',
                    )
                    XLSX.writeFile(workbook, 'produtos.xlsx')
                  }}
                  className="flex items-center px-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer translate-y-1"
                >
                  <FaFileExcel size={24} />
                </button>
              </div>
              <div className="flex gap-4 items-center text-gray-700 dark:text-gray-300 translate-y-1">
                <TbCategory
                  size={24}
                  className={`cursor-pointer ${
                    viewType === 'grid' ? 'text-indigo-600' : ''
                  }`}
                  onClick={() =>
                    setViewType(viewType === 'grid' ? 'list' : 'grid')
                  }
                />
                <TbMenu2
                  size={24}
                  className={`cursor-pointer ${
                    viewType === 'list' ? 'text-indigo-600' : ''
                  }`}
                  onClick={() =>
                    setViewType(viewType === 'list' ? 'grid' : 'list')
                  }
                />
              </div>
            </div>
            <div>
              {currentItems.length === 0 ? (
                <div className="min-h-[80vh] flex items-center justify-center">
                  <h2 className="text-2xl text-gray-700 dark:text-gray-300">
                    {loading
                      ? 'Carregando...'
                      : error.length > 0
                        ? error
                        : 'Nenhum produto encontrado'}
                  </h2>
                </div>
              ) : viewType === 'grid' ? (
                <ItemsCards items={currentItems} />
              ) : (
                <ItemsList items={currentItems} />
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <DefaultPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            </div>
          </div>
          <div className="xl:flex justify-center items-center mt-[5.05rem] w-96 h-full hidden">
            <Filters
              types={[
                'T.I',
                'informática',
                'No-break',
                'Notebook',
                'Desktop',
                'Servidor',
                'Monitor',
                'Placa Mãe',
                'Processador',
                'Memória RAM',
                'HD',
                'SSD',
                'Placa de Vídeo',
                'Fonte',
                'Gabinete',
                'Cooler',
                'Teclado',
                'Mouse',
                'Headset',
                'Webcam',
                'Impressora',
                'Scanner',
              ]}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>
        </div>
      </motion.div>
    </PageLayout>
  )
}
