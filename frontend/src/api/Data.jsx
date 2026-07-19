// 1. Array containing your mock transaction data points
const mockRecords = [
  // ================= FEBRUARY 2025 =================
  {
    id: 1739523600000,
    category: "Rent & Mortgage",
    reason: "Apartment Rent",
    expense: 12000,
    income: 0,
    hashtags: ["rent", "housing"],
    date: 14,
    month: 2,
    year: 2025,
    type: "record"
  },
  {
    id: 1739869200000,
    category: "Shopping & Clothes",
    reason: "New Sneakers",
    expense: 2499,
    income: 0,
    hashtags: ["shoes", "nike"],
    date: 18,
    month: 2,
    year: 2025,
    type: "record"
  },

  // ================= MAY 2025 =================
  {
    id: 1746090000000,
    category: "Monthly Salary",
    reason: "Company Base Pay",
    expense: 0,
    income: 45000,
    hashtags: ["salary", "job"],
    date: 1,
    month: 5,
    year: 2025,
    type: "record"
  },
  {
    id: 1747386000000,
    category: "Utilities & Bills",
    reason: "Electricity Bill",
    expense: 1850,
    income: 0,
    hashtags: ["power", "bills"],
    date: 16,
    month: 5,
    year: 2025,
    type: "record"
  },

  // ================= DECEMBER 2025 =================
  {
    id: 1766653200000,
    category: "Entertainment & Gaming",
    reason: "Steam Winter Sale Games",
    expense: 1400,
    income: 0,
    hashtags: ["gaming", "steam"],
    date: 20,
    month: 12,
    year: 2025,
    type: "record"
  },
  {
    id: 1767171600000,
    category: "Food & Dining",
    reason: "New Year Eve Party Dinner",
    expense: 3500,
    income: 0,
    hashtags: ["party", "2026"],
    date: 31,
    month: 12,
    year: 2025,
    type: "record"
  },

  // ================= MARCH 2026 =================
  {
    id: 1773046800000,
    category: "Medical & Healthcare",
    reason: "Dental Checkup & Cleaning",
    expense: 1200,
    income: 0,
    hashtags: ["dentist", "health"],
    date: 8,
    month: 3,
    year: 2026,
    type: "record"
  },
  {
    id: 1774429200000,
    category: "Side Hustle & Sales",
    reason: "Sold Old Bicycle",
    expense: 0,
    income: 3000,
    hashtags: ["olx", "cash"],
    date: 24,
    month: 3,
    year: 2026,
    type: "record"
  },

  // ================= JULY 2026 (Current Period) =================
  {
    id: 1782877200000,
    category: "Subscriptions & SaaS",
    reason: "Netflix & Spotify Premium",
    expense: 849,
    income: 0,
    hashtags: ["ott", "music"],
    date: 1,
    month: 7,
    year: 2026,
    type: "record"
  },
  {
    id: 1783741200000,
    category: "Transportation & Fuel",
    reason: "Petrol Tank Full",
    expense: 1100,
    income: 0,
    hashtags: ["fuel", "bike"],
    date: 11,
    month: 7,
    year: 2026,
    type: "record"
  }
];

// 2. Complete 1-indexed mapped string dictionary lookup object for month numbers
const monthNames = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December"
};

// 3. Export both elements together inside a unified clean JavaScript structure object 
const Data = {
  data: mockRecords,
  monthNames: monthNames
};

export default Data;
