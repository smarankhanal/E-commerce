import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "../db/index.js";
import { Collection } from "../models/collection.model.js";
import { collections } from "../data/collections.js";

const seedCollections = async () => {
  try {
    await connectDB();

    await Collection.deleteMany({});

    await Collection.insertMany(collections);

    console.log("Collections seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedCollections();
