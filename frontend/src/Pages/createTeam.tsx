import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, LogOut, User } from "lucide-react";
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

const availablePlayers: Player[] = [
  {
    id: 1,
    name: "Virat Kohli",
    battingAverage: 53.5,
    bowlingAverage: 0,
    runs: 12169,
    wickets: 4,
  },
  {
    id: 2,
    name: "Jasprit Bumrah",
    battingAverage: 3.5,
    bowlingAverage: 21.9,
    runs: 42,
    wickets: 128,
  },
  {
    id: 3,
    name: "Rohit Sharma",
    battingAverage: 48.6,
    bowlingAverage: 0,
    runs: 9283,
    wickets: 8,
  },
  {
    id: 4,
    name: "Ravindra Jadeja",
    battingAverage: 36.2,
    bowlingAverage: 24.3,
    runs: 2523,
    wickets: 242,
  },
  {
    id: 5,
    name: "KL Rahul",
    battingAverage: 45.1,
    bowlingAverage: 0,
    runs: 1831,
    wickets: 0,
  },
  {
    id: 6,
    name: "Hardik Pandya",
    battingAverage: 29.9,
    bowlingAverage: 41.3,
    runs: 1386,
    wickets: 54,
  },
  {
    id: 7,
    name: "Rishabh Pant",
    battingAverage: 43.3,
    bowlingAverage: 0,
    runs: 1920,
    wickets: 0,
  },
  {
    id: 8,
    name: "Ravichandran Ashwin",
    battingAverage: 27.7,
    bowlingAverage: 24.3,
    runs: 2685,
    wickets: 442,
  },
  {
    id: 9,
    name: "Shikhar Dhawan",
    battingAverage: 45.1,
    bowlingAverage: 0,
    runs: 6105,
    wickets: 0,
  },
  {
    id: 10,
    name: "Mohammed Shami",
    battingAverage: 11.6,
    bowlingAverage: 27.6,
    runs: 523,
    wickets: 216,
  },
  {
    id: 11,
    name: "Cheteshwar Pujara",
    battingAverage: 43.9,
    bowlingAverage: 0,
    runs: 6792,
    wickets: 0,
  },
];

export default function CreateTeamPage() {
  const [teamName, setTeamName] = useState("");
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

  const handleAddPlayer = (player: Player) => {
    if (
      selectedPlayers.length < 10 &&
      !selectedPlayers.some((p) => p.id === player.id)
    ) {
      setSelectedPlayers([...selectedPlayers, player]);
    }
  };

  const handleRemovePlayer = (playerId: number) => {
    setSelectedPlayers(selectedPlayers.filter((p) => p.id !== playerId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the team data to your backend
    console.log("Team created:", { name: teamName, players: selectedPlayers });
    // Reset form or redirect user
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <header className="container mx-auto max-w-6xl px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" to="/">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">FantasyRealm</span>
        </Link>
        <nav className="flex items-center gap-4">
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
        <h1 className="text-3xl font-bold mb-6">Create Your Team</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="teamName">Team Name</Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Selected Players ({selectedPlayers.length}/10)
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemovePlayer(player.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Available Players</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Batting Avg</TableHead>
                  <TableHead>Bowling Avg</TableHead>
                  <TableHead>Runs</TableHead>
                  <TableHead>Wickets</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {availablePlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>{player.name}</TableCell>
                    <TableCell>{player.battingAverage.toFixed(2)}</TableCell>
                    <TableCell>
                      {player.bowlingAverage > 0
                        ? player.bowlingAverage.toFixed(2)
                        : "N/A"}
                    </TableCell>
                    <TableCell>{player.runs}</TableCell>
                    <TableCell>{player.wickets}</TableCell>
                    <TableCell>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleAddPlayer(player)}
                        disabled={
                          selectedPlayers.length >= 10 ||
                          selectedPlayers.some((p) => p.id === player.id)
                        }
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Button
            type="submit"
            disabled={selectedPlayers.length === 0 || teamName.trim() === ""}
          >
            Create Team
          </Button>
        </form>
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
