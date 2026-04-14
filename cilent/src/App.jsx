import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"

// 🔹 Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return null
}

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-cream text-gray-800">
      <ScrollToTop />

      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Main Content */}
      <main className="flex-1">
        <AppRoutes />
      </main>

      {/* 🔹 Footer */}
      <Footer />
    </div>
  )
}

export default App