import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slide from "./Slide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "";
const API_URL  = `${API_BASE}/list/circuits`;

const getImageUrl = (circuit) =>
  circuit.imageUrl
    ? `${API_BASE}${circuit.imageUrl}`
    : `${API_BASE}/images/circuit/${circuit.imageName}`;

const truncate = (text, max = 100) =>
  text && text.length > max ? `${text.slice(0, max)}…` : text;

const CircuitsList = () => {
  const [circuits, setCircuits] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        return res.json();
      })
      .then(setCircuits)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-primary text-center">Chargement…</div>;
  if (error)   return <div className="text-danger  text-center">{error}</div>;

  const settings = {
    dots: true,
    infinite: circuits.length > 3,
    speed: 500,
    slidesToShow: Math.min(circuits.length, 3),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: Math.min(circuits.length, 2) }
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="container py-4">
      <Slide />

      {circuits.length > 0 && (
        <h1 className="text-center my-4">Our trips</h1>
      )}

      <Slider {...settings}>
        {circuits.map((circuit) => (
          <div key={circuit.id} className="px-2">
            <div className="card h-100 shadow-sm">
              <img
                className="card-img-top p-2 rounded-4"
                src={getImageUrl(circuit)}
                alt={circuit.name}
                style={{ objectFit: "cover", height: 220 }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{circuit.name}</h5>
                <p className="card-text flex-grow-1">{truncate(circuit.description, 100)}</p>
                <Link
                  to={`/circuit/${circuit.id}`}
                  className="btn btn-outline-primary btn-sm align-self-start mt-auto"
                >
                  View details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CircuitsList;
