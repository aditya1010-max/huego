import { Router } from "express";
import { getAllPalettes, createPalette, favorites, toggleLike } from "../controllers/paletteController";
import { filterPalettes } from "../controllers/paletteController";

const router = Router();

router.get("/", getAllPalettes);
router.post("/", createPalette);
router.post("/:id/like", toggleLike);
router.get("/favorites/:userId", favorites);
router.get("/new", filterPalettes);
router.get("/popular", filterPalettes);
router.get("/random", filterPalettes);


router.get("/:filter", filterPalettes);

export default router;

console.log("Loaded: paletteRoutes");
