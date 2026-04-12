// ============================================================
//   AgriIntel – Form & Input Validators
// ============================================================

// ─────────────────────────────────────────────
// 🔹 Core Helpers
// ─────────────────────────────────────────────

const isEmpty = (val) =>
  val === null || val === undefined || (typeof val === "string" && val.trim() === "")

const toNumber = (val) => {
  const n = Number(val)
  return isNaN(n) ? null : n
}

// ─────────────────────────────────────────────
// 🔹 Basic Validators
// ─────────────────────────────────────────────

export const isRequired = (val, label = "This field") =>
  isEmpty(val) ? `${label} is required.` : null

export const isPositiveNumber = (val, label = "Value") => {
  const n = toNumber(val)
  if (isEmpty(val)) return `${label} is required.`
  if (n === null) return `${label} must be a valid number.`
  if (n <= 0) return `${label} must be greater than zero.`
  return null
}

export const inRange = (val, min, max, label = "Value") => {
  const n = toNumber(val)
  if (n === null) return `${label} must be a valid number.`
  if (n < min) return `${label} must be at least ${min}.`
  if (n > max) return `${label} must be at most ${max}.`
  return null
}

// ─────────────────────────────────────────────
// 🔹 Domain Validators
// ─────────────────────────────────────────────

export const validateQuantity = (val, label = "Quantity") => {
  const n = toNumber(val)
  if (isEmpty(val)) return `${label} is required.`
  if (n === null) return `${label} must be a number.`
  if (n < 0) return `${label} cannot be negative.`
  return null
}

export const validatePrice = (val, label = "Price") => {
  const n = toNumber(val)
  if (isEmpty(val)) return `${label} is required.`
  if (n === null) return `${label} must be a number.`
  if (n <= 0) return `${label} must be greater than 0.`
  if (n > 100_000) return `${label} seems too high. Please verify.`
  return null
}

// ─────────────────────────────────────────────
// 🔹 Contact Validators
// ─────────────────────────────────────────────

export const validateEmail = (email) => {
  if (isEmpty(email)) return "Email is required."
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email) ? null : "Please enter a valid email address."
}

export const validatePhone = (phone) => {
  if (isEmpty(phone)) return "Phone number is required."
  const cleaned = phone.replace(/\s/g, "")
  return /^(\+91)?[6-9]\d{9}$/.test(cleaned)
    ? null
    : "Please enter a valid 10-digit Indian mobile number."
}

// ─────────────────────────────────────────────
// 🔹 Form Validator
// ─────────────────────────────────────────────

export const validateProfitForm = (form = {}) => {
  const errors = {
    landArea: validateQuantity(form.landArea, "Land area"),
    yieldPerAcre: validateQuantity(form.yieldPerAcre, "Yield per acre"),
    costPerAcre: validateQuantity(form.costPerAcre, "Cost per acre"),
    sellingPrice: validatePrice(form.sellingPrice, "Selling price"),
  }

  // remove null values
  Object.keys(errors).forEach((k) => {
    if (!errors[k]) delete errors[k]
  })

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  }
}

// ─────────────────────────────────────────────
// 🔹 Validator Runner (VERY POWERFUL)
// ─────────────────────────────────────────────

export const runValidators = (val, validators = []) => {
  for (const fn of validators) {
    const error = fn(val)
    if (error) return error
  }
  return null
}

// ─────────────────────────────────────────────
// 🔹 Advanced: Compose Validators
// ─────────────────────────────────────────────

export const composeValidators =
  (...validators) =>
  (val) =>
    runValidators(val, validators)