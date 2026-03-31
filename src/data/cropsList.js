export const CROPS_LIST = [
  { id: "wheat",       name: "Wheat",       hindi: "गेहूँ",       emoji: "🌾", category: "Cereal",    season: "Rabi",  unit: "quintal" },
  { id: "rice",        name: "Rice",        hindi: "चावल",        emoji: "🍚", category: "Cereal",    season: "Kharif", unit: "quintal" },
  { id: "corn",        name: "Corn/Maize",  hindi: "मक्का",       emoji: "🌽", category: "Cereal",    season: "Kharif", unit: "quintal" },
  { id: "soybean",     name: "Soybean",     hindi: "सोयाबीन",     emoji: "🫘", category: "Oilseed",   season: "Kharif", unit: "quintal" },
  { id: "mustard",     name: "Mustard",     hindi: "सरसों",       emoji: "🌼", category: "Oilseed",   season: "Rabi",  unit: "quintal" },
  { id: "cotton",      name: "Cotton",      hindi: "कपास",        emoji: "🌸", category: "Fiber",     season: "Kharif", unit: "quintal" },
  { id: "sugarcane",   name: "Sugarcane",   hindi: "गन्ना",       emoji: "🎋", category: "Cash Crop", season: "Annual", unit: "quintal" },
  { id: "tomato",      name: "Tomato",      hindi: "टमाटर",       emoji: "🍅", category: "Vegetable", season: "All",   unit: "kg" },
  { id: "onion",       name: "Onion",       hindi: "प्याज",       emoji: "🧅", category: "Vegetable", season: "Rabi",  unit: "kg" },
  { id: "potato",      name: "Potato",      hindi: "आलू",         emoji: "🥔", category: "Vegetable", season: "Rabi",  unit: "kg" },
  { id: "chili",       name: "Chili",       hindi: "मिर्च",       emoji: "🌶️", category: "Spice",     season: "Kharif", unit: "kg" },
  { id: "turmeric",    name: "Turmeric",    hindi: "हल्दी",       emoji: "🟡", category: "Spice",     season: "Kharif", unit: "kg" },
  { id: "garlic",      name: "Garlic",      hindi: "लहसुन",       emoji: "🧄", category: "Vegetable", season: "Rabi",  unit: "kg" },
  { id: "ginger",      name: "Ginger",      hindi: "अदरक",        emoji: "🫚", category: "Spice",     season: "Kharif", unit: "kg" },
  { id: "chickpea",    name: "Chickpea",    hindi: "चना",         emoji: "🫘", category: "Pulse",     season: "Rabi",  unit: "quintal" },
  { id: "lentil",      name: "Lentil",      hindi: "मसूर",        emoji: "🫘", category: "Pulse",     season: "Rabi",  unit: "quintal" },
  { id: "moongdal",    name: "Moong Dal",   hindi: "मूंग दाल",    emoji: "🟢", category: "Pulse",     season: "Kharif", unit: "quintal" },
  { id: "groundnut",   name: "Groundnut",   hindi: "मूंगफली",     emoji: "🥜", category: "Oilseed",   season: "Kharif", unit: "quintal" },
  { id: "sunflower",   name: "Sunflower",   hindi: "सूरजमुखी",    emoji: "🌻", category: "Oilseed",   season: "Rabi",  unit: "quintal" },
  { id: "jowar",       name: "Jowar",       hindi: "ज्वार",       emoji: "🌾", category: "Cereal",    season: "Kharif", unit: "quintal" },
  { id: "bajra",       name: "Bajra",       hindi: "बाजरा",       emoji: "🌾", category: "Cereal",    season: "Kharif", unit: "quintal" },
  { id: "barley",      name: "Barley",      hindi: "जौ",          emoji: "🌾", category: "Cereal",    season: "Rabi",  unit: "quintal" },
  { id: "cauliflower", name: "Cauliflower", hindi: "फूलगोभी",     emoji: "🥦", category: "Vegetable", season: "Rabi",  unit: "kg" },
  { id: "brinjal",     name: "Brinjal",     hindi: "बैंगन",       emoji: "🍆", category: "Vegetable", season: "All",   unit: "kg" },
];

export const CROP_CATEGORIES = [
  "All",
  "Cereal",
  "Oilseed",
  "Pulse",
  "Vegetable",
  "Spice",
  "Fiber",
  "Cash Crop",
];

export const CROP_SEASONS = ["All", "Rabi", "Kharif", "Annual"];

export const getCropById = (id) => CROPS_LIST.find((c) => c.id === id);
export const getCropsByCategory = (cat) =>
  cat === "All" ? CROPS_LIST : CROPS_LIST.filter((c) => c.category === cat);