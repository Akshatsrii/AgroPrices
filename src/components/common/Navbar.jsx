import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/prediction', label: 'Prediction' },
  { to: '/insights', label: 'Insights' },
]

function Navbar() {
  const { pathname } = useLocation()

  return (
    <div className="px-6 py-4"
      style={{ background: 'linear-gradient(135deg, #e8f0d4, #d4e8b8)' }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px',
        padding: '0 1.5rem',
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(90,130,50,0.18)',
        borderRadius: '16px',
        boxShadow: '0 2px 24px rgba(60,100,20,0.08)',
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34,
            background: 'linear-gradient(135deg, #4a8c2a, #6db84a)',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 3C10 3 5 7 5 12a5 5 0 0010 0c0-5-5-9-5-9z" fill="rgba(255,255,255,0.9)" />
              <line x1="10" y1="12" x2="10" y2="18" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#2a5010', letterSpacing: '-0.3px' }}>
            Agro<span style={{ color: '#6db84a' }}>Price</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {links.map(({ to, label }) => {
            const isActive = pathname === to
            return (
              <Link
                key={to}
                to={to}
                style={{
                  padding: '7px 14px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: isActive ? '#fff' : '#4a6030',
                  background: isActive
                    ? 'linear-gradient(135deg, #4a8c2a, #6db84a)'
                    : 'transparent',
                  boxShadow: isActive ? '0 2px 10px rgba(74,140,42,0.3)' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <button style={{
          padding: '7px 18px',
          background: '#2a5010',
          color: '#fff',
          border: 'none',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          letterSpacing: '0.1px',
        }}>
          Get Started
        </button>
      </nav>
    </div>
  )
}

export default Navbar