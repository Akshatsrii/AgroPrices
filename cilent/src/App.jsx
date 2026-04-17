import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import NvidiaChatbot from "./components/common/NvidiaChatbot"

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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0B0E14', color: '#E2E8F0', fontFamily: "'Outfit', 'Segoe UI', sans-serif" }}>
      <ScrollToTop />

      {/* 🔹 Navbar */}
      <Navbar />

      {/* 🔹 Main Content */}
      <main className="flex-1">
        <AppRoutes />
      </main>

      {/* 🔹 Footer */}
      <Footer />
      
      {/* 🔹 NVIDIA Floating Chatbot */}
      <NvidiaChatbot />
    </div>
  )
}

export default App