import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Shield, LogOut, UserPlus, User } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Player {
  id: number;
  name: string;
  battingAverage: number;
  bowlingAverage: number;
  runs: number;
  wickets: number;
}

export default function DashboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const getPlayers = async () => {
      console.log("About to fetch players...");
      try {
        const response = await axios.get("http://localhost:3000/players");

        // Transform the data to extract the decimal values
        const transformedPlayers = response.data.map((player: any) => ({
          id: player._id, // Use _id as the unique identifier
          name: player.name,
          battingAverage: parseFloat(player.battingAverage.$numberDecimal),
          bowlingAverage: parseFloat(player.bowlingAverage.$numberDecimal),
          runs: player.runs,
          wickets: player.wickets,
        }));

        setPlayers(transformedPlayers);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };
    getPlayers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <header className="container mx-auto max-w-6xl px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" to="/">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">FantasyRealm</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Create Team
          </Button>
          <Button variant="outline">
            <User className="h-4 w-4 mr-2" />
            Profile
          </Button>
          <Button variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </nav>
      </header>
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Players</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Serial No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Batting Average</TableHead>
                <TableHead>Bowling Average</TableHead>
                <TableHead>Runs</TableHead>
                <TableHead>Wickets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {players.map((player, index) => (
                <TableRow key={player.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">{player.name}</TableCell>
                  <TableCell>{player.battingAverage.toFixed(2)}</TableCell>
                  <TableCell>
                    {player.bowlingAverage > 0
                      ? player.bowlingAverage.toFixed(2)
                      : "N/A"}
                  </TableCell>
                  <TableCell>{player.runs}</TableCell>
                  <TableCell>{player.wickets}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
