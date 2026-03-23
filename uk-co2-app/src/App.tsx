import { useEffect, useState } from "react";
import { loadEmissions } from "./api/emissions";
import type { EmissionsPoint } from "./types";

function App() {
  const [emissions, setEmissions] = useState<EmissionsPoint[]>([]);

  useEffect(() => {
    loadEmissions()
      .then((data) => {
        setEmissions(data);
      })
      .catch((err) => {
        console.error("Error loading emissions:", err);
      });
  }, []);

  return (
    <main>
      <h1>UK Emissions App</h1>
      <p>Check the console for data.</p>
    </main>
  );
}

export default App;