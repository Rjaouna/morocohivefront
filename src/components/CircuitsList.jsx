import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slide from "./Slide";

/**
 * Base URL du back-end Symfony — définie dans .env :
 *   REACT_APP_API_BASE_URL=http://localhost:8000
 * Laisser vide ("") si front et back tournent sur le même domaine.
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL || "";
const API_URL  = `${API_BASE}/list/circuits`;

/**
 * Construit l’URL de l’image :
 *  1. L’API renvoie imageUrl → on l’utilise.
 *  2. Sinon on reconstruit à partir de imageName et du dossier public.
 */
const getImageUrl = (circuit) =>
  circuit.imageUrl
    ? `${API_BASE}${circuit.imageUrl}`                // ex. /images/circuit/abc.jpg
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

  return (
    <div className="container py-4">
      <Slide />

      <h1 className="text-center my-4">Our trips</h1>

      {/* 4 cartes par ligne ≥ 992 px, 2 ≥ 576 px, 1 sur mobile */}
      <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
        {circuits.map((circuit) => (
          <div className="col" key={circuit.id}>
            <div className="card h-100 shadow-sm">
              {/* ---- Image ---- */}
              <img
                className="card-img-top p-2 rounded-4"
                src={getImageUrl(circuit)}
                alt={circuit.name}
                style={{ objectFit: "cover", height: 220 }}
              />

              {/* ---- Contenu ---- */}
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
      </div>
    </div>
  );
};

export default CircuitsList;
