import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'

function NavBar(props) {
  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">FBA App</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem style={{ marginRight: 20 }}>
          <Button color="primary" onClick={props.importModel}>
            Import Model
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  )
}

export default NavBar
