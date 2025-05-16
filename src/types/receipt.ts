
export interface Receipt {
  id: string;
  merchant: string;
  date: string;
  total: number;
  currency: string;
  category: string;
  items?: ReceiptItem[];
  tax?: number;
  notes?: string;
  status?: 'pending' | 'approved' | 'reimbursed' | 'rejected';
  paymentMethod?: string;
  reimbursable?: boolean;
  tags?: string[];
}

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface ExpenseFilter {
  startDate?: Date;
  endDate?: Date;
  categories?: string[];
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
  status?: string[];
}

export interface BudgetCategory {
  id: string;
  name: string;
  budgeted: number;
  spent: number;
  color: string;
}
