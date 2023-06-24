import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Sun, MoonFill, Gem } from 'react-bootstrap-icons'

import './NavBar.css'
const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
   
      expand="sm"
      bg="*"
      variant="dark"
      
    >
      <Container className="navBarContainer">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            style={{
              justifyContent: 'space-between',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Nav.Item>
                <Nav.Link href="/">
                  <Gem className=" text-[#48ec5b] h-6 w-auto lg:block" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Trade">Trade</Nav.Link>
              </Nav.Item>
             
            </div>
            <div
              className="ml-auto"
              style={{
                marginTop: '10px',
              }}
            >
              <Button
                type="button"
                className="app-theme-button"
                
                size="sm"
              >
                {/* {theme === 'dark' ? (
                  <Sun className="bi bi-brightness-high"></Sun>
                ) : (
                  <MoonFill className="bi bi-moon-fill"></MoonFill>
                )} */}
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
