import Navbar from '../components/common/Navbar'
import InsightCard from '../components/ai/InsightCard'

function Insights() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6 grid gap-4">
        <InsightCard />
      </div>
    </div>
  )
}

export default Insights