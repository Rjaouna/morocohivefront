import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Card } from 'react-bootstrap';

const API_BASE = process.env.REACT_APP_API_BASE_URL
const API_URL = `${API_BASE}/list/circuits`; // change to your prod URL if needed

const Circuit = () => {
  const { id } = useParams();
  const [circuit, setCircuit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);

  useEffect(() => {
    const fetchAndFilterCircuit = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Erreur ${res.status}`);

        const data = await res.json();
        const found = data.find((c) => String(c.id) === String(id));
        if (!found) throw new Error("Circuit introuvable");

        setCircuit(found);
        setSelectedPackIndex(0); // par défaut, premier pack
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

  if (loading) return <div className="text-primary text-center">Chargement du circuit...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;
  if (!circuit) return null;

  return (
    <div className="container py-4">

      <Link to="/" className="btn btn-primary mb-3 text-light">← Retour à la liste</Link>

	  <div className="circuit-details py-4">
      {/* Name */}
      <h2 className="mb-2">{circuit.name}</h2>

      {/* One-line description */}
      <p
        className="lead mb-4 text-truncate"
        style={{ maxWidth: '100%' }}   // garde la troncation même sur 100 %
      >
        {circuit.description}
      </p>

      {/* Cards : 1 × col sur XS, 2 × cols ≥ md */}
      <Row xs={1} md={2} className="g-4">
        {circuit.overview && (
          <Col>
            <Card className="h-100">
              <Card.Header as="h5">Overview</Card.Header>
              <Card.Body>
                <Card.Text>{circuit.overview}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}

        {circuit.highlights && (
          <Col>
            <Card className="h-100">
              <Card.Header as="h5">Highlights</Card.Header>
              <Card.Body>
                <Card.Text>{circuit.highlights}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}

        {circuit.whyItsUnique && (
          <Col>
            <Card className="h-100">
              <Card.Header as="h5">Why It’s Unique</Card.Header>
              <Card.Body>
                <Card.Text>{circuit.whyItsUnique}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}

        {circuit.transportation && (
          <Col>
            <Card className="h-100">
              <Card.Header as="h5">Transportation</Card.Header>
              <Card.Body>
                <Card.Text>{circuit.transportation}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}

        {circuit.optional && (
          <Col>
            <Card className="h-100">
              <Card.Header as="h5">Optional</Card.Header>
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
          <h5>Available packs :</h5>
          <div className="btn-group mb-3" role="group">
            {circuit.packs.map((pack, index) => (
              <button
                key={index}
                type="button"
                className={`btn btn-sm ${index === selectedPackIndex ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => handlePackSelect(index)}
              >
                {pack.type}
              </button>
            ))}
          </div>

          <div className="mb-2">
            <strong>Price :</strong>{" "}
            <span className="badge bg-success">{circuit.packs[selectedPackIndex].price} €</span>

          </div>

          {circuit.packs[selectedPackIndex].description && (
            <p className="text-muted">{circuit.packs[selectedPackIndex].description}</p>
          )}
        </>
      )}

      {circuit.itineraryDays && circuit.itineraryDays.length > 0 && (
        <>
          <h5>Day by day :</h5>
          <ol className="list-group list-group">
            {circuit.itineraryDays.map((day, i) => (
              <li key={i} className="list-group-item">
                <strong>Jour {day.dayNumber} :</strong> {day.description}
                {day.details && day.details.length > 0 && (
                  <ul className="mt-2">
                    {day.details.map((detail, j) => (
                      <li key={j}>
                        {detail.timeSlot} {detail.description}
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
