import { Response, Request } from "express";
import { IItem } from "../interfaces/item";
import Item from "../models/item";
import { csvParser } from "../utils/csv";

const getItems = async (req: Request, res: Response): Promise<void> => {
	try {
		const items: IItem[] = await Item.find();
		res.status(200).json({ items });
	} catch (err) {
		res.status(500).json({ message: "Internal Server Error" });
	}
};

const addItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const body = req.body as Pick<IItem, "name" | "description" | "count">;

		const item: IItem = new Item({
			name: body.name,
			description: body.description,
			count: body.count,
		});

		const newItem = await item.save();
		const allItems = await Item.find();

		res.status(200).json({
			message: "Item added",
			item: newItem,
			items: allItems,
		});
	} catch (err) {
		res.status(500).json({ message: "Internal server Error" });
	}
};

const updateItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { id },
			body,
		} = req;

		const updateItem: IItem | null = await Item.findByIdAndUpdate(id, body);
		if (updateItem == null) {
			res.status(401).json({ message: "Item not found" });
		} else {
			const allItems: IItem[] = await Item.find();
			res.status(200).json({
				message: "Item updated",
				item: updateItem,
				items: allItems,
			});
		}
	} catch (err) {
		res.status(500).json({ message: "Internal Server error" });
	}
};

const deleteItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			params: { id },
		} = req;

		const deletedItem: IItem | null = await Item.findByIdAndDelete(id);
		if (deletedItem == null) {
			res.status(401).json({ message: "Item not found" });
		} else {
			const allItems: IItem[] = await Item.find();

			res.status(200).json({
				message: "Item deleted",
				item: deletedItem,
				items: allItems,
			});
		}
	} catch (err) {
		res.status(500).json({ message: "Internal Server error" });
	}
};

const downloadItems = async (req: Request, res: Response): Promise<void> => {
	try {
		const items: IItem[] = await Item.find();
		const csv = csvParser(JSON.parse(JSON.stringify(items)));
		res.status(200).send(Buffer.from(csv));
	} catch (err) {
		throw err;
	}
};

export { getItems, addItem, updateItem, deleteItem, downloadItems };
