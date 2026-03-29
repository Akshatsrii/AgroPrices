function PriceCard({ mandi, price }) {
  return (
    <div className="bg-white/10 p-4 rounded-xl">
      <h2 className="text-lg">{mandi}</h2>
      <p className="text-green-400 text-xl">₹{price}</p>
    </div>
  )
}

export default PriceCard