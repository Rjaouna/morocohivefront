import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav as BsNav, // alias to avoid name clash
  NavDropdown,
  Container,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

/**
 * Base URL of the backend API. Override it in production by defining
 * `REACT_APP_API_BASE_URL` in your environment.
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL
const API_URL = `${API_BASE}/list/circuits`; // change to your prod URL if needed

/**
 * Top navigation bar with dynamic « Circuits » dropdown.
 * - Fetches circuit list from the API on mount
 * - Shows a spinner while loading, an error message if the call fails
 * - Uses <Link> from react-router to avoid full page reloads
 */
function SiteNav() {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  /* Fetch circuits once */
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

  /* Submit search */
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <Navbar expand="lg" bg="light" className="container-fluid shadow-sm" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <div class="display-10 fw-bold">Morocco Hive</div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <BsNav className="me-auto" navbarScroll>
            {/* Static links */}
            <BsNav.Link as={Link} to="/">
              Home
            </BsNav.Link>

            {/* Dynamic dropdown */}
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

              {!loading &&
                circuits.map((c) => (
                  <NavDropdown.Item key={c.id} as={Link} to={`/circuit/${c.id}`}>
                    {c.name}
                  </NavDropdown.Item>
                ))}
            </NavDropdown>

            <BsNav.Link as={Link} to="/about">About</BsNav.Link>
            <BsNav.Link as={Link} to="/contact">Contact</BsNav.Link>
          </BsNav>

          {/* Search form */}
          <Form className="d-flex" onSubmit={handleSearch} role="search">
            <Form.Control
              type="search"
              placeholder="Search circuits…"
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search circuits"
            />
            <Button type="submit" variant="outline-dark">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default SiteNav;