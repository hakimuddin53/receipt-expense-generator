
import { Receipt, ReceiptItem } from "@/types/receipt";

// Categories for the mock data
const categories = [
  "Groceries",
  "Dining",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Office Supplies",
  "Travel",
  "Healthcare",
  "Education",
];

// Mock merchants for the different categories
const merchants: Record<string, string[]> = {
  "Groceries": ["Whole Foods", "Trader Joe's", "Safeway", "Kroger", "Costco"],
  "Dining": ["Starbucks", "Chipotle", "Olive Garden", "McDonald's", "Subway"],
  "Transportation": ["Uber", "Lyft", "Chevron", "Shell", "76"],
  "Utilities": ["AT&T", "Comcast", "PG&E", "Verizon", "Sprint"],
  "Entertainment": ["Netflix", "AMC Theaters", "Spotify", "Amazon Prime", "Hulu"],
  "Office Supplies": ["Staples", "Office Depot", "Best Buy", "Apple Store", "Microsoft Store"],
  "Travel": ["Marriott", "Hilton", "Airbnb", "United Airlines", "Delta"],
  "Healthcare": ["CVS", "Walgreens", "Kaiser", "Blue Shield", "Anthem"],
  "Education": ["Barnes & Noble", "Chegg", "Coursera", "Udemy", "Amazon Books"],
};

// Sample items for each category
const items: Record<string, string[]> = {
  "Groceries": ["Milk", "Bread", "Eggs", "Apples", "Bananas", "Chicken", "Rice", "Pasta", "Cereal"],
  "Dining": ["Coffee", "Sandwich", "Salad", "Burger", "Pizza", "Pasta", "Soda", "Dessert"],
  "Transportation": ["Gasoline", "Ride", "Car Wash", "Toll", "Parking"],
  "Utilities": ["Monthly Service", "Installation", "Data Plan", "Equipment Rental"],
  "Entertainment": ["Subscription", "Movie Ticket", "Concert Ticket", "Game", "Rental"],
  "Office Supplies": ["Paper", "Ink", "Pens", "Stapler", "Notebook", "Computer", "Printer"],
  "Travel": ["Hotel Room", "Flight", "Rental Car", "Taxi", "Meal", "Baggage Fee"],
  "Healthcare": ["Prescription", "Co-pay", "Vitamins", "First Aid", "Over-The-Counter"],
  "Education": ["Textbook", "Tuition", "Course Fee", "School Supplies", "Software License"],
};

// Helper to generate random items
function generateRandomItems(category: string, count: number): ReceiptItem[] {
  const result: ReceiptItem[] = [];
  const categoryItems = items[category] || items["Office Supplies"];
  
  for (let i = 0; i < count; i++) {
    const name = categoryItems[Math.floor(Math.random() * categoryItems.length)];
    const quantity = Math.floor(Math.random() * 3) + 1;
    const price = +(Math.random() * 20 + 1).toFixed(2);
    const total = +(price * quantity).toFixed(2);
    
    result.push({
      id: `item-${i}`,
      name,
      quantity,
      price,
      total,
    });
  }
  
  return result;
}

export const analyzeReceipt = async (file: File): Promise<Receipt> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate random receipt data
  const category = categories[Math.floor(Math.random() * categories.length)];
  const merchantList = merchants[category] || merchants["Office Supplies"];
  const merchant = merchantList[Math.floor(Math.random() * merchantList.length)];
  
  // Generate random date within last 30 days
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Generate random items
  const itemCount = Math.floor(Math.random() * 5) + 1;
  const generatedItems = generateRandomItems(category, itemCount);
  
  // Calculate total
  const subtotal = generatedItems.reduce((sum, item) => sum + item.total, 0);
  const tax = +(subtotal * 0.0825).toFixed(2); // Assuming 8.25% tax rate
  const total = +(subtotal + tax).toFixed(2);
  
  // Generate receipt
  const receipt: Receipt = {
    id: `receipt-${Date.now()}`,
    merchant,
    date: formattedDate,
    total,
    currency: "$",
    category,
    items: generatedItems,
    tax,
    notes: Math.random() > 0.7 ? "Business expense" : undefined,
  };
  
  return receipt;
};
