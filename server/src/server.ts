import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./routes/items";

const app: Express = express();
dotenv.config();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(itemsRouter);
app.use("*", (_, res) => res.status(404).json({ error: "Not Found" }));

mongoose
	.connect(`${process.env.DB}`)
	.then(() =>
		app.listen(PORT, () =>
			console.log(`Server running on http://localhost:${PORT}`)
		)
	)
	.catch((error) => {
		console.log(error);
	});
