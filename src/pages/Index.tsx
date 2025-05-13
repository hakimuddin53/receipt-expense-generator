
import ReceiptUploader from "@/components/ReceiptUploader";
import ReceiptPreview from "@/components/ReceiptPreview";
import ExpenseDetails from "@/components/ExpenseDetails";
import { useState } from "react";
import { Receipt } from "@/types/receipt";
import { extractReceiptData } from "@/services/receiptService";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UploadCloud } from "lucide-react";

const Index = () => {
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Receipt Scanner Dashboard</h1>
        <Button onClick={() => navigate("/upload")}>
          <UploadCloud className="mr-2 h-4 w-4" />
          New Receipt
        </Button>
      </div>
      
      {!receipt ? (
        <div className="grid place-items-center py-12">
          <div className="text-center max-w-md space-y-4">
            <h2 className="text-xl font-semibold">Welcome to Receipt Scanner</h2>
            <p className="text-muted-foreground">
              Upload a receipt to get started. We'll analyze it and provide expense details.
            </p>
            <Button onClick={() => navigate("/upload")}>
              <UploadCloud className="mr-2 h-4 w-4" />
              Upload Receipt
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            {receiptImage && (
              <ReceiptPreview imageUrl={receiptImage} isLoading={isLoading} />
            )}
          </div>
          <div>
            {receipt && <ExpenseDetails receipt={receipt} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
