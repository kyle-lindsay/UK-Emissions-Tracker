import { useEffect } from "react";
import { loadEmissions } from "./api/emissions";

function App() {
  useEffect(() => {
    loadEmissions()
      .then((data) => {
        console.log("Emissions data:", data);
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