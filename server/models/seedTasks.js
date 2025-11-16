import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./Task.js";
import User from "./User.js";

dotenv.config({ path: "../.env" });

// --- Simple hard-coded configuration ---
// Set one of these (prefer email for readability)
const USER_EMAIL = "huzaifa.kashif2@gmail.com"; // change to an existing user's email
const USER_ID = "69197dedc3442bcaa36a75ea"; // or put a Mongo ObjectId string here
const CLEAR_EXISTING = false; // set true to delete user's tasks before seeding

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
      "No user found. Set USER_EMAIL or USER_ID in seedTasks.js, or create a user first."
    );
    process.exit(1);
  }

  if (CLEAR_EXISTING) {
    const res = await Task.deleteMany({ user: user._id });
    console.log(
      `Cleared ${res.deletedCount} existing tasks for user ${user.email}`
    );
  }

  const plusDays = (n) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return d;
  };

  const samples = [
    {
      title: "Complete Project Proposal",
      description: "Write and submit the project proposal document",
      status: "pending",
      priority: "high",
      dueDate: plusDays(3),
      user: user._id,
    },
    {
      title: "Review Documentation",
      description: "Review and update project documentation",
      status: "in-progress",
      priority: "medium",
      dueDate: plusDays(1),
      user: user._id,
    },
    {
      title: "Team Meeting",
      description: "Weekly team sync meeting",
      status: "completed",
      priority: "low",
      dueDate: plusDays(-1),
      user: user._id,
    },
    {
      title: "Implement Authentication",
      description: "Add login, logout, and MFA verification",
      status: "in-progress",
      priority: "high",
      dueDate: plusDays(5),
      user: user._id,
    },
    {
      title: "Polish UI",
      description: "Refine dashboard styling and responsiveness",
      status: "pending",
      priority: "medium",
      dueDate: plusDays(7),
      user: user._id,
    },
  ];

  const inserted = await Task.insertMany(samples);
  console.log(`Inserted ${inserted.length} tasks for ${user.email}`);
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
