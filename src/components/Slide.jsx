import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "";
const API_URL  = `${API_BASE}/list/circuits`;

/**
 * Renvoie l’URL de l’image du circuit.
 *  1. Priorité au champ imageUrl (ou image) renvoyé par l’API.
 *  2. Sinon, si on a juste imageName (Vich), on reconstruit l’URL.
 *  3. Sinon on garde la bannière par défaut.
 */
const getImageUrl = (circuit) => {
  if (circuit.imageUrl)               return `${API_BASE}${circuit.imageUrl}`;
  if (circuit.image)                  return circuit.image.startsWith("http")
                                         ? circuit.image
                                         : `${API_BASE}${circuit.image}`;
  if (circuit.imageName)              return `${API_BASE}/images/circuit/${circuit.imageName}`;
  return "Marrakech_banner.jpg";      // image par défaut (dans /public ou assets)
};

function Slide() {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error,   setError]     = useState("");

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

  if (loading)           return <div className="text-center py-5">Loading…</div>;
  if (error)             return <div className="text-danger text-center py-5">{error}</div>;
  if (!circuits.length)  return null;

  return (
    <div className="shadow-sm">
      <Carousel fade>
        {circuits.map((circuit) => (
          <Carousel.Item key={circuit.id} interval={3000}>
            <img
              src={getImageUrl(circuit)}
              alt={circuit.name}
              className="d-block w-100"
              style={{ objectFit: "cover", maxHeight: 400 }}
            />
            <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-3">
              <h3 className="display-5 fw-bold">{circuit.name}</h3>
              {circuit.overview && <p>{circuit.overview}</p>}
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Slide;
