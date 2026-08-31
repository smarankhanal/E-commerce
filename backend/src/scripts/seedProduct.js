import "dotenv/config";
import connectDB from "../db/index.js";

import { Product } from "../models/product.model.js";
import { Collection } from "../models/collection.model.js";

import { products } from "../data/products.js";

const seedProducts = async () => {
  try {
    await connectDB();

    const collections = await Collection.find({});

    const collectionMap = new Map(
      collections.map((collection) => [collection.name, collection._id])
    );

    const formattedProducts = products.map((product) => ({
      ...product,
      collections: product.collections.map((collectionName) => {
        const collectionId = collectionMap.get(collectionName);

        if (!collectionId) {
          throw new Error(`Collection "${collectionName}" not found`);
        }

        return collectionId;
      }),
    }));

    const operations = formattedProducts.map((product) => ({
      updateOne: {
        filter: {
          sku: product.sku,
        },

        update: {
          $set: {
            name: product.name,
            description: product.description,
            price: product.price,
            sizes: product.sizes,
            totalStock: product.totalStock,
            highlights: product.highlights,
            image: product.image,
            collections: product.collections,
          },

          $setOnInsert: {
            totalStock: product.totalStock ?? 0,
            soldCount: 0,
            isActive: true,
          },
        },

        upsert: true,
      },
    }));

    if (operations.length === 0) {
      console.log("No products found to seed");
      process.exit(0);
    }

    const result = await Product.bulkWrite(operations);

    console.log("Products seeded successfully");
    console.log(`Inserted: ${result.upsertedCount}`);
    console.log(`Updated: ${result.modifiedCount}`);
    console.log(`Matched: ${result.matchedCount}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
