import type { EmissionsPoint } from "../types";
import {Line} from "../types";
import "../lib/lineOfBestFit.ts";
import { calculateLineOfBestFit } from "../lib/lineOfBestFit.ts";
import { useState } from "react";

type EmissionsChartProps = {
  data: EmissionsPoint[];
};

type pointHover = {
    x: number;
    y: number;
    point: EmissionsPoint;
}

function EmissionsChart({ data }: EmissionsChartProps) {
    const screenWidth = document.body.clientWidth
    const width = screenWidth * 2/3;
    const height = screenWidth * 1/3;

    const [hovered, setHovered] = useState<{
        point: EmissionsPoint;
        x: number;
        y: number;
    } | null>(null);

    const margin = {
        top: 30,
        right: 20,
        bottom: 40,
        left: 60,
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const years = data.map((point) => point.year);
    const values = data.map((point) => point.value);

    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values) + 50;

    const xScale = (year: number) => {
        return margin.left + ((year - minYear) / (maxYear - minYear)) * innerWidth;
    };

    const yScale = (value: number) => {
        return margin.top + innerHeight - ((value - minValue) / (maxValue - minValue)) * innerHeight;
    };

    const chartPoints = data.map((point) => ({
        x: xScale(point.year),
        y: yScale(point.value),
    }));

    const linePath = chartPoints
    .map((point, index) => {
        const command = index === 0 ? "M" : "L";
        return `${command} ${point.x} ${point.y}`;
    }).join(" ");

    const lineOfBestFit: Line = calculateLineOfBestFit(data);
    const bestFitStart: EmissionsPoint = {year: minYear, value: lineOfBestFit.getPoint(0)}
    const bestFitEnd: EmissionsPoint = {year: maxYear, value: lineOfBestFit.getPoint(maxYear - minYear)}
    
    const bestFitData = [bestFitStart, bestFitEnd];

    const bestFitPoints = bestFitData.map((point) => ({
        x: xScale(point.year),
        y: yScale(point.value),
    }));

    const bestFitPath = bestFitPoints
    .map((point, index) => {
        const command = index === 0 ? "M" : "L";
        return `${command} ${point.x} ${point.y}`;
    }).join(" ")

    return (
        <svg width={width} height={height}>
        {/* background */}
        <rect x="0" y="0" width={width} height={height} id="graphContainer" />

        {/* chart area */}
        <rect
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            className="graph-bg"
        />

        <text
            x={width / 2}
            y={20}
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            >
            UK Greenhouse Gas Emissions
        </text>

        <text
            x={15}
            y={margin.top + innerHeight / 2}
            textAnchor="middle"
            fontSize="12"
            transform={`rotate(-90, 15, ${margin.top + innerHeight / 2})`}
            >
            MtCO2e
        </text>

        <text
            x={width / 2}
            y={height +margin.top - 40}
            textAnchor="middle"
            fontSize="12"
            >
            Year
        </text>

        {/* X axis */}
        <line
        x1={margin.left}
        y1={margin.top + innerHeight}
        x2={margin.left + innerWidth}
        y2={margin.top + innerHeight}
        stroke="black"
        />

        {/* Y axis */}
        <line
        x1={margin.left}
        y1={margin.top}
        x2={margin.left}
        y2={margin.top + innerHeight}
        stroke="black"
        />

        <text
            x={margin.left}
            y={margin.top + innerHeight + 20}
            textAnchor="middle"
            fontSize="12"
            >
            {minYear}
        </text>

        <text
            x={margin.left + innerWidth}
            y={margin.top + innerHeight + 20}
            textAnchor="middle"
            fontSize="12"
            >
            {maxYear}
        </text>

        <text
            x={margin.left - 10}
            y={margin.top + innerHeight}
            textAnchor="end"
            fontSize="12"
            >
            {Math.round(minValue)}
        </text>

        <text
            x={margin.left - 10}
            y={margin.top}
            textAnchor="end"
            fontSize="12"
            >
            {Math.round(maxValue)}
            </text>

        <path
            d={bestFitPath}
            fill="none"
            stroke="red"
            strokeWidth={2}
        />

        <path
            d={linePath}
            fill="none"
            stroke="steelblue"
            strokeWidth={2}
        />

       {chartPoints.map((p, i) => {
            const point = data[i];

            return (
                <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={5}
                fill="steelblue"
                onMouseOver={() =>
                    setHovered({
                    point,
                    x: p.x,
                    y: p.y,
                    })
                }
                onMouseOut={() => setHovered(null)}
                />
            );
            })}

            {hovered && (
                <>
                    <rect
                    x={hovered.x - 45}
                    y={hovered.y - 50}
                    width={90}
                    height={32}
                    stroke="black"
                    className="graph-bg"
                    rx={4}
                    />
                    <text
                    x={hovered.x}
                    y={hovered.y - 30}
                    textAnchor="middle"
                    fontSize="12"
                    >
                    {hovered.point.year} | {hovered.point.value.toFixed(1)}
                    </text>
                </>
                )}

        </svg>
    );
}

export default EmissionsChart;