import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { mandi: 'Kota', price: 20 },
  { mandi: 'Jaipur', price: 18 },
  { mandi: 'Udaipur', price: 22 }
]

function TrendGraph() {
  return (
    <div className="bg-white/10 p-4 rounded-xl mt-6">
      <h2 className="mb-4">Market Comparison</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="mandi" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="price" fill="#16a34a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default TrendGraph