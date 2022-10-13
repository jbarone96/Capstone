import React from "react";
import {
  Container,
  Image,
  Navbar,
  Nav,
  Figure,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import defaultAvatar from "../../Images/defaultavatar.jpeg";

const Header = ({ user, setUser }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    setUser(null);
    if (location.pathname === "/userProfile") {
      navigate("/");
    }
  };
  return (
    <Navbar bg="secondary" variant="dark">
      <Container fluid="lg" style={{ maxWidth: "1024px"}}>
        <Navbar.Brand as={Link} to="/">
          Top Eats
        </Navbar.Brand>
        {user ? (
          <Nav className="justify-content-end">
            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
            <Nav.Link as={Link} to="/userProfile">
              <Figure
                className="bg-border-color rounded-circle overflow-hidden"
                style={{
                  display: "flex",
                  margin: "auto",
                  height: "35px",
                  width: "35px",
                  marginTop: "-4px",
                }}
              >
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>My Profile</Tooltip>}
                >
                  <Figure.Image src={defaultAvatar} className="w-100 h-100" />
                </OverlayTrigger>
              </Figure>
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link as={Link} to={`/signin`}>
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to={`/signup`}>
              Sign Up
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
