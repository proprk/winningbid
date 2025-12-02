import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not set in .env");
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas ✅");

    const db = client.db("pricingdb");
    const coll = db.collection("bids");

    const sample = {
      productName: "Sample product - connection test",
      bidPrice: 1.23,
      currency: "USD",
      year: new Date().getFullYear(),
      competitor: { name: "TestCompetitor", location: "LA" },
      sourceFile: "manual-test",
    };

    const res = await coll.insertOne(sample);
    console.log("Inserted document id:", res.insertedId.toString());

    // cleanup
    await coll.deleteOne({ _id: res.insertedId });
    console.log("Deleted test document. All good!");
  } catch (err) {
    console.error("Connection error:", err.message);
  } finally {
    await client.close();
  }
}

main();
