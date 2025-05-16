
import ReceiptUploader from "@/components/ReceiptUploader";
import ReceiptPreview from "@/components/ReceiptPreview";
import ExpenseDetails from "@/components/ExpenseDetails";
import { useState } from "react";
import { Receipt } from "@/types/receipt";
import { extractReceiptData } from "@/services/receiptService";
import { toast } from "@/hooks/use-toast";
import { ReceiptIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setReceiptImage(URL.createObjectURL(file));
    
    try {
      // This is mocked and would be replaced with a real API call
      const data = await extractReceiptData(file);
      setReceipt(data);
      toast({
        title: "Receipt processed",
        description: "Successfully extracted receipt data"
      });
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "Failed to extract receipt data",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReceiptImage(null);
    setReceipt(null);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">
          Receipt Scanner Dashboard
        </h1>
        <p className="text-muted-foreground">Upload, scan, and manage your receipts in one place.</p>
      </div>
      
      {!receipt ? (
        <Card className="glass-card p-8 text-center">
          <div className="grid place-items-center py-12">
            <div className="max-w-md space-y-6">
              <div className="bg-primary/10 p-6 rounded-full inline-block mx-auto floating">
                <ReceiptIcon className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold">Welcome to Receipt Scanner</h2>
              <p className="text-muted-foreground">
                Upload a receipt to get started. We'll analyze it and provide expense details automatically.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="border border-purple-100 dark:border-purple-900 overflow-hidden shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="space-y-6">
                {receiptImage && (
                  <ReceiptPreview 
                    imageUrl={receiptImage} 
                    isLoading={isLoading} 
                  />
                )}
              </div>
              <div>
                {receipt && <ExpenseDetails receipt={receipt} isLoading={isLoading} />}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Index;
