import React, { useState } from "react";
import { Upload } from "lucide-react";

export default function App() {
  const [plants, setPlants] = useState([]);
  const [yardPlants, setYardPlants] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [blendMode, setBlendMode] = useState(false);

  const handleAddPlant = () => {
    if (!name || !image) return;
    const newPlant = {
      id: Date.now(),
      name,
      image: URL.createObjectURL(image),
    };
    setPlants([...plants, newPlant]);
    setName("");
    setImage(null);
  };

  const addToYard = (plant) => {
    setYardPlants([
      ...yardPlants,
      {
        ...plant,
        x: 50,
        y: 50,
        id: Date.now(),
      },
    ]);
  };

  const handleDrag = (e, id) => {
    const rect = e.currentTarget.parentElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setYardPlants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x, y } : p))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>🌿 Landscaping Designer</h1>

      <button onClick={() => setBlendMode(!blendMode)}>
        {blendMode ? "Disable Realistic Blend" : "Enable Realistic Blend"}
      </button>

      <div style={{ marginTop: 20 }}>
        <input
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button onClick={handleAddPlant}>Add Plant</button>
      </div>

      <h3>Plant Library</h3>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {plants.map((plant) => (
          <div
            key={plant.id}
            onClick={() => addToYard(plant)}
            style={{ cursor: "pointer" }}
          >
            <img src={plant.image} alt="" width={80} height={80} />
            <p>{plant.name}</p>
          </div>
        ))}
      </div>

      <h3>Yard Layout</h3>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 400,
          border: "1px solid #ccc",
          background: "#d4f5d4",
          marginTop: 10,
        }}
      >
        {yardPlants.map((plant) => (
          <img
            key={plant.id}
            src={plant.image}
            draggable
            onDragEnd={(e) => handleDrag(e, plant.id)}
            style={{
              position: "absolute",
              left: plant.x,
              top: plant.y,
              width: 60,
              height: 60,
              borderRadius: "50%",
              opacity: blendMode ? 0.8 : 1,
              mixBlendMode: blendMode ? "multiply" : "normal",
              cursor: "move",
            }}
          />
        ))}
      </div>
    </div>
  );
}
