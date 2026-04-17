import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/prediction", label: "Prediction" },
  { to: "/insights", label: "Insights" },
]

function Navbar() {
  const { pathname } = useLocation()

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        padding: "16px 32px",
        background: "rgba(11, 14, 20, 0.8)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "48px",
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
          }}
        >
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(6,214,160,0.3)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 18,
            }}
          >
            A
          </motion.div>

          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 22,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            Agro<span style={{ color: "#06d6a0" }}>Price</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "10px", background: "rgba(255,255,255,0.03)", padding: "4px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.05)" }}>
          {links.map(({ to, label }) => {
            const isActive = pathname === to

            return (
              <motion.div key={to} whileHover={{ y: -1 }}>
                <Link
                  to={to}
                  style={{
                    position: "relative",
                    padding: "8px 18px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "'Outfit', sans-serif",
                    textDecoration: "none",
                    color: isActive ? "#0B0E14" : "#94a3b8",
                    background: isActive
                      ? "#06d6a0"
                      : "transparent",
                    transition: "all 0.3s ease",
                    display: "block"
                  }}
                >
                  {label}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "10px 22px",
            background: "rgba(6, 214, 160, 0.1)",
            color: "#06d6a0",
            border: "1px solid rgba(6, 214, 160, 0.3)",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'Outfit', sans-serif",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(6, 214, 160, 0.2)" }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(6, 214, 160, 0.1)" }}
        >
          Access Terminal
        </motion.button>
      </nav>
    </div>
  )
}

export default Navbar