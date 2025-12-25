import express from 'express';
import cors from 'cors';
import paletteRoutes from './routes/paletteRoutes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/palettes", paletteRoutes);

export default app;
