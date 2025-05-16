
import { Receipt } from "@/types/receipt";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Building, Calendar, ReceiptIcon, Tag } from "lucide-react";

// Sample data for recent expenses
const recentExpenses: Receipt[] = [
  {
    id: "rec-001",
    merchant: "Whole Foods",
    date: "May 15, 2025",
    total: 82.47,
    currency: "$",
    category: "Groceries",
    tax: 7.25
  },
  {
    id: "rec-002",
    merchant: "Starbucks",
    date: "May 14, 2025",
    total: 12.35,
    currency: "$",
    category: "Dining",
    tax: 1.08
  },
  {
    id: "rec-003",
    merchant: "Uber",
    date: "May 13, 2025",
    total: 24.50,
    currency: "$",
    category: "Transportation",
    tax: 1.95
  },
  {
    id: "rec-004",
    merchant: "Amazon",
    date: "May 10, 2025",
    total: 67.99,
    currency: "$",
    category: "Shopping",
    tax: 5.99
  },
  {
    id: "rec-005",
    merchant: "Netflix",
    date: "May 1, 2025",
    total: 14.99,
    currency: "$",
    category: "Entertainment",
    tax: 0.00
  }
];

// Category badge colors
const categoryColors: Record<string, string> = {
  "Groceries": "bg-primary/10 text-primary",
  "Dining": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  "Transportation": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  "Shopping": "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  "Entertainment": "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  "Utilities": "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
};

const RecentExpenses = () => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">Merchant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentExpenses.map((expense) => (
            <TableRow key={expense.id} className="hover:bg-muted/50">
              <TableCell className="font-medium flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Building className="h-4 w-4 text-primary" />
                </div>
                {expense.merchant}
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                {expense.date}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category] || "bg-gray-100 text-gray-600"}`}>
                  {expense.category}
                </span>
              </TableCell>
              <TableCell className="text-right font-medium">
                {expense.currency}{expense.total.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentExpenses;
