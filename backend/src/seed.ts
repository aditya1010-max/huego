import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import Palette from "./models/Palette";

const seedPalettes = async () => {
  try {
    await connectDB();

    // await Palette.deleteMany(); // clear existing data (optional)

      await Palette.insertMany([
    {
      "name": "Pastel Dream",
      "colors": [{ "hex": "#B3EBF2" }, { "hex": "#F6ADC6" }, { "hex": "#FDE164" }, { "hex": "#E5CCC9" }],
      "category": ["Pastel", "Soft", "Warm", "Cold"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Retro Bright",
      "colors": [{ "hex": "#2CCEFF" }, { "hex": "#F80CD5" }, { "hex": "#8CE411" }, { "hex": "#F7E11C" }],
      "category": ["Retro", "Bright", "Neon", "Vivid"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Dark Academia",
      "colors": [{ "hex": "#401C26" }, { "hex": "#525947" }, { "hex": "#828C72" }, { "hex": "#59230F" }],
      "category": ["Dark", "Earthy", "Moody", "Warm"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Neon Blast",
      "colors": [{ "hex": "#F72585" }, { "hex": "#7209B7" }, { "hex": "#3A0CA3" }, { "hex": "#4361EE" }],
      "category": ["Neon", "Bright", "Cold", "Vivid"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Sky Breeze",
      "colors": [{ "hex": "#82C8E5" }, { "hex": "#0096C7" }, { "hex": "#48CAE4" }, { "hex": "#90E0EF" }],
      "category": ["Sky", "Cold", "Pastel", "Ocean"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Vintage 90s",
      "colors": [{ "hex": "#AC85E9" }, { "hex": "#FF6C9D" }, { "hex": "#FFA3C8" }, { "hex": "#01E1F2" }],
      "category": ["Vintage", "Retro", "Neon", "Bright"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Warm Canyon",
      "colors": [{ "hex": "#FBC246" }, { "hex": "#FE9135" }, { "hex": "#E05F1D" }, { "hex": "#B43E0E" }],
      "category": ["Warm", "Earthy", "Sunset", "Desert"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Cool Ocean",
      "colors": [{ "hex": "#259AA1" }, { "hex": "#146982" }, { "hex": "#00B4D8" }, { "hex": "#48CAE4" }],
      "category": ["Cold", "Ocean", "Sky", "Teal"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Arcade Retro",
      "colors": [{ "hex": "#613FD1" }, { "hex": "#008EF3" }, { "hex": "#31CC5D" }, { "hex": "#FFC107" }],
      "category": ["Retro", "Neon", "Bright", "Gaming"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Cozy Hearth",
      "colors": [{ "hex": "#2B1B16" }, { "hex": "#26261C" }, { "hex": "#7A6F5E" }, { "hex": "#4D2F32" }],
      "category": ["Dark", "Warm", "Chocolate", "Earthy"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Neon Purple",
      "colors": [{ "hex": "#C724B1" }, { "hex": "#DB3EB1" }, { "hex": "#4D4DFF" }, { "hex": "#FFAD00" }],
      "category": ["Neon", "Bright", "Purple", "Electric"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Summer Haze",
      "colors": [{ "hex": "#B66617" }, { "hex": "#C6721C" }, { "hex": "#D68023" }, { "hex": "#F4B845" }],
      "category": ["Warm", "Sunset", "Desert", "Golden"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Autumn Sunset",
      "colors": [{ "hex": "#733C4A" }, { "hex": "#253D40" }, { "hex": "#627369" }, { "hex": "#A67041" }],
      "category": ["Autumn", "Warm", "Earthy", "Forest"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Clay Earth",
      "colors": [{ "hex": "#D57C3A" }, { "hex": "#B0582A" }, { "hex": "#704C36" }, { "hex": "#BE8656" }],
      "category": ["Earthy", "Warm", "Clay", "Neutral"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Pink Lemonade",
      "colors": [{ "hex": "#ED740F" }, { "hex": "#FDD736" }, { "hex": "#FCEA94" }, { "hex": "#FD4B80" }],
      "category": ["Warm", "Bright", "Candy", "Tropical"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Forest Moss",
      "colors": [{ "hex": "#525947" }, { "hex": "#627369" }, { "hex": "#31CC5D" }, { "hex": "#44D62C" }],
      "category": ["Forest", "Earthy", "Green", "Moss"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Sunrise Blush",
      "colors": [{ "hex": "#FDE164" }, { "hex": "#FF6C9D" }, { "hex": "#FFB6C1" }, { "hex": "#F6ADC6" }],
      "category": ["Sunrise", "Blush", "Pastel", "Warm"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Stormy Sky",
      "colors": [{ "hex": "#3E446E" }, { "hex": "#59AC99" }, { "hex": "#146982" }, { "hex": "#253D40" }],
      "category": ["Storm", "Sky", "Cold", "Moody"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Berry Frost",
      "colors": [{ "hex": "#FF1493" }, { "hex": "#AC85E9" }, { "hex": "#B3EBF2" }, { "hex": "#90E0EF" }],
      "category": ["Berry", "Frost", "Pastel", "Cold"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Desert Sand",
      "colors": [{ "hex": "#FBC246" }, { "hex": "#D57C3A" }, { "hex": "#BE8656" }, { "hex": "#E69E32" }],
      "category": ["Desert", "Sandy", "Warm", "Earthy"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Icy Lavender",
      "colors": [{ "hex": "#E5CCC9" }, { "hex": "#AC85E9" }, { "hex": "#B3EBF2" }, { "hex": "#82C8E5" }],
      "category": ["Icy", "Lavender", "Pastel", "Cold"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Coral Reef",
      "colors": [{ "hex": "#FF7F50" }, { "hex": "#FF6C9D" }, { "hex": "#00B4D8" }, { "hex": "#48CAE4" }],
      "category": ["Coral", "Tropical", "Ocean", "Bright"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Gold Metallic",
      "colors": [{ "hex": "#FDD736" }, { "hex": "#F7E11C" }, { "hex": "#FFC107" }, { "hex": "#F4B845" }],
      "category": ["Gold", "Metallic", "Warm", "Bright"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Muted Earth",
      "colors": [{ "hex": "#828C72" }, { "hex": "#7A6F5E" }, { "hex": "#A26436" }, { "hex": "#704C36" }],
      "category": ["Muted", "Earthy", "Neutral", "Warm"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Jewel Tone",
      "colors": [{ "hex": "#613FD1" }, { "hex": "#4361EE" }, { "hex": "#FF1493" }, { "hex": "#C724B1" }],
      "category": ["Jewel", "Bright", "Rich", "Vivid"],
      "likes": 0,
      "likedBy": 0
    },
    {
      "name": "Candy Pop",
      "colors": [{ "hex": "#FF43A4" }, { "hex": "#FDE164" }, { "hex": "#8CE411" }, { "hex": "#FFAD00" }],
      "category": ["Candy", "Bright", "Neon", "Sweet"],
      "likes": 0,
      "likedBy": 0
    }
  ]
);
    console.log("Seed data inserted successfully ✔");
    process.exit(0);

  } catch (error) {
    console.error("Error seeding data ❌:", error);
    process.exit(1);
  }
};

seedPalettes();
