function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 px-4 py-2 rounded-lg text-black"
    >
      {children}
    </button>
  )
}

export default Button