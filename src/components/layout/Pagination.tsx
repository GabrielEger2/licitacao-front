'use client'

import { BiArrowFromLeft, BiArrowFromRight } from 'react-icons/bi'
import Button from '../ui/Button'

interface DefaultPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function DefaultPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DefaultPaginationProps) {
  const handlePrev = () => onPageChange(Math.max(1, currentPage - 1))
  const handleNext = () => onPageChange(Math.min(totalPages, currentPage + 1))

  return (
    <div className="flex items-center gap-4">
      <Button
        className="flex items-center"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        <BiArrowFromRight strokeWidth={2} className="h-5 w-4" />
      </Button>

      <span className="text-gray-800 dark:text-gray-200">
        Pagina {currentPage} de {totalPages}
      </span>

      <Button
        className="flex items-center gap-2"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        <BiArrowFromLeft strokeWidth={2} className="h-5 w-4" />
      </Button>
    </div>
  )
}
