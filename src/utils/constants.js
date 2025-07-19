export const ACCOUNT_TYPE = {
  USER: "User",
  MESS_OWNER: "MessOwner",
}

export const COURSE_STATUS = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
}

export const FOOD_CATEGORIES = [
  "breakfast",
  "lunch", 
  "dinner",
  "snacks",
  "beverages"
]

export const SPICE_LEVELS = [
  "mild",
  "medium", 
  "spicy"
]

export const DIETARY_PREFERENCES = {
  VEGETARIAN: "vegetarian",
  VEGAN: "vegan",
  GLUTEN_FREE: "glutenFree"
}

export const RATING_CATEGORIES = {
  FOOD_QUALITY: "foodQuality",
  SERVICE: "service", 
  CLEANLINESS: "cleanliness",
  VALUE_FOR_MONEY: "valueForMoney"
}

export const MESS_SUBSCRIPTION_PLANS = {
  BASIC: "Basic",
  PREMIUM: "Premium"
}

export const OPERATING_HOURS_DEFAULT = {
  breakfast: { start: "07:00", end: "10:00" },
  lunch: { start: "12:00", end: "15:00" },
  dinner: { start: "19:00", end: "22:00" }
}

export const DEFAULT_LOCATION = {
  latitude: 28.6139, // Delhi coordinates
  longitude: 77.2090
}

export const SEARCH_RADIUS = {
  MIN: 1000, // 1km in meters
  MAX: 10000, // 10km in meters
  DEFAULT: 5000 // 5km in meters
}
