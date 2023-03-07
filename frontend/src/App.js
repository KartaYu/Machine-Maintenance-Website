// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
		from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Switch,
	Route, Link } from "react-router-dom";

// Import other React Component
import CreateMachine from "./Components/create-machine.component"
import EditMachine from "./Components/edit-machine.component";
import MacineList from "./Components/machine-list.component";

// App Component
const App = () => {
return (
	<Router>
	<div className="App">
		<header className="App-header">
		<Navbar bg="dark" variant="dark">
			<Container>
			<Navbar.Brand>
				<Link to={"/"}
				className="nav-link">
				機器管理平台
				</Link>
			</Navbar.Brand>

			<Nav className="justify-content-end">
				<Nav>
				<Link to={"/create-machine"}
					className="nav-link">
					建立維護機器
				</Link>
				</Nav>

				<Nav>
				<Link to={"/machine-list"}
					className="nav-link">
					維護機器清單
				</Link>
				</Nav>
			</Nav>
			</Container>
		</Navbar>
		</header>

		<Container>
		<Row>
			<Col md={12}>
			<div className="wrapper">
				<Switch>
				<Route exact path="/"
					component={CreateMachine} />
				<Route path="/create-machine"
					component={CreateMachine} />
				<Route path="/edit-machine/"
					component={EditMachine} />
				<Route path="/machine-list"
					component={MacineList} />
				</Switch>
			</div>
			</Col>
		</Row>
		</Container>
	</div>
	</Router>
);
};

export default App;
