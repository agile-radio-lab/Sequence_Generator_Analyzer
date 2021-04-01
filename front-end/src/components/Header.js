
import React from "react";

import { Navbar } from "react-bootstrap";

function Header() {
    return <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">

        <Navbar.Brand>
            <img
                src="/logo.png"
                width="30"
                height="40"
                className="align-top nav-logo"
                alt="Spectrum Diagram Logo"
            />
            Sequence Generator Web GUI
            </Navbar.Brand>
    </Navbar>;

}

export default Header;