import mongoose from "mongoose";
import "dotenv/config";

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.igylnho.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("Connected to database!");
  } catch (error) {
    console.log(error);
  }
}

export default main;
