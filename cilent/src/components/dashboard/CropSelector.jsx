function CropSelector({
  value,
  onChange,
  options = ["Tomato", "Potato", "Onion"],
  label = "Select Crop",
}) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 rounded-lg border border-gray-300 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {options.map((crop, index) => (
          <option key={index} value={crop}>
            {crop}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CropSelector