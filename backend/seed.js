// backend/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not found in .env - add your Atlas connection string");
  process.exit(1);
}

const products = [
  { productName: "Window Cling 20% Off AI Glasses", category: "Window Graphic", size: "24x36", material: "Vinyl", competitor: "Graphic Systems", bidPrice: 18.25, year: 2024 },
  { productName: "Window Cling Seasonal Promo Holiday Deals", category: "Window Graphic", size: "18x24", material: "Clear Static", competitor: "Quad", bidPrice: 16.30, year: 2023 },
  { productName: "Storefront Glass Graphic New Arrivals", category: "Window Graphic", size: "30x40", material: "Perforated Vinyl", competitor: "Innomark", bidPrice: 28.10, year: 2022 },
  { productName: "Door Cling Members Save More", category: "Window Graphic", size: "18x18", material: "Vinyl", competitor: "Duggal", bidPrice: 12.35, year: 2023 },
  { productName: "Glass Wrap 50% Off Clearance", category: "Window Graphic", size: "48x60", material: "One-Way Film", competitor: "Sandy Alexander", bidPrice: 54.20, year: 2024 },
  { productName: "Window Graphic Footwear Sale", category: "Window Graphic", size: "36x48", material: "High Tack", competitor: "Graphic Systems", bidPrice: 33.75, year: 2021 },
  { productName: "Exterior Window Banner Grand Opening", category: "Window Graphic", size: "60x90", material: "Mesh", competitor: "Quad", bidPrice: 70.55, year: 2022 },
  { productName: "Window Sticker Buy 1 Get 1 Free", category: "Window Graphic", size: "24x24", material: "Vinyl", competitor: "Duggal", bidPrice: 14.50, year: 2023 },
  { productName: "Door Decal Thank You For Visiting", category: "Window Graphic", size: "10x14", material: "Vinyl", competitor: "Innomark", bidPrice: 9.20, year: 2024 },
  { productName: "Window Cling Flash Sale 24 Hours", category: "Window Graphic", size: "22x28", material: "Clear", competitor: "Sandy Alexander", bidPrice: 15.10, year: 2021 },
  { productName: "Large Window Panel Brand Launch X100", category: "Window Graphic", size: "96x48", material: "Vinyl", competitor: "Innomark", bidPrice: 120.40, year: 2024 },
  { productName: "Holiday Window Graphic Glitter", category: "Window Graphic", size: "48x72", material: "Glitter Film", competitor: "Duggal", bidPrice: 90.12, year: 2023 },
  { productName: "Side Panel Window Wrap", category: "Window Graphic", size: "60x36", material: "Vinyl", competitor: "Graphic Systems", bidPrice: 45.25, year: 2022 },
  { productName: "Window Cling Cyber Week", category: "Window Graphic", size: "18x24", material: "Vinyl", competitor: "Quad", bidPrice: 17.20, year: 2024 },
  { productName: "Store Entrance Graphic New Store Look", category: "Window Graphic", size: "36x84", material: "Film", competitor: "Sandy Alexander", bidPrice: 62.15, year: 2022 },
  { productName: "Frosted Window Film Wayfinding", category: "Window Graphic", size: "48x48", material: "Frosted PVC", competitor: "Graphic Systems", bidPrice: 55.60, year: 2023 },
  { productName: "Double Sided Window Graphic", category: "Window Graphic", size: "24x36", material: "Vinyl", competitor: "Quad", bidPrice: 28.30, year: 2024 },
  { productName: "UV Window Poster", category: "Window Graphic", size: "36x50", material: "Paper", competitor: "Duggal", bidPrice: 21.90, year: 2024 },
  { productName: "Window Cling Summer Offers", category: "Window Graphic", size: "22x28", material: "Clear Cling", competitor: "Innomark", bidPrice: 16.40, year: 2022 },
  { productName: "Seasonal Door Graphic", category: "Window Graphic", size: "18x24", material: "Vinyl", competitor: "Sandy Alexander", bidPrice: 14.75, year: 2023 },
  { productName: "Offer Board 20% Off AI Glasses", category: "Offer Board", size: "11x17", material: "Foamboard", competitor: "Quad", bidPrice: 7.80, year: 2024 },
  { productName: "Promo Sign Buy More Save More", category: "Offer Board", size: "18x24", material: "PVC", competitor: "Graphic Systems", bidPrice: 12.90, year: 2023 },
  { productName: "Sale Header Lateralis", category: "Offer Board", size: "24x10", material: "Cardstock", competitor: "Sandy Alexander", bidPrice: 5.60, year: 2022 },
  { productName: "Shelf Talker New Lower Price", category: "Offer Board", size: "4x12", material: "Card", competitor: "Innomark", bidPrice: 1.70, year: 2024 },
  { productName: "Countertop Display Card", category: "Offer Board", size: "8.5x11", material: "Paper", competitor: "Duggal", bidPrice: 2.40, year: 2023 },
  { productName: "Hanging Sale Sign Limited Time", category: "Offer Board", size: "22x28", material: "Card", competitor: "Graphic Systems", bidPrice: 9.50, year: 2021 },
  { productName: "In-Store Promo Board Weekend Savings", category: "Offer Board", size: "18x24", material: "Foamcore", competitor: "Quad", bidPrice: 10.35, year: 2023 },
  { productName: "Price Drop Poster", category: "Offer Board", size: "16x20", material: "Paper", competitor: "Innomark", bidPrice: 6.20, year: 2024 },
  { productName: "Entrance Poster Big Savings Day", category: "Offer Board", size: "24x36", material: "PVC", competitor: "Sandy Alexander", bidPrice: 22.40, year: 2022 },
  { productName: "Plinth Sign Feature Product", category: "Offer Board", size: "12x18", material: "Reboard", competitor: "Duggal", bidPrice: 15.30, year: 2024 },
  { productName: "Shelf Divider Card", category: "Offer Board", size: "6x12", material: "Synthetic Paper", competitor: "Quad", bidPrice: 3.80, year: 2022 },
  { productName: "Offer Update Clearance Blowout", category: "Offer Board", size: "18x20", material: "Foamboard", competitor: "Graphic Systems", bidPrice: 8.25, year: 2023 },
  { productName: "Promo Card Hot Deals Inside", category: "Offer Board", size: "14x20", material: "PVC", competitor: "Sandy Alexander", bidPrice: 13.40, year: 2024 },
  { productName: "Category Sign Electronics", category: "Offer Board", size: "36x10", material: "Reboard", competitor: "Duggal", bidPrice: 18.10, year: 2021 },
  { productName: "Promo Graphic Top Picks", category: "Offer Board", size: "16x24", material: "Card", competitor: "Innomark", bidPrice: 6.50, year: 2024 },
  { productName: "Entrance Promo Board SAVE NOW", category: "Offer Board", size: "30x40", material: "Foam", competitor: "Quad", bidPrice: 20.20, year: 2023 },
  { productName: "Product Launch Card Series Z Ultra", category: "Offer Board", size: "12x18", material: "PVC", competitor: "Graphic Systems", bidPrice: 11.33, year: 2022 },
  { productName: "Small Header Lateralis Style", category: "Offer Board", size: "20x6", material: "Cardboard", competitor: "Sandy Alexander", bidPrice: 4.95, year: 2024 },
  { productName: "Promo Insert Weekend Offer", category: "Offer Board", size: "5x7", material: "Gloss Paper", competitor: "Quad", bidPrice: 1.10, year: 2022 },
  { productName: "Endcap Header Featured Product", category: "Offer Board", size: "24x12", material: "Reboard", competitor: "Innomark", bidPrice: 13.20, year: 2023 },
  { productName: "Hanging Sign Clearance Zone", category: "Hanging Sign", size: "36x12", material: "Card", competitor: "Quad", bidPrice: 13.60, year: 2024 },
  { productName: "Ceiling Banner Grand Sale", category: "Hanging Sign", size: "60x20", material: "Fabric", competitor: "Graphic Systems", bidPrice: 40.70, year: 2023 },
  { productName: "2-Sided Hanging Board", category: "Hanging Sign", size: "24x36", material: "Foam", competitor: "Innomark", bidPrice: 22.15, year: 2024 },
  { productName: "Ceiling Cube Display", category: "Hanging Sign", size: "24x24", material: "Reboard", competitor: "Duggal", bidPrice: 38.80, year: 2023 },
  { productName: "Retail Hanging Sign New Collection", category: "Hanging Sign", size: "48x18", material: "PVC", competitor: "Sandy Alexander", bidPrice: 31.20, year: 2021 },
  { productName: "Hanging Panel Top Deals", category: "Hanging Sign", size: "20x30", material: "Synthetic", competitor: "Quad", bidPrice: 15.90, year: 2022 },
  { productName: "Ceiling Graphic Store Anniversary", category: "Hanging Sign", size: "30x40", material: "Card", competitor: "Graphic Systems", bidPrice: 25.50, year: 2023 },
  { productName: "Ceiling Drop Sale Ends Soon", category: "Hanging Sign", size: "22x48", material: "Fabric", competitor: "Innomark", bidPrice: 33.40, year: 2024 },
  { productName: "Directional Hanging Sign", category: "Hanging Sign", size: "30x10", material: "PVC", competitor: "Duggal", bidPrice: 14.20, year: 2024 },
  { productName: "Ceiling Ribbon Graphic", category: "Hanging Sign", size: "48x8", material: "Fabric", competitor: "Sandy Alexander", bidPrice: 18.40, year: 2023 },
  { productName: "3D Hanging Display", category: "Hanging Sign", size: "24x24", material: "Reboard", competitor: "Graphic Systems", bidPrice: 42.60, year: 2021 },
  { productName: "Hanging Graphic Essentials Corner", category: "Hanging Sign", size: "24x30", material: "Foam", competitor: "Quad", bidPrice: 21.20, year: 2024 },
  { productName: "Sky Banner Holiday Mega Sale", category: "Hanging Sign", size: "60x24", material: "Fabric", competitor: "Duggal", bidPrice: 58.00, year: 2023 },
  { productName: "Ceiling Strip New Items", category: "Hanging Sign", size: "36x6", material: "PVC", competitor: "Innomark", bidPrice: 12.10, year: 2022 },
  { productName: "Hanging Poster Pick of the Week", category: "Hanging Sign", size: "30x40", material: "Paper", competitor: "Sandy Alexander", bidPrice: 20.80, year: 2021 },
  { productName: "Ceiling Block Fresh Dept", category: "Hanging Sign", size: "18x18", material: "Rigid Board", competitor: "Quad", bidPrice: 18.75, year: 2023 },
  { productName: "Promo Hanging Panel", category: "Hanging Sign", size: "22x28", material: "Card", competitor: "Graphic Systems", bidPrice: 14.25, year: 2024 },
  { productName: "Suspended Graphic Special Buy", category: "Hanging Sign", size: "24x36", material: "PVC", competitor: "Sandy Alexander", bidPrice: 19.30, year: 2022 },
  { productName: "Lightweight Hanging Sign", category: "Hanging Sign", size: "18x24", material: "Paper", competitor: "Duggal", bidPrice: 8.20, year: 2023 },
  { productName: "Retail Ceiling Panel Favorites", category: "Hanging Sign", size: "20x40", material: "Foam", competitor: "Innomark", bidPrice: 16.33, year: 2024 },
  { productName: "Floor Graphic Stay Left", category: "Floor Graphic", size: "24x24", material: "Anti-Slip Vinyl", competitor: "Graphic Systems", bidPrice: 18.40, year: 2024 },
  { productName: "Floor Marker Electronics Dept", category: "Floor Graphic", size: "18x18", material: "Laminated", competitor: "Innomark", bidPrice: 14.70, year: 2023 },
  { productName: "Floor Circle Deal Zone", category: "Floor Graphic", size: "24x24", material: "Textured PVC", competitor: "Duggal", bidPrice: 17.90, year: 2021 },
  { productName: "Floor Path Decal Go This Way", category: "Floor Graphic", size: "36x8", material: "Vinyl", competitor: "Quad", bidPrice: 10.60, year: 2024 },
  { productName: "Floor Rectangle Safety Message", category: "Floor Graphic", size: "18x24", material: "Anti-Slip Film", competitor: "Sandy Alexander", bidPrice: 16.40, year: 2022 },
  { productName: "Floor Graphic Customer Service", category: "Floor Graphic", size: "24x12", material: "Vinyl", competitor: "Graphic Systems", bidPrice: 12.10, year: 2023 },
  { productName: "Floor Graphic Kids Section", category: "Floor Graphic", size: "36x24", material: "Laminate", competitor: "Quad", bidPrice: 19.30, year: 2024 },
  { productName: "Directional Floor Strip", category: "Floor Graphic", size: "60x6", material: "PVC", competitor: "Innomark", bidPrice: 14.60, year: 2023 },
  { productName: "Branded Floor Sticker New Drop", category: "Floor Graphic", size: "30x30", material: "Vinyl", competitor: "Duggal", bidPrice: 22.10, year: 2022 },
  { productName: "Promotional Floor Marker Sale", category: "Floor Graphic", size: "20x20", material: "PVC", competitor: "Sandy Alexander", bidPrice: 15.80, year: 2021 },
  { productName: "Floor Stopper Do Not Cross", category: "Floor Graphic", size: "36x12", material: "Vinyl", competitor: "Graphic Systems", bidPrice: 17.40, year: 2024 },
  { productName: "Footprint Floor Decal", category: "Floor Graphic", size: "6x12", material: "Vinyl", competitor: "Quad", bidPrice: 5.60, year: 2023 },
  { productName: "Floor Graphic Checkout", category: "Floor Graphic", size: "24x24", material: "Anti-Slip", competitor: "Innomark", bidPrice: 16.20, year: 2022 },
  { productName: "Sale Floor Graphic", category: "Floor Graphic", size: "18x18", material: "Vinyl", competitor: "Sandy Alexander", bidPrice: 10.80, year: 2023 },
  { productName: "Large Floor Print", category: "Floor Graphic", size: "48x48", material: "Heavy Vinyl", competitor: "Duggal", bidPrice: 40.20, year: 2024 },
  { productName: "Navigation Strip", category: "Floor Graphic", size: "72x4", material: "PVC", competitor: "Quad", bidPrice: 9.90, year: 2021 },
  { productName: "Arrow Marker", category: "Floor Graphic", size: "12x12", material: "Vinyl", competitor: "Graphic Systems", bidPrice: 4.40, year: 2022 },
  { productName: "Decorative Floor Graphic", category: "Floor Graphic", size: "36x36", material: "Laminate", competitor: "Sandy Alexander", bidPrice: 25.90, year: 2024 },
  { productName: "Circular Floor Sign Featured Here", category: "Floor Graphic", size: "20x20", material: "Textured Film", competitor: "Innomark", bidPrice: 13.60, year: 2023 },
  { productName: "Oversized Floor Decal Mega Sale", category: "Floor Graphic", size: "60x40", material: "Anti-Slip", competitor: "Duggal", bidPrice: 55.10, year: 2023 },
  { productName: "Product Launch Poster AI Glasses", category: "Poster", size: "24x36", material: "Gloss", competitor: "Graphic Systems", bidPrice: 14.10, year: 2024 },
  { productName: "Large Poster Brand Awareness", category: "Poster", size: "36x48", material: "Matte", competitor: "Quad", bidPrice: 19.25, year: 2022 },
  { productName: "Acrylic Display Premium Collection", category: "Display", size: "10x12", material: "Acrylic", competitor: "Duggal", bidPrice: 24.40, year: 2023 },
  { productName: "Promo Kit New Store Setup", category: "Display Kit", size: "Multi", material: "Mixed", competitor: "Innomark", bidPrice: 180.20, year: 2024 },
  { productName: "Accordian Standee Big Offer", category: "Display", size: "60x24", material: "Reboard", competitor: "Sandy Alexander", bidPrice: 58.30, year: 2021 },
  { productName: "3D Product Display Sneaker Launch", category: "Display", size: "36x36", material: "Foamcore", competitor: "Graphic Systems", bidPrice: 76.20, year: 2022 },
  { productName: "Poster Winter Deals", category: "Poster", size: "20x30", material: "Gloss", competitor: "Quad", bidPrice: 12.10, year: 2023 },
  { productName: "Hanging Poster Kit Multi Piece", category: "Hanging Kit", size: "Multi", material: "Card", competitor: "Innomark", bidPrice: 40.60, year: 2024 },
  { productName: "Promo Display Board Savings Event", category: "Display", size: "48x24", material: "PVC", competitor: "Duggal", bidPrice: 28.20, year: 2023 },
  { productName: "Floor Standee Best Buy", category: "Display", size: "60x30", material: "Board", competitor: "Sandy Alexander", bidPrice: 33.10, year: 2022 },
  { productName: "Campaign Poster New Brand Look", category: "Poster", size: "36x60", material: "Matte", competitor: "Graphic Systems", bidPrice: 30.75, year: 2024 },
  { productName: "Endcap Display Panel", category: "Display", size: "24x36", material: "PVC", competitor: "Quad", bidPrice: 17.20, year: 2023 },
  { productName: "Retail Kit Promo Event", category: "Display Kit", size: "Multi", material: "Mixed", competitor: "Sandy Alexander", bidPrice: 130.40, year: 2021 },
  { productName: "High-End Display Premium Banner", category: "Display", size: "48x72", material: "Fabric", competitor: "Duggal", bidPrice: 80.20, year: 2024 },
  { productName: "Counter Display Accessory Zone", category: "Display", size: "12x18", material: "Acrylic", competitor: "Innomark", bidPrice: 22.60, year: 2023 },
  { productName: "Store Reset Kit 5 Piece", category: "Display Kit", size: "Multi", material: "Mixed", competitor: "Graphic Systems", bidPrice: 250.00, year: 2024 },
  { productName: "3D Header Display", category: "Display", size: "40x12", material: "Reboard", competitor: "Quad", bidPrice: 42.20, year: 2022 },
  { productName: "Double-Sided Poster", category: "Poster", size: "24x36", material: "Paper", competitor: "Duggal", bidPrice: 16.10, year: 2022 },
  { productName: "Large Hanging Poster", category: "Poster", size: "30x50", material: "Gloss", competitor: "Sandy Alexander", bidPrice: 28.40, year: 2023 },
  { productName: "Feature Display Board Featured Product", category: "Display", size: "48x24", material: "PVC", competitor: "Innomark", bidPrice: 25.50, year: 2024 }
];

async function run() {
  try {
    await mongoose.connect(MONGODB_URI, {
      // use the default options for mongoose 7+
    });
    const db = mongoose.connection.db;

    console.log("Connected to MongoDB. Inserting documents...");

    const result = await db.collection("bids").insertMany(products);
    console.log(`Inserted ${result.insertedCount} documents into "bids" collection.`);

    await mongoose.disconnect();
    console.log("Disconnected. Done.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

run();