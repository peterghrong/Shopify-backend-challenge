import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getItems } from "../api/api";
import Item from "./Item";

const Home = () => {
	const [items, setItems] = useState<IItem[]>([]);

	const fetchItems = (): void => {
		getItems()
			.then(({ data: { items } }: IItem[] | any) => setItems(items))
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchItems();
	}, []);

	return (
		<>
			<br></br>
			<Table>
				<thead>
					<tr>
						<th>Item ID</th>
						<th>Name</th>
						<th>Description</th>
						<th>Quantity</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => {
						return (
							<Item
								_id={item._id}
								name={item.name}
								description={item.description}
								count={item.count}
							/>
						);
					})}
				</tbody>
			</Table>
		</>
	);
};

export default Home;
