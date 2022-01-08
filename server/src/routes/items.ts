import { Router } from "express";
import {
	getItems,
	addItem,
	deleteItem,
	updateItem,
	downloadItems,
} from "../controllers/items";

const itemsRouter: Router = Router();

itemsRouter.get("/items", getItems);
itemsRouter.post("/items", addItem);
itemsRouter.put("/items/:id", updateItem);
itemsRouter.delete("/items/:id", deleteItem);
itemsRouter.get("/items/download", downloadItems);

export default itemsRouter;
