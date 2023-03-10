import { Navbar, NavItem, Container } from 'react-bootstrap';

function Header({handleLogout}) {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Persona AI</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <NavItem onClick={handleLogout}>Log out</NavItem>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default Header;