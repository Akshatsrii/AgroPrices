function Loader() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="h-6 w-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-white/10 rounded-xl ${className}`}
    ></div>
  )
}

export default Loader