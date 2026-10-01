// Google Places (New) helpers. Server-side only; the key never reaches the browser.
// Terms note: Google allows storing only the Place ID long term. Everything else
// is used to PRE-FILL the owner's own submission form, which the owner confirms
// and edits before sending. We store what the owner submits, not a Google copy.

export const placesKey = () => process.env.GOOGLE_PLACES_API_KEY || null;

// Google place type -> our category slug.
export const typeToCategory: Record<string, string> = {
  plumber: "plumbers", electrician: "electricians", roofing_contractor: "roofing", general_contractor: "general-contractors",
  painter: "painters", locksmith: "locksmiths", moving_company: "moving-companies", house_cleaning_service: "house-cleaning",
  hvac_contractor: "hvac", landscaper: "landscaping", pest_control_service: "pest-control",
  restaurant: "restaurants", cafe: "cafes-and-coffee-shops", coffee_shop: "cafes-and-coffee-shops", bakery: "bakeries",
  pizza_restaurant: "pizza", mexican_restaurant: "mexican-restaurants", fast_food_restaurant: "fast-food",
  breakfast_restaurant: "breakfast-and-brunch", brunch_restaurant: "breakfast-and-brunch", ice_cream_shop: "ice-cream-and-desserts",
  catering_service: "catering", grocery_store: "grocery-stores", supermarket: "grocery-stores",
  dentist: "dentists", dental_clinic: "dentists", orthodontist: "orthodontists", doctor: "doctors-and-clinics",
  chiropractor: "chiropractors", physiotherapist: "physical-therapy", massage: "massage-therapy", massage_spa: "massage-therapy",
  optometrist: "optometrists", pharmacy: "pharmacies", veterinary_care: "veterinarians", spa: "day-spas",
  hair_salon: "hair-salons", hair_care: "hair-salons", barber_shop: "barbershops", nail_salon: "nail-salons", beauty_salon: "hair-salons",
  tattoo_shop: "tattoo-and-piercing", gym: "gyms", fitness_center: "gyms", yoga_studio: "yoga-and-pilates",
  bicycle_store: "bike-shops", golf_course: "golf",
  car_repair: "auto-repair", car_dealer: "car-dealerships", car_wash: "car-washes-and-detailing", tire_shop: "tire-shops",
  auto_parts_store: "auto-parts", towing_service: "towing",
  accounting: "accountants-and-cpas", lawyer: "lawyers-and-attorneys", real_estate_agency: "real-estate-agents",
  insurance_agency: "insurance-agents", financial_planner: "financial-advisors", photographer: "photographers",
  clothing_store: "boutiques-and-clothing", book_store: "bookstores", furniture_store: "furniture-stores",
  jewelry_store: "jewelers", florist: "florists", gift_shop: "gift-shops", hardware_store: "hardware-stores",
  electronics_store: "electronics-and-phone-repair", sporting_goods_store: "sporting-goods",
  school: "private-schools", preschool: "preschools-and-daycare", child_care_agency: "preschools-and-daycare",
  wedding_venue: "wedding-venues", event_venue: "event-venues", pet_store: "pet-stores", pet_groomer: "pet-groomers",
  church: "churches-and-faith-communities", hotel: "hotels", lodging: "hotels", bed_and_breakfast: "bed-and-breakfasts",
  self_storage: "storage-units", funeral_home: "funeral-services", coworking_space: "coworking-spaces",
};
