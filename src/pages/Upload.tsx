
import ReceiptUploader from "@/components/ReceiptUploader";
import ReceiptPreview from "@/components/ReceiptPreview";
import ExpenseDetails from "@/components/ExpenseDetails";
import { useState } from "react";
import { Receipt } from "@/types/receipt";
import { extractReceiptData } from "@/services/receiptService";
import { toast } from "@/hooks/use-toast";

const Upload = () => {
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

  return (
    <div className="container mx-auto max-w-5xl space-y-8">
      <h1 className="text-3xl font-bold">Upload Receipt</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ReceiptUploader onFileUpload={handleFileUpload} />
          {receiptImage && (
            <ReceiptPreview imageUrl={receiptImage} isLoading={isLoading} />
          )}
        </div>
        <div>
          {receipt && <ExpenseDetails receipt={receipt} />}
        </div>
      </div>
    </div>
  );
};

export default Upload;
