
import { useState, useRef } from "react";
import { Upload, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ReceiptUploaderProps {
  onFileUpload: (file: File) => void;
  onReset: () => void;
  hasFile: boolean;
}

const ReceiptUploader = ({ onFileUpload, onReset, hasFile }: ReceiptUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        onFileUpload(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    if (hasFile) {
      onReset();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div 
          className={`
            flex flex-col items-center justify-center p-6 border-2 border-dashed 
            rounded-lg transition-colors cursor-pointer
            ${isDragging ? "border-receipt-primary bg-receipt-accent" : "border-gray-300"}
            ${hasFile ? "bg-gray-50" : "hover:bg-gray-50"}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !hasFile && fileInputRef.current?.click()}
        >
          <input 
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {hasFile ? (
            <div className="text-center">
              <div className="mb-4 w-16 h-16 mx-auto bg-receipt-accent rounded-full flex items-center justify-center">
                <Receipt className="h-8 w-8 text-receipt-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Receipt Uploaded</h3>
              <p className="text-gray-500 mb-4">Your receipt is being processed</p>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4 w-16 h-16 mx-auto bg-receipt-accent rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-receipt-primary" />
              </div>
              <h3 className="text-lg font-medium mb-1">Upload a Receipt</h3>
              <p className="text-gray-500 mb-4">Drag and drop or click to select</p>
              <p className="text-xs text-gray-400">Supported formats: JPEG, PNG, PDF</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button 
            variant={hasFile ? "destructive" : "default"}
            className={hasFile ? "" : "bg-receipt-primary hover:bg-receipt-secondary"}
            onClick={handleButtonClick}
          >
            {hasFile ? "Reset" : "Select Receipt"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiptUploader;
