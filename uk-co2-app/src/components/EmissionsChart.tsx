import type { EmissionsPoint } from "../types";

type EmissionsChartProps = {
  data: EmissionsPoint[];
};

function EmissionsChart({ data }: EmissionsChartProps) {
    const width = 800;
    const height = 400;

    const margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 60,
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    return (
        <svg width={width} height={height}>
        {/* background */}
        <rect x="0" y="0" width={width} height={height} fill="white" />

        {/* chart area */}
        <rect
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="#f9f9f9"
        />
        </svg>
    );
}

export default EmissionsChart;