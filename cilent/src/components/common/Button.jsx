function Button({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition 
        ${disabled 
          ? "bg-gray-400 cursor-not-allowed" 
          : "bg-green-500 hover:bg-green-600 active:scale-95"}
        text-black`}
    >
      {children}
    </button>
  )
}

export default Button