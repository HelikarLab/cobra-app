import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom"
import ModelTab from "../ModelTab";
import SimulationTab from "../SimulationTab";

function NavBar(props) {

    if(window.location.pathname === "/"){
        window.location.replace("/Model")
    }
    return (
        <Router>
            <Navbar color="dark" dark expand="md" >
                <NavbarBrand href="/">FBA App</NavbarBrand>


                <div style={{display: "inline-block"}}>
                        <NavLink to="/Model"
                                 style={{color: "grey", margin: "0px 50px 0px 150px"}}
                                 activeStyle={{color: "white"}}>
                            Model
                        </NavLink>

                        <NavLink to="/Simulation"
                                 style={{color: "grey"}}
                                 activeStyle={{color: "white"}}>
                            Simulation
                        </NavLink>
                </div>

                    <div style={{ position: "absolute",right: "20px"}}>
                        <Button color="primary" onClick={props.importModel}>
                            Import Model
                        </Button>
                    </div>

            </Navbar>

                <Route path="/Model" exact component={ModelTab} />
                <Route path="/Simulation" exact component={SimulationTab} />

        </Router>
    )
}

export default NavBar
