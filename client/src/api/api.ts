import axios, { AxiosResponse } from "axios";
import download from "downloadjs";

const baseUrl: string = "http://localhost:4000";

export const getItems = async (): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const items: AxiosResponse<ApiDataType> = await axios.get(
			`${baseUrl}/items`
		);
		return items;
	} catch (error) {
		throw error;
	}
};

export const addItem = async (
	data: IItem
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const item: Omit<IItem, "_id"> = {
			name: data.name,
			description: data.description,
			count: data.count,
		};

		const saveItem: AxiosResponse<ApiDataType> = await axios.post(
			`${baseUrl}/items`,
			item
		);
		return saveItem;
	} catch (error) {
		throw error;
	}
};

export const updateItem = async (
	data: IItem
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const item: Omit<IItem, "_id"> = {
			name: data.name,
			description: data.description,
			count: data.count,
		};

		const updateItem: AxiosResponse<ApiDataType> = await axios.put(
			`${baseUrl}/items/${data._id}`,
			item
		);
		return updateItem;
	} catch (error) {
		throw error;
	}
};

export const deleteItem = async (
	id: string
): Promise<AxiosResponse<ApiDataType>> => {
	try {
		const deleteItem: AxiosResponse<ApiDataType> = await axios.delete(
			`${baseUrl}/items/${id}`
		);
		return deleteItem;
	} catch (error) {
		throw error;
	}
};

export const downloadCSV = async (): Promise<void> => {
	try {
		const blobData = await axios.get(`${baseUrl}/items/download`, {
			responseType: "blob",
		});
		const data = blobData.data;
		if (data) {
			download(data, "items.csv");
		} else {
			console.log("data not found");
		}
	} catch (err) {
		throw err;
	}
};
