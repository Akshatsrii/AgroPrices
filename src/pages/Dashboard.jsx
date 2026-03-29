import Navbar from '../components/common/Navbar'
import CropSelector from '../components/dashboard/CropSelector'
import PriceList from '../components/dashboard/PriceList'
import RecommendationBox from '../components/dashboard/RecommendationBox'
import ProfitCalculator from '../components/dashboard/ProfitCalculator'
import PriceChart from '../components/charts/PriceChart'
import TrendGraph from '../components/charts/TrendGraph'
import { dummyPrices } from '../data/dummyData'

function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6">
        <CropSelector />
        <PriceList data={dummyPrices} />
        <RecommendationBox />
        <ProfitCalculator />
        <PriceChart />
        <TrendGraph />
      </div>
    </div>
  )
}

export default Dashboard