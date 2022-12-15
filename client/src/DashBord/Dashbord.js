import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

export default function Dashbord() {
  return (
    <Div>
      <h3 className="text-center"> Book Dashboard</h3>
      <div className="dashbord">
        <div className="dashbord-items">
          <span className="cta">
            <Nav.Link as={Link} to="/" className="hover-underline-animation">
              My Profile
            </Nav.Link>
          </span>
          <span className="cta">
            <Nav.Link
              as={NavLink}
              to="/users"
              className="hover-underline-animation"
            >
              User List
            </Nav.Link>
          </span>
          <span className="cta">
            <Nav.Link
              as={NavLink}
              to="/add_user"
              className="hover-underline-animation"
            >
              Create User
            </Nav.Link>
          </span>
          <span className="cta">
            <Nav.Link
              as={NavLink}
              to="/books"
              className="hover-underline-animation"
            >
              Book List
            </Nav.Link>
          </span>
        </div>
      </div>
    </Div>
  );
}

const Div = styled.div`
  /* display: block; */
  max-width: 20%;
  height: 100%;
  width: 100%;
  position: fixed;
  /* background-color: #eff8f987; */

  h3 {
    color: #39bda7;
    margin-top: 5rem;
  }
  .dashbord {
    background-color: #eff8f987;
    position: fixed;
    height: 80%;
    width: 15%;
    margin-left: 2rem;
    border: 2px solid #39bda7;
    border-radius: 5px;
    display: grid;
    place-items: center;
    .dashbord-items {
      .nav-link {
        font-weight: bolder;
        font-size: larger;
        margin-top: 3rem;
      }
    }
  }
  .nav-link.active {
    color: #39bda7;
  }

  .cta {
    border: none;
    background: none;
  }

  .hover-underline-animation {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;

      background-color: #39bda7;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
  }

  .cta:hover .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
