import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { day: 'Mon', price: 18 },
  { day: 'Tue', price: 20 },
  { day: 'Wed', price: 19 },
  { day: 'Thu', price: 22 },
  { day: 'Fri', price: 24 }
]

function PriceChart() {
  return (
    <div className="bg-white/10 p-4 rounded-xl mt-6">
      <h2 className="mb-4">Price Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#22c55e" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PriceChart