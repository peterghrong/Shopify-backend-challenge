interface IItem {
	_id: string;
	name: string;
	description: string;
	count: number;
	createdAt?: string;
	updatedAt?: string;
}

interface ItemProps {
	item: IItem;
}

type ApiDataType = {
	message: string;
	status: string;
	item: IItem;
	items: IItem[];
};
