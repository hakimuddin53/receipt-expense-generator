
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ReceiptPreviewProps {
  imageUrl: string;
  isLoading: boolean;
}

const ReceiptPreview = ({ imageUrl, isLoading }: ReceiptPreviewProps) => {
  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="bg-receipt-primary text-white py-4">
        <CardTitle className="text-lg font-medium">Receipt Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-4 relative">
        <div className="aspect-[3/4] w-full relative rounded-md overflow-hidden">
          <img 
            src={imageUrl} 
            alt="Receipt preview" 
            className="w-full h-full object-contain" 
          />
          
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center">
                <div className="mb-2 w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center animate-pulse">
                  <div className="w-6 h-6 bg-receipt-primary rounded-full" />
                </div>
                <p className="text-white font-medium">Analyzing receipt...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReceiptPreview;
