import { IItem } from "../interfaces/item";
const { Parser } = require("json2csv");

/**
 *
 * Parse items mongodb documents into CSV data
 * @param items: List of IItem object to parse into CSV
 * @returns
 */
const parseCSV = (items: IItem[]) => {
	const fields = [
		{ label: "_id", value: "_id" },
		{ label: "name", value: "name" },
		{ label: "description", value: "description" },
		{ label: "count", value: "count" },
	];
	const json2csv = new Parser({ fields: fields });
	const jsonified = JSON.parse(JSON.stringify(items));
	return json2csv.parse(jsonified);
};

export { parseCSV };
