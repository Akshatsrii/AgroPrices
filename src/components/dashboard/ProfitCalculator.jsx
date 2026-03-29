import { useState } from 'react'

function ProfitCalculator() {
  const [quantity, setQuantity] = useState('')
  const [price, setPrice] = useState('')
  const [transport, setTransport] = useState('')
  const [result, setResult] = useState(null)

  const calculate = () => {
    const profit = quantity * price - transport
    setResult(profit)
  }

  return (
    <div className="bg-white/10 p-4 rounded-xl mt-6">
      <h2 className="mb-4 text-lg">Profit Calculator</h2>

      <div className="flex gap-4 mb-4">
        <input type="number" placeholder="Quantity" className="p-2 rounded text-black"
          onChange={(e) => setQuantity(e.target.value)} />
        <input type="number" placeholder="Price" className="p-2 rounded text-black"
          onChange={(e) => setPrice(e.target.value)} />
        <input type="number" placeholder="Transport Cost" className="p-2 rounded text-black"
          onChange={(e) => setTransport(e.target.value)} />
      </div>

      <button onClick={calculate} className="bg-green-500 px-4 py-2 rounded text-black">
        Calculate
      </button>

      {result !== null && (
        <div className="mt-4 text-green-400 text-xl">
          Profit: ₹{result}
        </div>
      )}
    </div>
  )
}

export default ProfitCalculator