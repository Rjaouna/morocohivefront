import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav as BsNav,
  NavDropdown,
  Container,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { FaUserCircle } from "react-icons/fa";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "";
const API_URL = `${API_BASE}/list/circuits`;

function SiteNav() {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  let userEmail = "";
  if (isAuthenticated) {
    try {
      const decoded = jwtDecode(token);
      userEmail = decoded.username || decoded.email || "User";
    } catch (e) {
      console.error("Token decode error", e);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Server ${res.status}`);
        setCircuits(await res.json());
      } catch (err) {
        console.error(err);
        setError("Unable to load circuits");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="light" className="container-fluid shadow-sm" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <div className="fw-bold">Morocco Hive</div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <BsNav className="me-auto" navbarScroll>
            <BsNav.Link as={Link} to="/">Home</BsNav.Link>

            <NavDropdown title="Circuits" id="nav-circuits" menuVariant="light">
              {loading && (
                <NavDropdown.Item className="text-center" disabled>
                  <Spinner animation="border" size="sm" />
                </NavDropdown.Item>
              )}
              {error && (
                <NavDropdown.Item className="text-danger" disabled>
                  {error}
                </NavDropdown.Item>
              )}
              {!loading && !error && circuits.length === 0 && (
                <NavDropdown.Item disabled>No circuits yet</NavDropdown.Item>
              )}
              {!loading && circuits.map((c) => (
                <NavDropdown.Item key={c.id} as={Link} to={`/circuit/${c.id}`}>
                  {c.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <BsNav.Link as={Link} to="/about">About</BsNav.Link>
            <BsNav.Link as={Link} to="/contact">Contact</BsNav.Link>
          </BsNav>

    {isAuthenticated && (
      <NavDropdown
        title={
          

            <span
              className="rounded-circle"
              style={{
                width: 50,
                height: 50,
                backgroundColor: "#ff6b00",
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                textTransform: "uppercase",
                paddingRight:11,
                paddingLeft:11,
                paddingBottom:7,
                paddingTop:7
              }}
            >
              {userEmail.slice(0, 2)}
            </span>

           


        }
        id="nav-account"
        align="end"
      >
        <NavDropdown.Item onClick={handleLogout}>My account</NavDropdown.Item>
        <NavDropdown.Item onClick={handleLogout}>My reservations</NavDropdown.Item>
        <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
      </NavDropdown>
    )}
    

{!isAuthenticated && (
  <NavDropdown title="My Account" id="nav-account" align="end">
    <NavDropdown.Item as={Link} to="/register">Sign up</NavDropdown.Item>
    <NavDropdown.Item as={Link} to="/login">Log in</NavDropdown.Item>
  </NavDropdown>
)}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNav;
