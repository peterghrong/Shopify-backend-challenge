import { useState } from "react";
import { Button, ButtonGroup, Form, Modal } from "react-bootstrap";
import { deleteItem, updateItem } from "../api/api";
type ItemProps = {
	_id: string;
	name: string;
	description: string;
	count: number;
};

const Item = ({ _id, name, description, count }: ItemProps) => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const putItem = () => {
		updateItem(item);
	};

	const removeItem = () => {
		deleteItem(_id);
	};

	const item: IItem = {
		_id: _id,
		name: name,
		description: description,
		count: count,
	};

	return (
		<>
			<tr>
				<td>{_id}</td>
				<td>{name}</td>
				<td>{description}</td>
				<td>{count}</td>
				<td>
					<ButtonGroup aria-label="Basic example">
						<Button variant="primary" onClick={handleShow}>
							Edit
						</Button>
						<Button variant="danger" onClick={removeItem} href="/">
							Delete
						</Button>
					</ButtonGroup>
				</td>
			</tr>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Modal title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId={`name_${_id}`}>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type="text"
								defaultValue={name}
								onChange={(event) => {
									item.name = event.target.value;
								}}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId={`description_${description}`}
						>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								defaultValue={description}
								onChange={(event) => {
									item.description = event.target.value;
								}}
							/>
						</Form.Group>
						<Form.Group
							className="mb-3"
							controlId={`count_${count}`}
						>
							<Form.Label>Inventory Quantity</Form.Label>
							<Form.Control
								type="number"
								defaultValue={count}
								onChange={(event) => {
									item.count = parseInt(event.target.value);
								}}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={putItem} href="/">
						Update
					</Button>
					<Button variant="secondary" onClick={handleClose}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default Item;
