
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { UserCircle } from "lucide-react";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto max-w-2xl space-y-8 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information and account settings.</p>
      </div>
      
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary">
            <UserCircle className="w-16 h-16 text-primary" />
          </div>
          <span className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">+</span>
        </div>
      </div>
      
      <Card className="border border-purple-100 dark:border-purple-900 overflow-hidden shadow-lg">
        <CardHeader className="bg-accent/50">
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details here</CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/70 dark:bg-black/20 border-purple-100 dark:border-purple-900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/70 dark:bg-black/20 border-purple-100 dark:border-purple-900"
              />
            </div>
          </CardContent>
          <CardFooter className="bg-accent/30 px-6 py-4">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="gradient-button text-white"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
