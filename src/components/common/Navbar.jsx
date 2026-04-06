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
        padding: "18px 32px",
        background: "linear-gradient(135deg, #e6f4ea, #d0f0d8)",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
          padding: "0 28px",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(0,0,0,0.05)",
          borderRadius: "18px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
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
            whileHover={{ rotate: 8, scale: 1.1 }}
            style={{
              width: 38,
              height: 38,
              background: "linear-gradient(135deg, #16a34a, #4ade80)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(22,163,74,0.4)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3C10 3 5 7 5 12a5 5 0 0010 0c0-5-5-9-5-9z"
                fill="white"
              />
              <line
                x1="10"
                y1="12"
                x2="10"
                y2="18"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              fontWeight: 600,
              color: "#14532d",
            }}
          >
            Agro<span style={{ color: "#22c55e" }}>Price</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: "8px" }}>
          {links.map(({ to, label }) => {
            const isActive = pathname === to

            return (
              <motion.div key={to} whileHover={{ y: -2 }}>
                <Link
                  to={to}
                  style={{
                    position: "relative",
                    padding: "8px 16px",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: isActive ? "#fff" : "#374151",
                    background: isActive
                      ? "linear-gradient(135deg, #16a34a, #4ade80)"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 6px 14px rgba(22,163,74,0.35)"
                      : "none",
                    transition: "all 0.25s ease",
                  }}
                >
                  {label}

                  {/* Active underline animation */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "20%",
                        width: "60%",
                        height: "3px",
                        borderRadius: "10px",
                        background: "#16a34a",
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "9px 20px",
            background: "linear-gradient(135deg, #14532d, #16a34a)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(20,83,45,0.35)",
          }}
        >
          Get Started
        </motion.button>
      </nav>
    </div>
  )
}

export default Navbar