import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Card, ListGroup, Badge, Button } from "react-bootstrap";
import {
  FaHotel,
  FaCar,
  FaGlobeAmericas,
  FaStar,
  FaAngleDown,
  FaAngleRight,
  FaInfoCircle
} from "react-icons/fa";

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${API_BASE}/list/circuits`;

const Circuit = () => {
  const { id } = useParams();
  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [expandedDayIndex, setExpandedDayIndex] = useState(null);

  useEffect(() => {
    const fetchAndFilterCircuit = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();
        const found = data.find((c) => String(c.id) === String(id));
        if (!found) throw new Error("Circuit not found");

        setCircuit(found);
        setSelectedPackIndex(0);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterCircuit();
  }, [id]);

  const handlePackSelect = (index) => {
    setSelectedPackIndex(index);
  };

  const toggleDayDetails = (index) => {
    if (expandedDayIndex === index) {
      setExpandedDayIndex(null);
    } else {
      setExpandedDayIndex(index);
    }
  };

  const renderPackExtras = (type) => {
    // Consistent icons: FaHotel for accommodation, FaCar for transport, FaGlobeAmericas for experience
    const accommodationIcon = <FaHotel className="me-3 text-primary" size={20} />;
    const transportationIcon = <FaCar className="me-3 text-primary" size={20} />;
    const experienceIcon = <FaGlobeAmericas className="me-3 text-primary" size={20} />;

    switch (type.toLowerCase()) {
      case "standard":
        return (
          <Card className="mt-4 border-0 shadow-sm">
            <Card.Header className="bg-light d-flex align-items-center">
              <FaInfoCircle className="me-2 text-primary" />
              <h6 className="mb-0">Included in the Standard pack</h6>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-start">
                  {accommodationIcon}
                  <div>
                    <strong>Accommodation:</strong> Well-located, clean hotels and traditional guesthouses providing a practical base.
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start">
                  {transportationIcon}
                  <div>
                    <strong>Transportation:</strong> Private, air-conditioned vehicle with an experienced local driver for all transfers and excursions.
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start">
                  {experienceIcon}
                  <div>
                    <strong>Experience:</strong> Focus on genuine cultural immersion and excellent value for money.
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        );

      case "comfort":
        return (
          <Card className="mt-3 border-0 shadow-sm">
            <Card.Header className="bg-light d-flex align-items-center">
              <FaInfoCircle className="me-2 text-primary" />
              <h6 className="mb-0">Included in the Comfort pack</h6>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-start">
                  {accommodationIcon}
                  <div>
                    <strong>Accommodation:</strong> Charming boutique hotels and traditional riads with enhanced amenities and character.
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start">
                  {transportationIcon}
                  <div>
                    <strong>Transportation:</strong> Dedicated private, comfortable vehicle with a professional driver for relaxed and personalized travel.
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start">
                  {experienceIcon}
                  <div>
                    <strong>Experience:</strong> A balanced blend of quality and authentic exploration with increased comfort.
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        );

      case "luxury":
        return (
          <Card className="mt-3 border-0 shadow-sm">
            <Card.Header className="bg-light d-flex align-items-center">
              <FaInfoCircle className="me-2 text-primary" />
              <h6 className="mb-0">Included in the Luxury pack</h6>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex align-items-start">
                  {accommodationIcon}
                  <div>
                    <strong>Accommodation:</strong> 5-star hotels, exclusive and lavish riads, and premium desert camps offering top-tier amenities.
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start">
                  {transportationIcon}
                  <div>
                    <strong>Transportation:</strong> Private, premium vehicle with a dedicated professional driver for seamless and stylish travel.
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-items-start">
                  {experienceIcon}
                  <div>
                    <strong>Experience:</strong> Unparalleled elegance, bespoke itineraries, and ultimate indulgence with personalized service.
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        );

      default:
        return null;
    }
  };

  if (loading) return <div className="text-primary text-center">Loading circuit...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;
  if (!circuit) return null;

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-primary mb-3 text-light">
        ← Back to list
      </Link>

      <div className="circuit-details py-4">
        {/* Circuit name */}
        <h2 className="mb-2 d-flex align-items-center">
          <FaGlobeAmericas className="me-2 text-primary" /> {circuit.name}
        </h2>

        {/* One-line description */}
        <p className="lead mb-4 text-truncate" style={{ maxWidth: "100%" }}>
          {circuit.description}
        </p>

        {/* Cards: 1 column on XS, 2 columns ≥ md */}
        <Row xs={1} md={2} className="g-4">
          {circuit.overview && (
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Header as="h5" className="d-flex align-items-center bg-white">
                  <FaInfoCircle className="me-2 text-primary" /> Overview
                </Card.Header>
                <Card.Body>
                  <Card.Text>{circuit.overview}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}

          {circuit.highlights && (
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Header as="h5" className="d-flex align-items-center bg-white">
                  <FaStar className="me-2 text-primary" /> Highlights
                </Card.Header>
                <Card.Body>
                  <Card.Text>{circuit.highlights}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}

          {circuit.whyItsUnique && (
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Header as="h5" className="d-flex align-items-center bg-white">
                  <FaInfoCircle className="me-2 text-primary" /> Why It’s Unique
                </Card.Header>
                <Card.Body>
                  <Card.Text>{circuit.whyItsUnique}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}

          {circuit.transportation && (
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Header as="h5" className="d-flex align-items-center bg-white">
                  <FaCar className="me-2 text-primary" /> Transportation
                </Card.Header>
                <Card.Body>
                  <Card.Text>{circuit.transportation}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}

          {circuit.optional && (
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Header as="h5" className="d-flex align-items-center bg-white">
                  <FaInfoCircle className="me-2 text-primary" /> Optional
                </Card.Header>
                <Card.Body>
                  <Card.Text>{circuit.optional}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </div>

      {circuit.packs && circuit.packs.length > 0 && (
        <>
          <h5 className="mt-4 d-flex align-items-center">
            <FaAngleDown className="me-2 text-primary" /> Available packs:
          </h5>
          <div className="btn-group mb-3" role="group">
            {circuit.packs.map((pack, index) => (
              <Button
                key={index}
                size="sm"
                variant={index === selectedPackIndex ? "primary" : "outline-primary"}
                onClick={() => handlePackSelect(index)}
                className="d-flex align-items-center"
              >
                {index === selectedPackIndex ? <FaAngleDown className="me-1" /> : <FaAngleRight className="me-1" />}
                {pack.type}
              </Button>
            ))}
          </div>

          <div className="my-3 d-flex align-items-center">
            <strong className="me-2">Price:</strong>
            <Badge bg="success" className="fs-6 d-flex align-items-center">
              <FaStar className="me-1" /> {circuit.packs[selectedPackIndex].price} €
            </Badge>
          </div>

          {circuit.packs[selectedPackIndex].description && (
            <p className="text-muted">{circuit.packs[selectedPackIndex].description}</p>
          )}

          {renderPackExtras(circuit.packs[selectedPackIndex].type)}
        </>
      )}

      {circuit.itineraryDays && circuit.itineraryDays.length > 0 && (
        <>
          <h5 className="mt-5 d-flex align-items-center">
            <FaAngleDown className="me-2 text-primary" /> Day by day:
          </h5>
          <ol className="list-group list-group-flush">
            {circuit.itineraryDays.map((day, i) => (
              <li
                key={i}
                className="list-group-item"
                style={{ cursor: "pointer" }}
                onClick={() => toggleDayDetails(i)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    {expandedDayIndex === i ? (
                      <FaAngleDown className="me-2 text-primary" />
                    ) : (
                      <FaAngleRight className="me-2 text-primary" />
                    )}
                    <strong>Day {day.dayNumber} : </strong> {day.description}
                  </div>
                </div>
                {expandedDayIndex === i && day.details && day.details.length > 0 && (
                  <ul className="mt-2 ps-4">
                    {day.details.map((detail, j) => (
                      <li key={j} className="mb-1">
                        <span className="text-primary">{detail.timeSlot}</span> : {detail.description}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default Circuit;
