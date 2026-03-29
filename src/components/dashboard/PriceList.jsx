import PriceCard from './PriceCard'

function PriceList({ data }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <PriceCard key={index} mandi={item.mandi} price={item.price} />
      ))}
    </div>
  )
}

export default PriceList