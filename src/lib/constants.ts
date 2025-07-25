
// import { Wrench, Sparkles, Paintbrush, Hammer, Zap, Droplets, BookUser, Truck, ChefHat, LayoutGrid, MapPin, ArrowRight, UtensilsCrossed, HardHat, Flower2, PartyPopper, Stethoscope, Scissors, Flame, AirVent, Disc3, Tv2, Laptop, Wind, ShowerHead, Filter, Snowflake, Microwave, Bath, Home, Leaf, Armchair, Gem, Lamp, Cake, Gift, HeartPulse, Brain, Baby, Activity, ClipboardList, Calculator, Atom, CaseSensitive, ScrollText, Globe, PersonStanding, Music2, Mic, Building, BrickWall, PaintRoller, Layers, Square, Grid, DoorClosed, BarChartHorizontal, DoorOpen, Box, GalleryVertical, Bed, FerrisWheel, FlaskConical, CalendarPlus } from 'lucide-react';
// import { platformFees } from './platformFees';

// export const FREE_TRANSACTION_LIMIT = 10;

// export const serviceHierarchy = [
//     { name: "Appliance Repair", query: "appliance-repair", icon: Wrench, color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/50", subcategories: [
//         { name: "AC", query: "ac", icon: AirVent, color: "text-blue-500" },
//         { name: "Washing Machine", query: "washing-machine", icon: Disc3, color: "text-blue-500" },
//         { name: "Television", query: "television", icon: Tv2, color: "text-blue-500" },
//         { name: "Laptop", query: "laptop", icon: Laptop, color: "text-blue-500" },
//         { name: "Air Cooler", query: "air-cooler", icon: Wind, color: "text-blue-500" },
//         { name: "Geyser", query: "geyser", icon: ShowerHead, color: "text-blue-500" },
//         { name: "Water Purifier", query: "water-purifier", icon: Filter, color: "text-blue-500" },
//         { name: "Refrigerator", query: "refrigerator", icon: Snowflake, color: "text-blue-500" },
//         { name: "Stove & Hob", query: "stove-hob", icon: Flame, color: "text-blue-500" },
//         { name: "Microwave", query: "microwave", icon: Microwave, color: "text-blue-500" },
//         { name: "Chimney", query: "chimney", icon: ChefHat, color: "text-blue-500" }
//     ]},
//     { name: "Carpentry (Wooden Services)", query: "carpentry", icon: Hammer, color: "text-orange-500", bgColor: "bg-orange-100 dark:bg-orange-900/50", subcategories: [
//         { name: "Wooden Door", query: "wooden-door", icon: DoorOpen, color: "text-orange-500" },
//         { name: "Wooden Window", query: "wooden-window", icon: Square, color: "text-orange-500" },
//         { name: "Wooden Almirah", query: "wooden-almirah", icon: Box, color: "text-orange-500" },
//         { name: "Wooden Showcase", query: "wooden-showcase", icon: GalleryVertical, color: "text-orange-500" },
//         { name: "Bed, chair, table, tool, bench", query: "furniture-work", icon: Bed, color: "text-orange-500" }
//     ]},
//     { name: "Catering Services", query: "catering-services", icon: UtensilsCrossed, color: "text-emerald-500", bgColor: "bg-emerald-100 dark:bg-emerald-900/50", subcategories: []},
//     { name: "Civil Services", query: "civil-services", icon: HardHat, color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/50", subcategories: [
//         { name: "Builder", query: "builder", icon: Building, color: "text-amber-500" },
//         { name: "Brickwork(with Sand, Cement, Plaster)", query: "brickwork", icon: BrickWall, color: "text-amber-500" },
//         { name: "Putty", query: "putty", icon: PaintRoller, color: "text-amber-500" },
//         { name: "Tiles Fitting", query: "tiles-fitting", icon: LayoutGrid, color: "text-amber-500" },
//         { name: "Marble Setting", query: "marble-setting", icon: Layers, color: "text-amber-500" },
//     ]},
//     { name: "Cleaner", query: "cleaner", icon: Sparkles, color: "text-sky-500", bgColor: "bg-sky-100 dark:bg-sky-900/50", subcategories: [
//         { name: "Bathroom Cleaner", query: "bathroom-cleaner", icon: Bath, color: "text-sky-500" },
//         { name: "Full Home Cleaner", query: "full-home-cleaner", icon: Home, color: "text-sky-500" },
//         { name: "Garden Cleaner", query: "garden-cleaner", icon: Leaf, color: "text-sky-500" },
//         { name: "Sofa & Carpet Cleaner", query: "sofa-carpet-cleaner", icon: Armchair, color: "text-sky-500" }
//     ]},
//     { name: "Cook", query: "cook", icon: ChefHat, color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-900/50", subcategories: [] },
//     { name: "Decorator Services", query: "decorator-services", icon: Flower2, color: "text-fuchsia-500", bgColor: "bg-fuchsia-100 dark:bg-fuchsia-900/50", subcategories: [
//         { name: "Wedding Decoration", query: "wedding-decoration", icon: Gem, color: "text-fuchsia-500" },
//         { name: "Puja Decoration", query: "puja-decoration", icon: Lamp, color: "text-fuchsia-500" },
//         { name: "Festival Decoration", query: "festival-decoration", icon: FerrisWheel, color: "text-fuchsia-500" },
//         { name: "Birthday Decoration", query: "birthday-decoration", icon: Cake, color: "text-fuchsia-500" },
//         { name: "Other Events", query: "other-events", icon: CalendarPlus, color: "text-fuchsia-500" }
//     ]},
//     { name: "Design", query: "design", icon: PartyPopper, color: "text-violet-500", bgColor: "bg-violet-100 dark:bg-violet-900/50", subcategories: [
//         { name: "Puja", query: "puja", icon: Lamp, color: "text-violet-500" },
//         { name: "Birthday Party", query: "birthday-party", icon: Cake, color: "text-violet-500" },
//         { name: "Marriage Ceremony", query: "marriage-ceremony", icon: Gem, color: "text-violet-500" },
//         { name: "Festival", query: "festival", icon: FerrisWheel, color: "text-violet-500" },
//         { name: "Special Occasion", query: "special-occasion", icon: Gift, color: "text-violet-500" }
//     ]},
//     { name: "Education", query: "education", icon: BookUser, color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/50", subcategories: [
//         { name: "General Teaching", query: "general-teaching", icon: ClipboardList, color: "text-green-500" },
//         { name: "Nursery kids", query: "nursery-kids", icon: Baby, color: "text-green-500" },
//         { name: "Math", query: "math", icon: Calculator, color: "text-green-500" },
//         { name: "Physics", query: "physics", icon: Atom, color: "text-green-500" },
//         { name: "Chemistry", query: "chemistry", icon: FlaskConical, color: "text-green-500" },
//         { name: "English", query: "english", icon: CaseSensitive, color: "text-green-500" },
//         { name: "History", query: "history", icon: ScrollText, color: "text-green-500" },
//         { name: "Geography", query: "geography", icon: Globe, color: "text-green-500" },
//         { name: "Yoga", query: "yoga", icon: PersonStanding, color: "text-green-500" },
//         { name: "Dance", query: "dance", icon: Music2, color: "text-green-500" },
//         { name: "Singing", query: "singing", icon: Mic, color: "text-green-500" },
//     ]},
//     { name: "Electrical", query: "electrical", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/50", subcategories: [] },
//     { name: "Healthcare", query: "healthcare", icon: Stethoscope, color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/50", subcategories: [
//         { name: "General Physician", query: "general-physician", icon: HeartPulse, color: "text-red-500" },
//         { name: "Psychiatrist", query: "psychiatrist", icon: Brain, color: "text-red-500" },
//         { name: "Pediatrician", query: "pediatrician", icon: Baby, color: "text-red-500" },
//         { name: "Physiotherapist", query: "physiotherapist", icon: Activity, color: "text-red-500" }
//     ]},
//     { name: "Painting", query: "painting", icon: Paintbrush, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50", subcategories: [] },
//     { name: "Plumbing", query: "plumbing", icon: Droplets, color: "text-cyan-500", bgColor: "bg-cyan-100 dark:bg-cyan-900/50", subcategories: [] },
//     { name: "Saloon", query: "saloon", icon: Scissors, color: "text-pink-500", bgColor: "bg-pink-100 dark:bg-pink-900/50", subcategories: []},
//     { name: "Transport Service", query: "transport-service", icon: Truck, color: "text-lime-600", bgColor: "bg-lime-100 dark:bg-lime-900/50", subcategories: [] },
//     { name: "Welding Services", query: "welding-services", icon: Flame, color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/50", subcategories: [
//         { name: "Sliding Window", query: "sliding-window", icon: Square, color: "text-red-600" },
//         { name: "Grill Door", query: "grill-door", icon: Grid, color: "text-red-600" },
//         { name: "Iron/Steel Door", query: "iron-steel-door", icon: DoorClosed, color: "text-red-600" },
//         { name: "Iron/Steel Window", query: "iron-steel-window", icon: Square, color: "text-red-600" },
//         { name: "Stair Railing Cover", query: "stair-railing-cover", icon: BarChartHorizontal, color: "text-red-600" }
//     ]},
// ].sort((a, b) => a.name.localeCompare(b.name));


