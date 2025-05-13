
import { useState } from "react";
import ReceiptUploader from "@/components/ReceiptUploader";
import ReceiptPreview from "@/components/ReceiptPreview";
import ExpenseDetails from "@/components/ExpenseDetails";
import { useToast } from "@/components/ui/use-toast";
import { Receipt } from "@/types/receipt";
import { analyzeReceipt } from "@/services/receiptService";

const Index = () => {
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [expenseData, setExpenseData] = useState<Receipt | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    try {
      setReceipt(file);
      const imageUrl = URL.createObjectURL(file);
      setReceiptUrl(imageUrl);
      setIsAnalyzing(true);
      setExpenseData(null);
      
      // Analyze the receipt
      const data = await analyzeReceipt(file);
      setExpenseData(data);
      
      toast({
        title: "Receipt analyzed successfully",
        description: "We've extracted the details from your receipt.",
      });
    } catch (error) {
      console.error("Error processing receipt:", error);
      toast({
        variant: "destructive",
        title: "Error analyzing receipt",
        description: "There was a problem analyzing your receipt. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetUpload = () => {
    setReceipt(null);
    setReceiptUrl(null);
    setExpenseData(null);
    if (receiptUrl) {
      URL.revokeObjectURL(receiptUrl);
    }
  };

  return (
    <div className="min-h-screen bg-receipt-background">
      <header className="py-6 border-b border-gray-200 bg-white">
        <div className="container">
          <h1 className="text-3xl font-bold text-receipt-primary">Receipt Scanner</h1>
          <p className="text-gray-600">Upload a receipt to extract expense details</p>
        </div>
      </header>
      
      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <ReceiptUploader 
              onFileUpload={handleFileUpload} 
              onReset={resetUpload}
              hasFile={!!receipt}
            />
            
            {receiptUrl && (
              <ReceiptPreview 
                imageUrl={receiptUrl} 
                isAnalyzing={isAnalyzing}
              />
            )}
          </div>
          
          <div>
            <ExpenseDetails 
              receipt={expenseData} 
              isLoading={isAnalyzing}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
