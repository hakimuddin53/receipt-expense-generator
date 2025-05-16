import { Receipt as ReceiptType } from "@/types/receipt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Receipt, Calendar, Building, Tag } from "lucide-react";

interface ExpenseDetailsProps {
  receipt: ReceiptType | null;
  isLoading: boolean;
}

const ExpenseDetails = ({ receipt, isLoading }: ExpenseDetailsProps) => {
  if (!receipt && !isLoading) {
    return (
      <Card className="shadow-md h-full">
        <CardHeader className="bg-receipt-primary text-white py-4">
          <CardTitle className="text-lg font-medium">Expense Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex items-center justify-center h-[400px]">
          <div className="text-center text-gray-500">
            <Receipt className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-1">No Receipt Data</h3>
            <p>Upload a receipt to see extracted details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-receipt-primary text-white py-4">
        <CardTitle className="text-lg font-medium">Expense Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {isLoading ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/3" />
              <Skeleton className="h-8 w-full" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-10 w-1/3 ml-auto" />
            </div>
          </div>
        ) : receipt ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-2">
                <Building className="mr-2 h-4 w-4 text-receipt-primary" />
                <span className="text-sm text-gray-500">Merchant</span>
              </div>
              <p className="text-lg font-medium">{receipt.merchant}</p>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-4 w-4 text-receipt-primary" />
                <span className="text-sm text-gray-500">Date</span>
              </div>
              <p className="text-lg font-medium">{receipt.date}</p>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <Tag className="mr-2 h-4 w-4 text-receipt-primary" />
                <span className="text-sm text-gray-500">Category</span>
              </div>
              <p className="text-lg font-medium">{receipt.category}</p>
            </div>
            
            {receipt.items && receipt.items.length > 0 && (
              <div>
                <h3 className="text-sm text-gray-500 mb-2">Items</h3>
                <div className="space-y-2">
                  {receipt.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} (x{item.quantity})</span>
                      <span>RM {item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold text-receipt-primary">
                RM {receipt.total.toFixed(2)}
              </span>
            </div>
            
            {receipt.tax !== undefined && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax</span>
                <span>RM {receipt.tax.toFixed(2)}</span>
              </div>
            )}
            
            {receipt.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium mb-1">Notes</h3>
                <p className="text-sm text-gray-600">{receipt.notes}</p>
              </div>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ExpenseDetails;
