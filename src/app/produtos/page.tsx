// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use client'

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight, FaFileExcel } from 'react-icons/fa';
import SideBar from "@/components/SideBar";
import { SyncLoader } from 'react-spinners';
import * as XLSX from 'xlsx';
import Fuse from 'fuse.js';


interface Product {
  id: string;
  nome: string;
  categoria: string;
  preco: string;
  fornecedor: string;
  site: string;
  imagem: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/data/products.json');
        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const data = await response.json();
        setProducts(data.Sheet1);
        
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
  });
  
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
  });
  
  let sortedProducts = products
  
  if (searchQuery.length > 0) {
    // First attempt: strict search (prefix)
    const strictResults = fuseStrict.search(`^${searchQuery}`);
  
    if (strictResults.length > 0) {
      // if strict results found, use them
      sortedProducts = strictResults.map((result) => result.item);
    } else {
      // otherwise fallback to loose search
      sortedProducts = fuseLoose.search(searchQuery).map((result) => result.item);
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      <SideBar />
      <div className="flex-1 p-2 md:p-6 ml-14 md:ml-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-7">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              Inventário de Produtos
            </h1>
            <div className='flex items-center gap-2'>
                <div className="relative">
                  <input
                      type="text"
                      placeholder="Filtrar Produtos..."
                      className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      value={searchQuery}
                      onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                      }}
                  />
                  <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
                </div>
                <button
                    onClick={() => {
                    const worksheet = XLSX.utils.json_to_sheet(sortedProducts);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos');
                    XLSX.writeFile(workbook, 'produtos.xlsx');
                    }}
                    className="flex items-center gap-2 px-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                >
                    <FaFileExcel size={26} />
                </button>
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-indigo-50 dark:bg-gray-700 font-medium text-gray-600 dark:text-gray-300">
                    <div className="col-span-2">Imagem</div>
                    <div className="col-span-3">Nome</div>
                    <div className="col-span-2">Categoria</div>
                    <div className="col-span-2">Preço</div>
                    <div className="col-span-2">Fornecedor</div>
                    <div className="col-span-1">Edereço</div>
                </div>

                <AnimatePresence>
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentItems.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="col-span-2 flex items-center">
                          <img src={product.imagem} alt={product.nome} className="w-16 h-16 object-cover rounded-lg" />
                        </div>
                        <div className="col-span-3">
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-semibold">{product.nome}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{product.categoria}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 dark:text-gray-300 font-bold">R${product.preco}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 dark:text-gray-300">{product.fornecedor}</p>
                        </div>
                        <div className="col-span-1">
                          <a href={product.site} target="_blank" rel="noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                            Visitar
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              </div>

              <motion.div
                className="flex justify-between items-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
                >
                  <FaChevronLeft />
                    Anterior
                </button>
                
                <div className="flex gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page => {
                        return (
                            page === currentPage ||
                            page === currentPage + 1 ||
                            page === totalPages
                        );
                        })
                        .map((page, index, arr) => (
                        <React.Fragment key={page}>
                            {index > 0 && arr[index - 1] !== page - 1 && (
                            <span className="px-2 pt-2 text-gray-800 dark:text-gray-300">. . .</span>
                            )}
                            <button
                            onClick={() => paginate(page)}
                            className={`px-3 py-1 rounded-lg cursor-pointer ${
                                currentPage === page
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                            >
                            {page}
                            </button>
                        </React.Fragment>
                        ))}
                </div>


                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex cursor-pointer items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
                >
                  Próxima
                  <FaChevronRight />
                </button>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}