import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type userInfo = {
  email: string;
  password: string;
};

const defaultValue: userInfo = {
  email: "",
  password: "",
};

export default function SignInPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<userInfo>(defaultValue);
  console.log(user);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signin",
        user
      );

      const token = response.data.token;
      const userId = response.data.userId;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      console.log("User signed in successfully");
      navigate("/home");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <header className="container mx-auto max-w-6xl px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" to="/">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">FantasyRealm</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild variant="outline">
            <Link to="/">Back to Landing Page</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-sm space-y-6 px-4 py-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Sign In to Your Account</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Welcome back to FantasyRealm
            </p>
          </div>
          <form className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </div>
            <Button className="w-full" type="submit" onClick={handleSubmit}>
              Sign In
            </Button>
          </form>
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              <Link className="hover:underline" to="#">
                Forgot your password?
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link className="font-medium text-primary hover:underline" to="#">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <div className="border-t">
        <footer className="py-6 w-full">
          <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © 2024 FantasyRealm. All rights reserved.
            </p>
            <nav className="flex gap-4 sm:gap-6 mt-2 sm:mt-0">
              <Link
                className="text-xs hover:underline underline-offset-4"
                to="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-xs hover:underline underline-offset-4"
                to="#"
              >
                Privacy
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
