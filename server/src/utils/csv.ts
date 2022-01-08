const { Parser } = require("json2csv");

const csvParser = (data) => {
	const fields = [
		{ label: "_id", value: "_id" },
		{ label: "name", value: "name" },
		{ label: "description", value: "description" },
		{ label: "count", value: "count" },
	];
	const json2csv = new Parser({ fields: fields });
	return json2csv.parse(data);
};

export { csvParser };
