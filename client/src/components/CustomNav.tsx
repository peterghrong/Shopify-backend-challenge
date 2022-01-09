import { Container, Nav, Navbar } from "react-bootstrap";
import { downloadCSV } from "../api/api";

const CustomNav = () => {
	const download = () => {
		downloadCSV();
	};

	return (
		<Navbar bg="dark" expand="lg" variant="dark">
			<Container>
				<Navbar.Brand href="/">
					Shopify Internship Challenge
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav
						className="me-auto my-2 my-lg-0"
						style={{ maxHeight: "100px" }}
						navbarScroll
					>
						<Nav.Link href="/new-item">Add Item</Nav.Link>
						<Nav.Link onClick={download}>Export CSV</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
export default CustomNav;
