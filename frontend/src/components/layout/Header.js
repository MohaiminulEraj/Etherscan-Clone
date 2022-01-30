import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import SearchBox from './SearchBox'
const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">Etherscan-Clone</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
          <SearchBox />
          {/* <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
