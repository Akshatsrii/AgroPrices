import Navbar from '../components/common/Navbar'
import PredictionBox from '../components/ai/PredictionBox'

function Prediction() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-6">
        <PredictionBox />
      </div>
    </div>
  )
}

export default Prediction