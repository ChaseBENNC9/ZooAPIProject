import { useState } from "react";

// Import the following:
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

// Import the following component:
import ZoosTable from "./tables/ZooTable";
import EnclosuresTable from "./tables/EnclosureTable"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Zoo Management System</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/zoos">Zoo's</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/enclosures">Enclosure's</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <Routes>
        <Route path="/zoos" element={<ZoosTable />} />
        <Route path="/enclosures" element={<EnclosuresTable />} />

      </Routes>
    </Router>
  );
};

export default Navigation;