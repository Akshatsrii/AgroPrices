function Loader() {
  return <div className="text-center p-4">Loading...</div>
}

export function Skeleton() {
  return (
    <div className="animate-pulse bg-white/10 h-20 w-full rounded-xl"></div>
  )
}

export default Loader