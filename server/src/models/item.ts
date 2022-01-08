import { IItem } from '../interfaces/item';
import { model, Schema } from 'mongoose';

/** Mongoose Schema for the Inventory Item */
const itemSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		count: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export default model<IItem>('Item', itemSchema);
