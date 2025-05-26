import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_URL = "https://127.0.0.1:8000/list/circuits"; // ⚠️ http recommandé en local

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
      <Link to="/" className="btn btn-secondary mb-3">← Retour à la liste</Link>

      <h2>{circuit.name}</h2>
      <p>{circuit.description}</p>

      {circuit.packs && circuit.packs.length > 0 && (
        <>
          <h5>Packs disponibles :</h5>
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
            <strong>Prix :</strong>{" "}
            <span className="badge bg-success">{circuit.packs[selectedPackIndex].price} €</span>

          </div>

          {circuit.packs[selectedPackIndex].description && (
            <p className="text-muted">{circuit.packs[selectedPackIndex].description}</p>
          )}
        </>
      )}

      {circuit.itineraryDays && circuit.itineraryDays.length > 0 && (
        <>
          <h5>Itinéraire :</h5>
          <ol className="list-group list-group-numbered">
            {circuit.itineraryDays.map((day, i) => (
              <li key={i} className="list-group-item">
                <strong>Jour {day.dayNumber} :</strong> {day.description}
                {day.details && day.details.length > 0 && (
                  <ul className="mt-2">
                    {day.details.map((detail, j) => (
                      <li key={j}>
                        {detail.timeSlot} h – {detail.description}
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
