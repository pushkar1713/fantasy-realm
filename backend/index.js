import express from "express";
import { main } from "./db.js";
import cors from "cors";
import { User, Team, Players } from "./db.js";
import { z } from "zod";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
app.use(cors());
main();

const signupBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string(),
});

app.post("/user/signup", async (req, res) => {
  const data = signupBody.safeParse(req.body);
  if (!data.success) {
    return res.status(411).json({
      msg: "incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      msg: "username already taken",
    });
  }

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const token = jwt.sign(
    {
      userId: user.id,
    },
    "jwtsecret"
  );

  res.json({
    msg: "user successfully created",
    token: token,
    userId: user.id,
  });
});

const signinBody = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

app.post("/user/signin", async (req, res) => {
  const data = signinBody.safeParse(req.body);
  if (!data.success) {
    return res.status(411).json({
      msg: "incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (existingUser) {
    try {
      const token = jwt.sign(
        {
          userId: existingUser.id,
        },
        "jwtsecret"
      );
      return res.json({
        msg: "login successfull",
        token: token,
        userId: existingUser.id,
      });
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        msg: "error occured",
      });
    }
  }
});

const teamBody = z.object({
  teamName: z.string(),
  user_id: z.string().min(1), // Ensuring userId is passed
  players: z
    .array(
      z.object({
        // Assuming Player schema has some fields like name, position
        id: z.string(),
        name: z.string(),
        battingAverage: z.number(),
        bowlingAverage: z.number(),
        wickets: z.number(),
        runs: z.number(),
      })
    )
    .nonempty(), // Ensuring players array is not empty
});

app.post("/teams", async (req, res) => {
  const data = teamBody.safeParse(req.body);

  if (!data.success) {
    return res.status(400).json({
      msg: "Invalid input",
      error: data.error.errors,
    });
  }

  const { teamName, user_id, players } = req.body;
  try {
    const team = await Team.create({
      teamName: teamName,
      user_id: user_id,
      players: players,
    });
    res.status(201).json({
      msg: "Team successfully created",
      team,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Server error",
      error: error.message,
    });
  }
});

app.get("/userDetails", async (req, res) => {
  try {
    const userId = req.query.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    return res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/teams", async (req, res) => {
  try {
    const userId = req.query.userId;
    const teams = await Team.find({
      user_id: userId,
    });
    if (!teams) {
      return res.status(404).json({ message: "teams not found" });
    }

    // Return user data
    return res.json(teams);
  } catch (error) {
    console.error("Error fetching teams details:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/teams/:id", async (req, res) => {
  try {
    const teamId = req.params.id;
    const teams = await Team.findById(teamId);
    if (!teams) {
      return res.status(404).json({ message: "team not found" });
    }

    return res.json(teams);
  } catch (error) {
    console.error("Error fetching teams details:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.get("/players", async (req, res) => {
  const data = await Players.find();
  res.json(data);
});

app.listen(3000);
