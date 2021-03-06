import React, { Component } from "react";
import { Navbar, Nav, Button, Modal, Table,InputGroup,DropdownButton,Dropdown,FormControl} from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Bar extends Component {
  refreshPage = () => {
    if (window.location.pathname === "/home") window.location.reload(false);
  };

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand
            as={Link}
            to="/home"
            className="pl-3"
            button
            onClick={() => this.refreshPage()}
          >
            E-commerce
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/shop" className="pl-5">
                Shop
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/cart">
                <Button className="bg-dark border-0">
                  <svg
                    width="2em"
                    height="2em"
                    viewBox="0 0 16 16"
                    class="bi bi-cart"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
                    />
                  </svg>
                  {this.props.addedCart && this.props.addedCart.length ? (
                    <span class="badge badge-light">
                      {this.props.addedCart.length}
                    </span>
                  ) : (
                    <span></span>
                  )}
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  addedCart: state.items.addedToCart,
});

export default connect(mapStateToProps)(Bar);
