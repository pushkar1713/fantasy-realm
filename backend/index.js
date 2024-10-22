import express from "express";
import { main } from "./db.js";
import cors from "cors";
import { User, Team, Players } from "./db.js";
import { z } from "zod";

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

  res.json({
    msg: "user successfully created",
  });
});

const signinBody = z.object({
  email: z.string().email,
  password: z.string().min(6),
});

app.post("/user/login", async (req, res) => {
  const data = signinBody.safeParse(req.body);
  if (!data.success) {
    return res.status(411).json({
      msg: "incorrect inputs",
    });
  }
  const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (existingUser) {
    return res.json({
      msg: "login successfull",
    });
  }

  return res.status(401).json({
    msg: "error occured",
  });
});

app.get("/", async (req, res) => {
  const data = await Players.find();
  res.json(data);
});

app.listen(3000);