// export const countries = [
//   { name: "India", dial_code: "+91", code: "IN", currency: "INR" },
//   { name: "United States", dial_code: "+1", code: "US", currency: "USD" },
//   { name: "United Kingdom", dial_code: "+44", code: "GB", currency: "GBP" },
//   { name: "Canada", dial_code: "+1", code: "CA", currency: "CAD" },
//   { name: "Australia", dial_code: "+61", code: "AU", currency: "AUD" },
//   { name: "New Zealand", dial_code: "+64", code: "NZ", currency: "NZD" },
//   { name: "Russia", dial_code: "+7", code: "RU", currency: "RUB" },
//   { name: "Brazil", dial_code: "+55", code: "BR", currency: "BRL" },
//   { name: "South Africa", dial_code: "+27", code: "ZA", currency: "ZAR" },
//   { name: "United Arab Emirates", dial_code: "+971", code: "AE", currency: "AED" },
//   { name: "Saudi Arabia", dial_code: "+966", code: "SA", currency: "SAR" },
//   { name: "Qatar", dial_code: "+974", code: "QA", currency: "QAR" },
//   { name: "Oman", dial_code: "+968", code: "OM", currency: "OMR" },
//   { name: "Kuwait", dial_code: "+965", code: "KW", currency: "KWD" },
//   { name: "Egypt", dial_code: "+20", code: "EG", currency: "EGP" },
//   { name: "Germany", dial_code: "+49", code: "DE", currency: "EUR" },
//   { name: "France", dial_code: "+33", code: "FR", currency: "EUR" },
//   { name: "Italy", dial_code: "+39", code: "IT", currency: "EUR" },
//   { name: "Spain", dial_code: "+34", code: "ES", currency: "EUR" },
//   { name: "Netherlands", dial_code: "+31", code: "NL", currency: "EUR" },
//   { name: "Belgium", dial_code: "+32", code: "BE", currency: "EUR" },
//   { name: "Portugal", dial_code: "+351", code: "PT", currency: "EUR" },
//   { name: "Finland", dial_code: "+358", "code": "FI", "currency": "EUR" },
//   { name: "Ireland", dial_code: "+353", "code": "IE", "currency": "EUR" },
//   { name: "Greece", dial_code: "+30", "code": "GR", "currency": "EUR" },
//   { name: "Austria", dial_code: "+43", "code": "AT", "currency": "EUR" },
//   { name: "Sweden", dial_code: "+46", "code": "SE", "currency": "SEK" },
//   { name: "Norway", dial_code: "+47", "code": "NO", "currency": "NOK" },
//   { name: "Denmark", dial_code: "+45", "code": "DK", "currency": "DKK" },
//   { name: "Switzerland", dial_code: "+41", "code": "CH", "currency": "CHF" },
//   { name: "Bangladesh", dial_code: "+880", "code": "BD", "currency": "BDT" },
//   { name: "Pakistan", dial_code: "+92", "code": "PK", "currency": "PKR" },
//   { name: "Sri Lanka", dial_code: "+94", "code": "LK", "currency": "LKR" },
//   { name: "Nepal", dial_code: "+977", "code": "NP", "currency": "NPR" },
//   { name: "Myanmar", dial_code: "+95", "code": "MM", "currency": "MMK" },
//   { name: "Singapore", dial_code: "+65", "code": "SG", "currency": "SGD" },
//   { name: "Malaysia", dial_code: "+60", "code": "MY", "currency": "MYR" },
//   { name: "Thailand", dial_code: "+66", "code": "TH", "currency": "THB" },
//   { name: "Indonesia", dial_code: "+62", "code": "ID", "currency": "IDR" },
//   { name: "Vietnam", dial_code: "+84", "code": "VN", "currency": "VND" },
//   { name: "Philippines", dial_code: "+63", "code": "PH", "currency": "PHP" },
//   { name: "South Korea", dial_code: "+82", "code": "KR", "currency": "KRW" },
//   { name: "Japan", dial_code: "+81", "code": "JP", "currency": "JPY" },
//   { name: "Hong Kong", dial_code: "+852", "code": "HK", "currency": "HKD" },
//   { name: "China", dial_code: "+86", "code": "CN", "currency": "CNY" },
//   { name: "Nigeria", dial_code: "+234", "code": "NG", "currency": "NGN" },
//   { name: "Kenya", dial_code: "+254", "code": "KE", "currency": "KES" }
// ].sort((a, b) => a.name.localeCompare(b.name));

