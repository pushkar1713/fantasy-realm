import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import axios from "axios";

interface Decimal128 {
  $numberDecimal: string; // Representing the decimal number as a string
}

interface Team {
  _id: string; // Change to string for MongoDB ObjectId
  teamName: string;
}

interface Player {
  id: string; // Change to string to match MongoDB ObjectId format
  name: string;
  battingAverage: Decimal128;
  bowlingAverage: Decimal128;
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
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/userDetails?userId=${userId}`
        );

        setUser({
          username: response.data.username,
          email: response.data.email,
          imageUrl:
            "https://thumbs.dreamstime.com/b/vector-engraved-style-illustration-posters-decoration-p-vector-engraved-style-illustration-posters-decoration-129936369.jpg",
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchTeamData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/teams?userId=${userId}`
        );

        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    if (userId) {
      fetchProfileData();
      fetchTeamData();
    }
  }, [userId]);

  const fetchTeamDetails = async (teamId: string) => {
    try {
      const response = await axios.get(`http://localhost:3000/teams/${teamId}`);

      const players = response.data.players || [];

      const playersWithNumericAverages = players.map((player: Player) => ({
        ...player,
        battingAverage: Number(player.battingAverage?.$numberDecimal || 0),
        bowlingAverage: Number(player.bowlingAverage?.$numberDecimal || 0),
      }));

      const teamDetails: TeamDetails = {
        _id: teamId,
        teamName: response.data.teamName, // Assuming response.data contains teamName
        players: playersWithNumericAverages,
      };

      console.log(response.data.players);
      setSelectedTeam(teamDetails);
    } catch (error) {
      console.error("Error fetching team details:", error);
    }
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
              className="rounded-full w-24 h-24" // Fixed width and height
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
              <TableRow key={team._id}>
                <TableCell>{team.teamName}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => fetchTeamDetails(team._id)}
                      >
                        View <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{selectedTeam?.teamName}</DialogTitle>
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
                                {typeof player.battingAverage === "number"
                                  ? player.battingAverage
                                  : "N/A"}
                              </TableCell>
                              <TableCell>
                                {typeof player.bowlingAverage === "number" &&
                                player.bowlingAverage > 0
                                  ? player.bowlingAverage
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
