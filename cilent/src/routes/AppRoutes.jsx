import React, { Suspense, lazy } from "react"
import { Routes, Route } from "react-router-dom"
import Loader from "../components/common/Loader"

// 🔥 Lazy loading (better performance)
const Home = lazy(() => import("../pages/Home"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const Prediction = lazy(() => import("../pages/Prediction"))
const Insights = lazy(() => import("../pages/Insights"))
const NotFound = lazy(() => import("../pages/NotFound"))

// 🔥 Error Boundary (important)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[60vh] text-red-500">
          Something went wrong while loading this page.
        </div>
      )
    }
    return this.props.children
  }
}

function AppRoutes() {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default AppRoutes