// export const currencySymbols: { [key: string]: string } = {
//   'INR': '₹', 'USD': '$', 'GBP': '£', 'CAD': '$', 'AUD': '$', 'EUR': '€', 'JPY': '¥', 
//   'BRL': 'R$', 'ZAR': 'R', 'AFN': '؋', 'CNY': '¥', 'RUB': '₽', 'AED': 'د.إ', 'SAR': '﷼',
//   'QAR': '﷼', 'OMR': '﷼', 'KWD': 'د.ك', 'EGP': '£', 'SEK': 'kr', 'NOK': 'kr', 'DKK': 'kr',
//   'CHF': 'CHF', 'BDT': '৳', 'PKR': '₨', 'LKR': '₨', 'NPR': '₨', 'MMK': 'K', 'SGD': '$',
//   'MYR': 'RM', 'THB': '฿', 'IDR': 'Rp', 'VND': '₫', 'PHP': '₱', 'KRW': '₩', 'HKD': '$',
//   'NGN': '₦', 'KES': 'KSh', 'NZD': '$'
// };

    



import { Wrench, Sparkles, Paintbrush, Hammer, Zap, Droplets, BookUser, Truck, ChefHat, LayoutGrid, MapPin, ArrowRight, UtensilsCrossed, HardHat, Flower2, PartyPopper, Stethoscope, Scissors, Flame, AirVent, Disc3, Tv2, Laptop, Wind, ShowerHead, Filter, Snowflake, Microwave, Bath, Home, Leaf, Armchair, Gem, Lamp, Cake, Gift, HeartPulse, Brain, Baby, Activity, ClipboardList, Calculator, Atom, CaseSensitive, ScrollText, Globe, PersonStanding, Music2, Mic, Building, BrickWall, PaintRoller, Layers, Square, Grid, DoorClosed, BarChartHorizontal, DoorOpen, Box, GalleryVertical, Bed, FerrisWheel, FlaskConical, CalendarPlus } from 'lucide-react';

