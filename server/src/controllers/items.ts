import { Response, Request } from "express";
import { IItem } from "../interfaces/item";
import Item from "../models/item";
import { parseCSV } from "../utils/csvParser";
import { statusCodes } from "../utils/statusCodes";
import mongoose from "mongoose";

/**
 * Fetch all Inventory items
 * @route GET /items
 */
const getItems = async (_: Request, res: Response): Promise<void> => {
	try {
		const items: IItem[] = await Item.find();
		res.status(statusCodes.SUCCESS).json({ items: items });
	} catch (err) {
		res.status(statusCodes.SERVER_ERROR).json({
			message: "Internal Server Error",
		});
	}
};

/**
 * Create a new Inventory item
 * @route POST /items
 */
const postItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<IItem, "name" | "description" | "count">;

		const item: IItem = new Item({
			name: body.name,
			description: body.description,
			count: body.count,
		});

		const newItem = await item.save();

		res.status(statusCodes.SUCCESS).json({
			item: newItem,
		});
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			res.status(statusCodes.BAD_REQUEST).json({
				message: "Validation Error",
			});
		} else {
			res.status(statusCodes.SERVER_ERROR).json({
				message: "Internal server Error",
			});
		}
	}
};

/**
 *
 * Upadte an inventory item
 * @route PUT /items/:id
 */
const updateItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { id },
			body,
		} = req;

		const updateItem: IItem | null = await Item.findById(id);
		if (updateItem) {
			updateItem.name = body.name;
			updateItem.description = body.description;
			updateItem.count = body.count;
			const updatedItem = await updateItem.save();
			res.status(statusCodes.SUCCESS).json({
				item: updatedItem,
			});
		} else {
			res.status(statusCodes.NOT_FOUND).json({
				message: "Item not found",
			});
		}
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			res.status(statusCodes.BAD_REQUEST).json({
				message: "Validation Error",
			});
		} else {
			res.status(statusCodes.SERVER_ERROR).json({
				message: "Internal Server error",
			});
		}
	}
};

/**
 * Delete an inventory item
 * @route DELETE /items/:id
 */
const deleteItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { id },
		} = req;
		const deleteItem: IItem | null = await Item.findById(id);
		if (deleteItem) {
			const deletedItem = await deleteItem.remove();
			res.status(statusCodes.SUCCESS).json({
				item: deletedItem,
			});
		} else {
			res.status(statusCodes.NOT_FOUND).json({
				message: "Item not found",
			});
		}
	} catch (err) {
		res.status(statusCodes.SERVER_ERROR).json({
			message: "Internal Server error",
		});
	}
};

/**
 * Request all items then parse them into csv format
 * @route GET /items/download
 */
const downloadItems = async (_: Request, res: Response): Promise<void> => {
	try {
		const items: IItem[] = await Item.find();
		const csvData = parseCSV(items);
		res.status(statusCodes.SUCCESS).send(Buffer.from(csvData));
	} catch (err) {
		res.status(statusCodes.SERVER_ERROR).json({
			message: "Internal Server error",
		});
	}
};

export { getItems, postItem, updateItem, deleteItem, downloadItems };
