import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://127.0.0.1:8000/list/circuits"; // sans SSL en local

const FamilyCircuits = () => {
  const { id } = useParams();
  const [circuits, setCircuits] = useState([]);
  const [familyName, setFamilyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const filtered = data.filter((c) => c.familly && String(c.familly.id) === String(id));
        if (filtered.length > 0) {
          setFamilyName(filtered[0].familly.name);
        }
        setCircuits(filtered);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-primary text-center">Chargement...</div>;
  if (error) return <div className="text-danger text-center">{error}</div>;

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-secondary mb-3">← Retour aux familles</Link>
      <h2 className="mb-4">📦 Circuits de la famille : {familyName}</h2>

      {circuits.length === 0 ? (
        <p>Aucun circuit trouvé pour cette famille.</p>
      ) : (
        <div className="row">
          {circuits.map((circuit) => (
            <div key={circuit.id} className="col-md-6">
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
      )}
    </div>
  );
};

export default FamilyCircuits;
