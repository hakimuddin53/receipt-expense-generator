
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
}

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}
