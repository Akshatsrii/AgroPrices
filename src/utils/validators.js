// ============================================================
//   AgriIntel – Form & Input Validators
// ============================================================

// Non-empty string
export const isRequired = (val) => {
  if (val === null || val === undefined) return "This field is required.";
  if (typeof val === "string" && val.trim() === "") return "This field is required.";
  return null;
};

// Positive number
export const isPositiveNumber = (val) => {
  if (val === "" || val == null) return "Please enter a value.";
  if (isNaN(Number(val)))        return "Please enter a valid number.";
  if (Number(val) <= 0)          return "Value must be greater than zero.";
  return null;
};

// Number in range
export const inRange = (val, min, max) => {
  const n = Number(val);
  if (isNaN(n)) return "Please enter a valid number.";
  if (n < min)  return `Value must be at least ${min}.`;
  if (n > max)  return `Value must be at most ${max}.`;
  return null;
};

// Validate quantity input (land, yield, cost)
export const validateQuantity = (val, label = "Quantity") => {
  if (!val && val !== 0) return `${label} is required.`;
  if (isNaN(Number(val))) return `${label} must be a number.`;
  if (Number(val) < 0)    return `${label} cannot be negative.`;
  return null;
};

// Validate price
export const validatePrice = (val, label = "Price") => {
  if (!val && val !== 0) return `${label} is required.`;
  if (isNaN(Number(val)))    return `${label} must be a number.`;
  if (Number(val) <= 0)      return `${label} must be greater than 0.`;
  if (Number(val) > 100_000) return `${label} seems too high. Please verify.`;
  return null;
};

// Validate email
export const validateEmail = (email) => {
  if (!email) return "Email is required.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "Please enter a valid email address.";
  return null;
};

// Validate phone (Indian 10-digit)
export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required.";
  const cleaned = phone.replace(/\s/g, "");
  if (!/^(\+91)?[6-9]\d{9}$/.test(cleaned)) return "Please enter a valid 10-digit Indian mobile number.";
  return null;
};

// Validate profit calculator form
export const validateProfitForm = (form) => {
  const errors = {};
  errors.landArea     = validateQuantity(form.landArea,     "Land area");
  errors.yieldPerAcre = validateQuantity(form.yieldPerAcre, "Yield per acre");
  errors.costPerAcre  = validateQuantity(form.costPerAcre,  "Cost per acre");
  errors.sellingPrice = validatePrice(form.sellingPrice,    "Selling price");

  // Remove null entries
  Object.keys(errors).forEach((k) => { if (!errors[k]) delete errors[k]; });
  return { errors, isValid: Object.keys(errors).length === 0 };
};

// Run multiple validators on a single field
export const runValidators = (val, validators = []) => {
  for (const fn of validators) {
    const error = fn(val);
    if (error) return error;
  }
  return null;
};