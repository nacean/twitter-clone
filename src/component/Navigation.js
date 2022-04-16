import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function Navigation() {
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand>
          <img
            src={process.env.PUBLIC_URL + "/images/twitter-logo.svg"}
            alt="main logo"
            width="30px"
            height="30px"
          />{" "}
          Nweet
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link href="/">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
