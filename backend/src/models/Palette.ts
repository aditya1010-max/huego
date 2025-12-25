import mongoose, { Schema, Document } from "mongoose";

export interface Color {
  hex: string;
}

export interface Palette extends Document {
  name: string;
  colors: Color[]; // always length of 4
  likes: number;
  likedBy: string[]; // Add this
  category: [string];
  createdAt: Date;
  updatedAt: Date;
}

const ColorSchema = new Schema<Color>(
  {
    hex: {
      type: String,
      required: true,
      match: /^#([0-9A-F]{3}){1,2}$/i
    }
  },
  { _id: false }
);

const PaletteSchema = new Schema<Palette>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    colors: {
      type: [ColorSchema],
      required: true,
      validate: [
        (v: Color[]) => v.length === 4,
        "Palette must have exactly 4 colors"
      ]
    },
    likes: {
      type: Number,
      default: 0
    },
    likedBy: { type: [String], default: [] }, // ⭐ IMPORTANT LINE ⭐

    category: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model<Palette>("Palette", PaletteSchema);
