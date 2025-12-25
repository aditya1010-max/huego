import { Request, Response } from "express";
import Palette from "../models/Palette";

export const getAllPalettes = async (req:Request, res: Response) => {
  try {
    const skip: number = parseInt(req.query.skip as string) || 0;
    const limit: number = parseInt(req.query.limit as string) || 40;

    const total: number = await Palette.countDocuments(); // <--- key part

    const palettes = await Palette.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return res.json({
      data: palettes,
      total
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const createPalette = async (req: Request, res: Response) => {
    try{
        const { name, colors, category } = req.body;

        if (!name || !colors || colors.length !== 4) {
            return res.status(400).json({
                message: "Palette must have name and exaclty 4 colors"
            });
        }

        const newPalette = await Palette.create({
            name,
            colors,
            category
        });

        return res.status(201).json(newPalette);
        

    } catch (error) {
        console.error("error creating palette:", error);
        return res.status(500).json({ message: "server error creating a palette"});
    }

}

export const toggleLike = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("PALETTE ID:", req.params.id);

    if (!req.body || !req.body.userId) {
      console.error("Missing userId in request body");
      return res.status(400).json({ message: "userId missing" });
    }

    const { userId } = req.body;
    const paletteId = req.params.id;

    const palette = await Palette.findById(paletteId);

    if (!palette) {
      console.error("Palette not found!");
      return res.status(404).json({ message: "Palette not found" });
    }

    const alreadyLiked = palette.likedBy.includes(userId);

    if (alreadyLiked) {
      palette.likedBy = palette.likedBy.filter((id: string) => id !== userId);
    } else {
      palette.likedBy.push(userId);
    }

    palette.likes = palette.likedBy.length; // sync likes always
    await palette.save();

    console.log("Successfully toggled like");

    return res.status(200).json({
      likes: palette.likes,
      liked: !alreadyLiked,
    });

  } catch (error) {
    console.error("Error toggling like:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const favorites = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;  // ⭐ FROM URL PARAMS

    console.log("Favorites controller hit, userId:", userId);

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const favourites = await Palette.find({ likedBy: userId });

    console.log("Found favourites count:", favourites.length);

    return res.status(200).json(favourites);
  } catch (error) {
  console.error("Error fetching favourites:", error);
  return res
    .status(500)
    .json({ message: "Server error fetching favourites" });
  }
};


export const filterPalettes = async (req: Request, res: Response) => {
  const { filter } = req.params;
  const skip: number = parseInt(req.query.skip as string) || 0;
  const limit: number = parseInt(req.query.limit as string) || 20;

  console.log("Filter param received:", filter);
  console.log("Query params:", { skip, limit });

  let query: any = {};

  if (
    filter &&
    filter !== "new" &&
    filter !== "popular" &&
    filter !== "random"
  ) {
    query = {
      category: { $regex: filter, $options: "i" }
    };
  }

  let palettes = [];
  let total = 0;

  if (filter === "random") {
    palettes = await Palette.aggregate([
      { $sample: { size: skip + limit } }
    ]);
    palettes = palettes.slice(skip, skip + limit);
    total = await Palette.countDocuments();
  } else {
    let sortOption: any = {};

    if (filter === "popular") sortOption = { like: -1 };
    if (filter === "new") sortOption = { createdAt: -1 };

    total = await Palette.countDocuments(query);

    palettes = await Palette.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
  }

  return res.json({
    data: palettes,
    total,
  });
};
