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

  const firstPoint = emissions[0];
  const lastPoint = emissions[emissions.length - 1];

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Emissions (MtCO2e)</th>
          </tr>
        </thead>
        <tbody>
          {emissions.map((point) => (
            <tr key={point.year}>
              <td>{point.year}</td>
              <td>{point.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <EmissionsChart data={emissions} />
    </main>
  );
}

export default App;