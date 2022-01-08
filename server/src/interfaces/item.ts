import { Document } from "mongodb";

/** Description of the Inventory Item Interface */
export interface IItem extends Document {
	/** Name of the Inventory Item */
	name: string;
	/** Description of the Inventory Item */
	description: string;
	/** Number of this inventory Item remaining */
	count: number;
}
