import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Gem } from 'react-bootstrap-icons'
import { useContext } from 'react'
import { UserContext } from '../../utils/UserContextMethods'
import './NavBar.css'
import { Link } from 'react-router-dom'
const NavBar = () => {
  const userContext = useContext(UserContext)
  const user = userContext?.user
  const setUser = userContext?.setUser

  const jwtLogout = () => {
    setUser(null)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="sm" bg="*" variant="dark">
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
                  marginTop: '40px',
                }}
              >
                <Nav.Item>
                  <Nav.Link as={Link} to="/Home">
                    <Gem className=" text-[#48ec5b] h-6 w-auto lg:block" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link id="trade" as={Link} to="/Trade">
                    Trade
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link id="portfolio" as={Link} to="/Portfolio">
                    Portfolio
                  </Nav.Link>
                </Nav.Item>
              </div>
              <div
                className="ml-auto"
                style={{
                  marginTop: '40px',
                }}
              >
                <Nav.Item>
                  <Button type="button" onClick={() => jwtLogout()} size="sm">
                    {user === null || user === undefined ? (
                      <Nav.Link id="login" as={Link} to="/">
                        Login
                      </Nav.Link>
                    ) : (
                      <Nav.Link id="logout" as={Link} to="/">
                        Logout
                      </Nav.Link>
                    )}
                  </Button>
                </Nav.Item>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
