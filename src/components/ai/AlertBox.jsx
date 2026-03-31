function AlertBox({ type = "warning", message = "Market prices may change soon" }) {
  const styles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  }

  return (
    <div className={`p-4 rounded-xl font-medium ${styles[type]}`}>
      {message}
    </div>
  )
}

export default AlertBox