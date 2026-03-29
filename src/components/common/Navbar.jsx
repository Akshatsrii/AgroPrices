import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-md">
      <h1 className="text-xl font-bold">AgroPrice</h1>
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/prediction">Prediction</Link>
        <Link to="/insights">Insights</Link>
      </div>
    </div>
  )
}

export default Navbar