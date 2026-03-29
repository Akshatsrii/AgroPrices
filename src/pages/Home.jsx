import Navbar from '../components/common/Navbar'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-black text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        <h1 className="text-5xl font-bold mb-6">AgroPrice AI</h1>
        <p className="text-lg mb-6">Smart mandi price prediction & decision system</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-green-500 px-6 py-3 rounded-xl text-black font-semibold"
        >
          Check Prices
        </button>
      </div>
    </div>
  )
}

export default Home