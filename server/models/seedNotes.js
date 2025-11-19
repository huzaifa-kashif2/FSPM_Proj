import mongoose from "mongoose";
import dotenv from "dotenv";
import Note from "./Note.js";
import User from "./User.js";

// Load environment variables from server/.env
dotenv.config({ path: "../.env" });

// --- Simple hard-coded configuration ---
// Prefer setting an email that exists in your DB
const USER_EMAIL = "huzaifa.kashif2@gmail.com"; // change to an existing user's email
const USER_ID = "69197dedc3442bcaa36a75ea"; // or put a Mongo ObjectId string here
const CLEAR_EXISTING = false; // set true to delete user's notes before seeding

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is not set in environment.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  let user = null;
  if (USER_ID && typeof USER_ID === "string") {
    user = await User.findById(USER_ID);
  } else if (USER_EMAIL && typeof USER_EMAIL === "string") {
    user = await User.findOne({ email: USER_EMAIL });
  } else {
    user = await User.findOne();
  }

  if (!user) {
    console.error(
      "No user found. Set USER_EMAIL or USER_ID in seedNotes.js, or create a user first."
    );
    process.exit(1);
  }

  if (CLEAR_EXISTING) {
    const res = await Note.deleteMany({ user: user._id });
    console.log(
      `Cleared ${res.deletedCount} existing notes for user ${user.email}`
    );
  }

  const samples = [
    {
      title: "Project Outline",
      content:
        "Draft the main sections: Introduction, Objectives, Scope, Milestones, Risks.",
      tags: ["project", "planning"],
      user: user._id,
    },
    {
      title: "Meeting Minutes - Sprint Planning",
      content:
        "Discussed priorities, assigned tasks, and clarified acceptance criteria for the next sprint.",
      tags: ["meeting", "sprint"],
      user: user._id,
    },
    {
      title: "API Endpoints To-Do",
      content:
        "Auth: /login, /logout, /register. Tasks: CRUD with filters. Notes: CRUD with tags.",
      tags: ["api", "backend"],
      user: user._id,
    },
    {
      title: "Ideas - UI Polish",
      content:
        "Improve dashboard spacing, add empty states, and refine form validation feedback.",
      tags: ["ui", "ideas"],
      user: user._id,
    },
  ];

  const inserted = await Note.insertMany(samples);
  console.log(`Inserted ${inserted.length} notes for ${user.email}`);
}

main()
  .catch((err) => {
    console.error("Seeding failed:", err?.message || err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
    process.exit();
  });
