import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Shield, LogOut, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Team {
  id: number;
  name: string;
}

interface Player {
  id: number;
  name: string;
  battingAverage: number;
  bowlingAverage: number;
  runs: number;
  wickets: number;
}

interface TeamDetails extends Team {
  players: Player[];
}

interface User {
  username: string;
  email: string;
  imageUrl: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamDetails | null>(null);

  useEffect(() => {
    // Simulating user data fetch
    setUser({
      username: "cricket_fan_2024",
      email: "fan@example.com",
      imageUrl: "https://i.pravatar.cc/150?img=68",
    });

    // Simulating teams data fetch
    setTeams([
      { id: 1, name: "Dream Team XI" },
      { id: 2, name: "Super Strikers" },
      { id: 3, name: "Royal Challengers" },
    ]);
  }, []);

  const fetchTeamDetails = async (teamId: number) => {
    // Simulating API call to fetch team details
    const mockPlayers: Player[] = [
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
    ];

    const teamDetails: TeamDetails = {
      id: teamId,
      name: teams.find((team) => team.id === teamId)?.name || "Unknown Team",
      players: mockPlayers,
    };

    setSelectedTeam(teamDetails);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <header className="container mx-auto max-w-6xl px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" to="/">
          <Shield className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold">FantasyRealm</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </nav>
      </header>
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={user.imageUrl}
              alt={user.username}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Your Teams</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Team Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fetchTeamDetails(team.id)}
                      >
                        View <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{selectedTeam?.name}</DialogTitle>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Batting Average</TableHead>
                            <TableHead>Bowling Average</TableHead>
                            <TableHead>Runs</TableHead>
                            <TableHead>Wickets</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedTeam?.players.map((player) => (
                            <TableRow key={player.id}>
                              <TableCell>{player.name}</TableCell>
                              <TableCell>
                                {player.battingAverage.toFixed(2)}
                              </TableCell>
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
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
