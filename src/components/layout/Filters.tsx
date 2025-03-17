import { useState } from 'react'
import { FiFilter, FiX } from 'react-icons/fi'

export default function Filters({
  types,
  selectedTypes,
  setSelectedTypes,
  priceRange,
  setPriceRange,
}: {
  types: string[]
  selectedTypes: string[]
  setSelectedTypes: (types: string[]) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleType = (type: string) => {
    setSelectedTypes(
      selectedTypes.includes(type)
        ? selectedTypes.filter((t) => t !== type)
        : [...selectedTypes, type],
    )
  }

  return (
    <>
      <button
        className="fixed md:hidden bottom-4 right-4 p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiFilter size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed md:relative h-screen md:h-auto transform transition-transform duration-300 w-full
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="pl-4 h-full overflow-y-auto space-y-4">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Preço
            </h3>
            <div className="space-y-4">
              {/* Price Inputs */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    Mínimo
                  </label>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const newMin = parseInt(e.target.value || '0')
                      setPriceRange([
                        newMin,
                        newMin > priceRange[1] ? newMin : priceRange[1],
                      ])
                    }}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-gray-600 dark:text-gray-300"
                    min="0"
                    max={priceRange[1]}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                    Máximo
                  </label>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const newMax = parseInt(e.target.value || '1000')
                      setPriceRange([
                        newMax < priceRange[0] ? newMax : priceRange[0],
                        newMax,
                      ])
                    }}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent text-gray-600 dark:text-gray-300"
                    min={priceRange[0]}
                    max="1000"
                  />
                </div>
              </div>

              {/* Dual Range Slider */}
              <div className="relative pt-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([parseInt(e.target.value), priceRange[1]])
                  }
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-600 [&::-webkit-slider-thumb]:dark:bg-gray-300 [&::-webkit-slider-thumb]:pointer-events-auto"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-600 [&::-webkit-slider-thumb]:dark:bg-gray-300 [&::-webkit-slider-thumb]:pointer-events-auto"
                />
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full" />
              </div>
            </div>
          </div>
          <div className="mb-8 bg-white dark:bg-gray-800 shadow rounded-lg p-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
              Pesquisas
            </h3>
            <div className="space-y-2">
              {types.map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    // checked={selectedTypes.includes(type)}
                    checked={true}
                    onChange={() => toggleType(type)}
                    className="w-4 h-4 text-gray-600 dark:text-gray-300 bg-transparent border-gray-300 rounded focus:ring-gray-500"
                  />
                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
