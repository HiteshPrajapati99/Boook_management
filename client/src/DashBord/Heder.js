import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Dashbord from "./Dashbord";
import styled from "styled-components";

export default function Heder() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("x-access-token")) {
      navigate("/login");
    }
  }, []);

  return (
    <Maindiv>
      <Dashbord />
      <Navbar
        variant="light"
        expand="lg"
        className="shadow navbar"
        style={{
          backgroundColor: "#eff8f9",
        }}
      >
        <div className="container">
          <Navbar.Brand as={NavLink} to="/">
            Book Management
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="gap-3 nav-list-items">
              <Nav.Link as={NavLink} to="/">
                <CgProfile /> Profile
              </Nav.Link>
              <button
                className="button"
                onClick={() => {
                  localStorage.removeItem("x-access-token");
                  navigate("/login");
                }}
              >
                LogOut
              </button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </Maindiv>
  );
}

const Maindiv = styled.div`
  .navbar {
    position: fixed;
    width: 100%;
    top: 0px;
    left: 0px;
    z-index: 10001;
  }
  .navbar-brand.active {
    color: #39bda7;
    font-weight: bold;
    font-size: x-large;
  }
  .navbar-nav .nav-link.active {
    color: #39bda7;
    font-weight: bold;
    font-size: x-large;
    margin-right: 5rem;
  }
`;
