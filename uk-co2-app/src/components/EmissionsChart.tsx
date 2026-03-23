import type { EmissionsPoint } from "../types";

type EmissionsChartProps = {
  data: EmissionsPoint[];
};

function EmissionsChart({ data }: EmissionsChartProps) {
  return <p>Chart placeholder. Data points: {data.length}</p>;
}

export default EmissionsChart;