import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav, Text } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  const year = new Date().getFullYear()
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token'),
  )

  // Refresh auth state when token changes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAuthenticated(!!localStorage.getItem('token'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-light border-top pt-5 pb-4 mt-auto small">
      <Container>
        <Row className="gy-4">
          {/* Brand & tagline */}
          <Col md={4}>
            <h5 className="text-primary fw-bold">Morocco Hive —</h5>
            <p className="text-muted">
              Morocco Hive — Your gateway to Morocco’s wonders. We craft custom
              journeys, genuine local experiences, and seamless guidance from
              sun-kissed Sahara dunes to the pulse of vibrant medinas.
            </p>
          </Col>

          {/* Quick links */}
          <Col md={4}>
            <h6 className="fw-bold mb-3">Quick links</h6>
            <Nav className="flex-column gap-1">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About us
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/privacy">
                Privacy policy
              </Nav.Link>
              {isAuthenticated && (
                <Nav.Link as={Link} to="/privacy">
                 My account
                </Nav.Link>
              )}
            </Nav>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h6 className="fw-bold mb-3">Contact</h6>
            <address className="mb-2">
              Casablanca, Morocco
              <br />
              <a
                href="mailto:info@moroccohave.com"
                className="text-decoration-none"
              >
                info@moroccohave.com
              </a>
              <br />
              +212&nbsp;6&nbsp;00&nbsp;00&nbsp;00&nbsp;00
            </address>

            {/* Social icons (Bootstrap Icons) */}
            <div className="d-flex gap-2 fs-5">
              <a href="https://facebook.com" className="text-primary">
                <i className="bi bi-facebook" />
              </a>
              <a href="https://instagram.com" className="text-primary">
                <i className="bi bi-instagram" />
              </a>
              <a href="https://twitter.com" className="text-primary">
                <i className="bi bi-twitter-x" />
              </a>
            </div>
          </Col>
        </Row>

        <hr />
        <p className="text-center text-muted mb-0">
          &copy; {year} MoroccoHave. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}

export default Footer
