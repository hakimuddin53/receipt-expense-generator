
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Receipt } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login - replace with actual authentication when connected to a backend
      setTimeout(() => {
        // This is just a mockup login logic
        if (email && password) {
          localStorage.setItem("isLoggedIn", "true");
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          navigate("/");
        } else {
          toast({
            title: "Login failed",
            description: "Please check your credentials and try again.",
            variant: "destructive",
          });
        }
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "An error occurred during login.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center auth-page">
      <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />
      
      <Card className="w-full max-w-md shadow-xl relative z-10 border border-purple-100 dark:border-purple-900 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-primary" />
        
        <div className="relative pt-8 flex justify-center">
          <div className="bg-gradient-to-b from-primary/20 to-primary/5 rounded-full p-4 shadow-lg">
            <Receipt className="h-10 w-10 text-primary animate-pulse-scale" />
          </div>
        </div>
        
        <CardHeader className="space-y-1 relative text-center pt-4">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-700 bg-clip-text text-transparent">
            Login to Receipt Scanner
          </CardTitle>
          <CardDescription>
            Enter your credentials to sign in to your account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 relative p-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/70 dark:bg-black/20 border-purple-100 dark:border-purple-900"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="px-0 text-xs text-primary" onClick={() => toast({ title: "Password reset", description: "This feature will be available soon." })}>
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/70 dark:bg-black/20 border-purple-100 dark:border-purple-900"
                required
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 relative p-6 pt-0">
            <Button 
              type="submit" 
              className="w-full gradient-button text-white shadow-lg hover:shadow-primary/25" 
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Button variant="link" className="p-0 text-primary" onClick={() => toast({ title: "Registration", description: "Registration will be available soon." })}>
                Sign up
              </Button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
