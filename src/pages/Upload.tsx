
import { useState } from "react";
import { Receipt } from "@/types/receipt";
import { extractReceiptData } from "@/services/receiptService";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ReceiptUploader from "@/components/ReceiptUploader";
import ReceiptPreview from "@/components/ReceiptPreview";
import ExpenseDetails from "@/components/ExpenseDetails";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Upload = () => {
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

  const handleReset = () => {
    setReceiptImage(null);
    setReceipt(null);
    setIsLoading(false);
  };

  const handleSave = () => {
    toast({
      title: "Expense saved",
      description: "Your expense has been successfully saved"
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto max-w-5xl space-y-6 animate-fade-in">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate("/")}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">
            Add Expense
          </h1>
          <p className="text-muted-foreground">Upload a receipt to quickly extract expense information</p>
        </div>
      </div>
      
      <Card className="border border-purple-100 dark:border-purple-900 overflow-hidden shadow-lg">
        <CardHeader className="bg-accent/50">
          <CardTitle>Receipt Scanner</CardTitle>
          <CardDescription>Upload your receipt to get started</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <ReceiptUploader 
                onFileUpload={handleFileUpload} 
                onReset={handleReset} 
                hasFile={!!receiptImage} 
              />
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
          
          {receipt && (
            <div className="mt-6 flex justify-end space-x-3">
              <Button variant="outline" onClick={handleReset}>Cancel</Button>
              <Button 
                onClick={handleSave}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Save Expense
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Upload;
