import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

const reviews = [
  {
    name: "Amine B.",
    city: "Casablanca",
    comment: "An unforgettable trip! Everything was well organized and truly breathtaking.",
    date: "May 2025",
  },
  {
    name: "Sarah L.",
    city: "Paris",
    comment: "Wonderful service and spectacular views. Highly recommended!",
    date: "April 2025",
  },
  {
    name: "Mohamed T.",
    city: "Marrakech",
    comment: "Friendly staff, great experience – Morocco has never felt more magical.",
    date: "March 2025",
  },
];

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const ClientReviews = () => {
  return (
    <div className="py-5" style={{ background: "#f8f9fa" }}>
      <Container>
        <h2 className="text-center mb-5 fw-bold">What Our Clients Say</h2>
        <Row className="g-4">
          {reviews.map((review, index) => (
            <Col md={4} key={index}>
              <Card className="h-100 shadow-sm border-0 rounded-4 p-3">
                <div className="d-flex align-items-center mb-3">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                    style={{ width: 50, height: 50, fontWeight: "bold", fontSize: 18 }}
                  >
                    {getInitials(review.name)}
                  </div>
                  <div>
                    <div className="fw-semibold">{review.name}</div>
                    <div className="text-muted small">{review.city} · {review.date}</div>
                  </div>
                </div>
                <blockquote className="blockquote text-secondary">
                  <p className="mb-0">“{review.comment}”</p>
                </blockquote>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ClientReviews;
