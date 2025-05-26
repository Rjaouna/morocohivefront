import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://127.0.0.1:8000/list/circuits";

const CircuitsList = () => {
  const [circuits, setCircuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <div className="text-primary text-center">Chargement...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
	
    <div className="container py-4">
      <h1 className="text-center mb-4">🌍 Nos circuits</h1>
      <div className="row">
        {circuits.map((circuit) => (
          <div className="col-md-6" key={circuit.id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{circuit.name}</h5>
                <p className="card-text">{circuit.description}</p>

                <Link to={`/circuit/${circuit.id}`} className="btn btn-outline-primary btn-sm">
                  Voir le détail
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
