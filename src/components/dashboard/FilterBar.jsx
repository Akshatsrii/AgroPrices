import { useState } from 'react'

function FilterBar({ onFilter }) {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleFilter = () => {
    onFilter({ minPrice, maxPrice })
  }

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="number"
        placeholder="Min Price"
        className="p-2 rounded text-black"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Price"
        className="p-2 rounded text-black"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button
        onClick={handleFilter}
        className="bg-green-500 px-4 py-2 rounded text-black"
      >
        Apply
      </button>
    </div>
  )
}

export default FilterBar