export const PROVIDER_PLATFORM_FEE_PERCENTAGE = 0.10; // 10%
export const MONTHLY_FREE_BOOKINGS = 10;
export const CUSTOMER_CANCELLATION_FEE = 20;
export const CANCELLATION_FEE_TO_PROVIDER = 15;
export const CANCELLATION_FEE_TO_PLATFORM = 5;


export const serviceHierarchy = [
    { name: "Appliance Repair", query: "appliance-repair", icon: Wrench, color: "text-blue-500", bgColor: "bg-blue-100 dark:bg-blue-900/50", subcategories: [
        { name: "AC", query: "ac", icon: AirVent, color: "text-blue-500" },
        { name: "Washing Machine", query: "washing-machine", icon: Disc3, color: "text-blue-500" },
        { name: "Television", query: "television", icon: Tv2, color: "text-blue-500" },
        { name: "Laptop", query: "laptop", icon: Laptop, color: "text-blue-500" },
        { name: "Air Cooler", query: "air-cooler", icon: Wind, color: "text-blue-500" },
        { name: "Geyser", query: "geyser", icon: ShowerHead, color: "text-blue-500" },
        { name: "Water Purifier", query: "water-purifier", icon: Filter, color: "text-blue-500" },
        { name: "Refrigerator", query: "refrigerator", icon: Snowflake, color: "text-blue-500" },
        { name: "Stove & Hob", query: "stove-hob", icon: Flame, color: "text-blue-500" },
        { name: "Microwave", query: "microwave", icon: Microwave, color: "text-blue-500" },
        { name: "Chimney", query: "chimney", icon: ChefHat, color: "text-blue-500" }
    ]},
    { name: "Carpentry (Wooden Services)", query: "carpentry", icon: Hammer, color: "text-orange-500", bgColor: "bg-orange-100 dark:bg-orange-900/50", subcategories: [
        { name: "Wooden Door", query: "wooden-door", icon: DoorOpen, color: "text-orange-500" },
        { name: "Wooden Window", query: "wooden-window", icon: Square, color: "text-orange-500" },
        { name: "Wooden Almirah", query: "wooden-almirah", icon: Box, color: "text-orange-500" },
        { name: "Wooden Showcase", query: "wooden-showcase", icon: GalleryVertical, color: "text-orange-500" },
        { name: "Bed, chair, table, tool, bench", query: "furniture-work", icon: Bed, color: "text-orange-500" }
    ]},
    { name: "Catering Services", query: "catering-services", icon: UtensilsCrossed, color: "text-emerald-500", bgColor: "bg-emerald-100 dark:bg-emerald-900/50", subcategories: []},
    { name: "Civil Services", query: "civil-services", icon: HardHat, color: "text-amber-500", bgColor: "bg-amber-100 dark:bg-amber-900/50", subcategories: [
        { name: "Builder", query: "builder", icon: Building, color: "text-amber-500" },
        { name: "Brickwork(with Sand, Cement, Plaster)", query: "brickwork", icon: BrickWall, color: "text-amber-500" },
        { name: "Putty", query: "putty", icon: PaintRoller, color: "text-amber-500" },
        { name: "Tiles Fitting", query: "tiles-fitting", icon: LayoutGrid, color: "text-amber-500" },
        { name: "Marble Setting", query: "marble-setting", icon: Layers, color: "text-amber-500" },
    ]},
    { name: "Cleaner", query: "cleaner", icon: Sparkles, color: "text-sky-500", bgColor: "bg-sky-100 dark:bg-sky-900/50", subcategories: [
        { name: "Bathroom Cleaner", query: "bathroom-cleaner", icon: Bath, color: "text-sky-500" },
        { name: "Full Home Cleaner", query: "full-home-cleaner", icon: Home, color: "text-sky-500" },
        { name: "Garden Cleaner", query: "garden-cleaner", icon: Leaf, color: "text-sky-500" },
        { name: "Sofa & Carpet Cleaner", query: "sofa-carpet-cleaner", icon: Armchair, color: "text-sky-500" }
    ]},
    { name: "Cook", query: "cook", icon: ChefHat, color: "text-orange-600", bgColor: "bg-orange-100 dark:bg-orange-900/50", subcategories: [] },
    { name: "Decorator Services", query: "decorator-services", icon: Flower2, color: "text-fuchsia-500", bgColor: "bg-fuchsia-100 dark:bg-fuchsia-900/50", subcategories: [
        { name: "Wedding Decoration", query: "wedding-decoration", icon: Gem, color: "text-fuchsia-500" },
        { name: "Puja Decoration", query: "puja-decoration", icon: Lamp, color: "text-fuchsia-500" },
        { name: "Festival Decoration", query: "festival-decoration", icon: FerrisWheel, color: "text-fuchsia-500" },
        { name: "Birthday Decoration", query: "birthday-decoration", icon: Cake, color: "text-fuchsia-500" },
        { name: "Other Events", query: "other-events", icon: CalendarPlus, color: "text-fuchsia-500" }
    ]},
    { name: "Design", query: "design", icon: PartyPopper, color: "text-violet-500", bgColor: "bg-violet-100 dark:bg-violet-900/50", subcategories: [
        { name: "Puja", query: "puja", icon: Lamp, color: "text-violet-500" },
        { name: "Birthday Party", query: "birthday-party", icon: Cake, color: "text-violet-500" },
        { name: "Marriage Ceremony", query: "marriage-ceremony", icon: Gem, color: "text-violet-500" },
        { name: "Festival", query: "festival", icon: FerrisWheel, color: "text-violet-500" },
        { name: "Special Occasion", query: "special-occasion", icon: Gift, color: "text-violet-500" }
    ]},
    { name: "Education", query: "education", icon: BookUser, color: "text-green-500", bgColor: "bg-green-100 dark:bg-green-900/50", subcategories: [
        { name: "General Teaching", query: "general-teaching", icon: ClipboardList, color: "text-green-500" },
        { name: "Nursery kids", query: "nursery-kids", icon: Baby, color: "text-green-500" },
        { name: "Math", query: "math", icon: Calculator, color: "text-green-500" },
        { name: "Physics", query: "physics", icon: Atom, color: "text-green-500" },
        { name: "Chemistry", query: "chemistry", icon: FlaskConical, color: "text-green-500" },
        { name: "English", query: "english", icon: CaseSensitive, color: "text-green-500" },
        { name: "History", query: "history", icon: ScrollText, color: "text-green-500" },
        { name: "Geography", query: "geography", icon: Globe, color: "text-green-500" },
        { name: "Yoga", query: "yoga", icon: PersonStanding, color: "text-green-500" },
        { name: "Dance", query: "dance", icon: Music2, color: "text-green-500" },
        { name: "Singing", query: "singing", icon: Mic, color: "text-green-500" },
    ]},
    { name: "Electrical", query: "electrical", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/50", subcategories: [] },
    { name: "Healthcare", query: "healthcare", icon: Stethoscope, color: "text-red-500", bgColor: "bg-red-100 dark:bg-red-900/50", subcategories: [
        { name: "General Physician", query: "general-physician", icon: HeartPulse, color: "text-red-500" },
        { name: "Psychiatrist", query: "psychiatrist", icon: Brain, color: "text-red-500" },
        { name: "Pediatrician", query: "pediatrician", icon: Baby, color: "text-red-500" },
        { name: "Physiotherapist", query: "physiotherapist", icon: Activity, color: "text-red-500" }
    ]},
    { name: "Painting", query: "painting", icon: Paintbrush, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/50", subcategories: [] },
    { name: "Plumbing", query: "plumbing", icon: Droplets, color: "text-cyan-500", bgColor: "bg-cyan-100 dark:bg-cyan-900/50", subcategories: [] },
    { name: "Saloon", query: "saloon", icon: Scissors, color: "text-pink-500", bgColor: "bg-pink-100 dark:bg-pink-900/50", subcategories: []},
    { name: "Transport Service", query: "transport-service", icon: Truck, color: "text-lime-600", bgColor: "bg-lime-100 dark:bg-lime-900/50", subcategories: [] },
    { name: "Welding Services", query: "welding-services", icon: Flame, color: "text-red-600", bgColor: "bg-red-100 dark:bg-red-900/50", subcategories: [
        { name: "Sliding Window", query: "sliding-window", icon: Square, color: "text-red-600" },
        { name: "Grill Door", query: "grill-door", icon: Grid, color: "text-red-600" },
        { name: "Iron/Steel Door", query: "iron-steel-door", icon: DoorClosed, color: "text-red-600" },
        { name: "Iron/Steel Window", query: "iron-steel-window", icon: Square, color: "text-red-600" },
        { name: "Stair Railing Cover", query: "stair-railing-cover", icon: BarChartHorizontal, color: "text-red-600" }
    ]},
].sort((a, b) => a.name.localeCompare(b.name));


export const countries = [
  { name: "India", dial_code: "+91", code: "IN", currency: "INR" },
  { name: "United States", dial_code: "+1", code: "US", currency: "USD" },
  { name: "United Kingdom", dial_code: "+44", code: "GB", currency: "GBP" },
  { name: "Canada", dial_code: "+1", code: "CA", currency: "CAD" },
  { name: "Australia", dial_code: "+61", code: "AU", currency: "AUD" },
  { name: "New Zealand", dial_code: "+64", code: "NZ", currency: "NZD" },
  { name: "Russia", dial_code: "+7", code: "RU", currency: "RUB" },
  { name: "Brazil", dial_code: "+55", code: "BR", currency: "BRL" },
  { name: "South Africa", dial_code: "+27", code: "ZA", currency: "ZAR" },
  { name: "United Arab Emirates", dial_code: "+971", code: "AE", currency: "AED" },
  { name: "Saudi Arabia", dial_code: "+966", code: "SA", currency: "SAR" },
  { name: "Qatar", dial_code: "+974", code: "QA", currency: "QAR" },
  { name: "Oman", dial_code: "+968", code: "OM", currency: "OMR" },
  { name: "Kuwait", dial_code: "+965", code: "KW", currency: "KWD" },
  { name: "Egypt", dial_code: "+20", code: "EG", currency: "EGP" },
  { name: "Germany", dial_code: "+49", code: "DE", currency: "EUR" },
  { name: "France", dial_code: "+33", code: "FR", currency: "EUR" },
  { name: "Italy", dial_code: "+39", code: "IT", currency: "EUR" },
  { name: "Spain", dial_code: "+34", code: "ES", currency: "EUR" },
  { name: "Netherlands", dial_code: "+31", code: "NL", currency: "EUR" },
  { name: "Belgium", dial_code: "+32", code: "BE", currency: "EUR" },
  { name: "Portugal", dial_code: "+351", code: "PT", currency: "EUR" },
  { name: "Finland", dial_code: "+358", "code": "FI", "currency": "EUR" },
  { name: "Ireland", dial_code: "+353", "code": "IE", "currency": "EUR" },
  { name: "Greece", dial_code: "+30", "code": "GR", "currency": "EUR" },
  { name: "Austria", dial_code: "+43", "code": "AT", "currency": "EUR" },
  { name: "Sweden", dial_code: "+46", "code": "SE", "currency": "SEK" },
  { name: "Norway", dial_code: "+47", "code": "NO", "currency": "NOK" },
  { name: "Denmark", dial_code: "+45", "code": "DK", "currency": "DKK" },
  { name: "Switzerland", dial_code: "+41", "code": "CH", "currency": "CHF" },
  { name: "Bangladesh", dial_code: "+880", "code": "BD", "currency": "BDT" },
  { name: "Pakistan", dial_code: "+92", "code": "PK", "currency": "PKR" },
  { name: "Sri Lanka", dial_code: "+94", "code": "LK", "currency": "LKR" },
  { name: "Nepal", dial_code: "+977", "code": "NP", "currency": "NPR" },
  { name: "Myanmar", dial_code: "+95", "code": "MM", "currency": "MMK" },
  { name: "Singapore", dial_code: "+65", "code": "SG", "currency": "SGD" },
  { name: "Malaysia", dial_code: "+60", "code": "MY", "currency": "MYR" },
  { name: "Thailand", dial_code: "+66", "code": "TH", "currency": "THB" },
  { name: "Indonesia", dial_code: "+62", "code": "ID", "currency": "IDR" },
  { name: "Vietnam", dial_code: "+84", "code": "VN", "currency": "VND" },
  { name: "Philippines", dial_code: "+63", "code": "PH", "currency": "PHP" },
  { name: "South Korea", dial_code: "+82", "code": "KR", "currency": "KRW" },
  { name: "Japan", dial_code: "+81", "code": "JP", "currency": "JPY" },
  { name: "Hong Kong", dial_code: "+852", "code": "HK", "currency": "HKD" },
  { name: "China", dial_code: "+86", "code": "CN", "currency": "CNY" },
  { name: "Nigeria", dial_code: "+234", "code": "NG", "currency": "NGN" },
  { name: "Kenya", dial_code: "+254", "code": "KE", "currency": "KES" }
].sort((a, b) => a.name.localeCompare(b.name));

export const currencySymbols: { [key: string]: string } = {
  'INR': '₹', 'USD': '$', 'GBP': '£', 'CAD': '$', 'AUD': '$', 'EUR': '€', 'JPY': '¥', 
  'BRL': 'R$', 'ZAR': 'R', 'AFN': '؋', 'CNY': '¥', 'RUB': '₽', 'AED': 'د.إ', 'SAR': '﷼',
  'QAR': '﷼', 'OMR': '﷼', 'KWD': 'د.ك', 'EGP': '£', 'SEK': 'kr', 'NOK': 'kr', 'DKK': 'kr',
  'CHF': 'CHF', 'BDT': '৳', 'PKR': '₨', 'LKR': '₨', 'NPR': '₨', 'MMK': 'K', 'SGD': '$',
  'MYR': 'RM', 'THB': '฿', 'IDR': 'Rp', 'VND': '₫', 'PHP': '₱', 'KRW': '₩', 'HKD': '$',
  'NGN': '₦', 'KES': 'KSh', 'NZD': '$'
};
