import mongoose from "mongoose";

try {
  async function main() {
    await mongoose.connect(
      "mongodb+srv://pushkar1713:cUHs92AswtTclzXK@cluster0.w6lkxlt.mongodb.net/pdt"
    );
    console.log("database connected successfully");
  }
} catch (e) {
  console.log(e);
  console.log("error occured");
}

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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
