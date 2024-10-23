import { Button } from "@/components/ui/button";
import { Shield, Users, BarChart2, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center justify-center" to="#">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">FantasyRealm</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button asChild>
            <Link to={"/signin"}>Login</Link>
          </Button>
          <Link to="#" className="text-sm font-medium hover:text-primary">
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center justify-center">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Create Your Ultimate Fantasy Team
                  </h1>
                  <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                    Build, manage, and compete with your dream team in
                    FantasyRealm. Unleash your strategic skills and climb to the
                    top of the leaderboards!
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-50" />
                  <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-center bg-cover opacity-20" />
                    <div className="relative p-4 flex flex-col items-center justify-center h-full text-center">
                      <Users className="w-16 h-16 mb-4 text-primary" />
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Your Fantasy Team Awaits
                      </h3>
                      <p className="text-gray-400">
                        Assemble players, conquer realms, become a legend
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12">
              Key Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <Users className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Team Management</h3>
                <p className="text-muted-foreground">
                  Create and customize your fantasy team with a diverse roster
                  of players.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <BarChart2 className="w-12 h-12 mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Player Statistics</h3>
                <p className="text-muted-foreground">
                  View detailed stats of players to make informed decisions for
                  your team.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex items-center justify-center py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join FantasyRealm Today
                </h2>
                <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your journey to become a legendary team manager. Sign up
                  now and receive exclusive in-game bonuses!
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Link to={"/signup"}>
                  <Button className="w-full" type="submit">
                    Sign Up
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" to="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © 2024 FantasyRealm. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
