import mongoose from "mongoose";

export const main = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pushkar1713:cUHs92AswtTclzXK@cluster0.w6lkxlt.mongodb.net/pdt"
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1); // Exit the process with failure if connection fails
  }
};

const PlayerSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  battingAverage: {
    type: Number,
    required: true,
  },
  bowlingAverage: {
    type: Number,
    required: true,
  },
  wickets: {
    type: Number,
    required: true,
  },
  runs: {
    type: Number,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxLength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 5,
    maxLength: 30,
  },
});

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  players: [PlayerSchema],
});

export const User = mongoose.model("User", userSchema);
export const Team = mongoose.model("Team", teamSchema);
