import { Router } from "express";
import {
	getItems,
	postItem,
	deleteItem,
	updateItem,
	downloadItems,
} from "../controllers/items";

/**
 * Define various routes for the items controller
 */
const itemsRouter = Router();
itemsRouter.get("/items", getItems);
itemsRouter.post("/items", postItem);
itemsRouter.put("/items/:id", updateItem);
itemsRouter.delete("/items/:id", deleteItem);
itemsRouter.get("/items/download", downloadItems);

export default itemsRouter;
