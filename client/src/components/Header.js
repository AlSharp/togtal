import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends Component {
  render() {
    const { handleAuth, loggedIn } = this.props;
    return(
      <div className="header">
        <Navbar fixedTop fluid collapseOnSelect className="navbar-bg">
          <Navbar.Header>
            <Navbar.Brand>
              Togtal
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              { !loggedIn ?
                <NavItem eventKey={1} href="#" onClick={handleAuth}>
                  Sign in
                </NavItem> :
                <NavItem eventKey={1} href="#" onClick={handleAuth}>
                  Sign out
                </NavItem>
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Header;