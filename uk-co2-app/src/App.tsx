import { useEffect, useState } from "react";
import { loadEmissions } from "./api/emissions";
import type { EmissionsPoint } from "./types";
import EmissionsChart from "./components/EmissionsChart";

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
      <EmissionsChart data={emissions} />
    </main>
  );
}

export default App;