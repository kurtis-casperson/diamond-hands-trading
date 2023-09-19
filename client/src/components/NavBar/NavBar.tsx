import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Gem } from 'react-bootstrap-icons'
import Cookies from 'universal-cookie'
import { useState, useContext } from 'react'
import { UserContext } from '../../utils/UserContextMethods'
import './NavBar.css'

const NavBar = () => {
  const userContext = useContext(UserContext)
  const user = userContext?.user
  const setUser = userContext?.setUser
  const cookies = new Cookies()

  const jwtLogout = () => {
    setUser(null)
    cookies.remove('jwt_authorization')
  }

  return (
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
              }}
            >
              <Nav.Item>
                <Nav.Link href="/Home">
                  <Gem className=" text-[#48ec5b] h-6 w-auto lg:block" />
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link id="trade" href="/Trade">
                  Trade
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link id="portfolio" href="/Portfolio">
                  Portfolio
                </Nav.Link>
              </Nav.Item>
            </div>
            <div
              className="ml-auto"
              style={{
                marginTop: '10px',
              }}
            >
              <Nav.Item>
                <Button type="button" onClick={() => jwtLogout()} size="sm">
                  {user !== null ? (
                    <Nav.Link id="login" href="/">
                      Logout
                    </Nav.Link>
                  ) : (
                    <Nav.Link id="logout" href="/">
                      Login
                    </Nav.Link>
                  )}
                </Button>
              </Nav.Item>

              {/* <Button
                type="button"
                className="app-theme-button"
                
                size="sm"
              >
               */}
              {/* {theme === 'dark' ? (
                  <Sun className="bi bi-brightness-high"></Sun>
                ) : (
                  <MoonFill className="bi bi-moon-fill"></MoonFill>
                )} */}
              {/* </Button> */}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
