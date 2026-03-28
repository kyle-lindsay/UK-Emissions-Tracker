import type { EmissionsPoint } from "../types";
import {Line} from "../types";

export function calculateLineOfBestFit(data: EmissionsPoint[]): Line {
  let length = data.length;
  let gradient: number;
  let yIntercept: number;

  let sumX = calculateSum(data.map((point) => point.year));
  let sumY = calculateSum(data.map((point) => point.value));
  let sumXY = calculateSum(data.map((point) => point.year * point.value));
  let sumXSquared = calculateSum(data.map((point) => point.year ** 2));

  gradient = calculateGradient(sumX, sumY, sumXY, sumXSquared, length);

  let adjustedSumX = calculateSum(data.map((point) => point.year - 1990));
  yIntercept = calculateYIntercept(gradient, length, adjustedSumX, sumY);
  console.log("Gradient: " + gradient);
  console.log("Y-Intercept: " + yIntercept)
  
  return new Line(yIntercept, gradient);
}

function calculateSum(data : number[]) {
  let total = 0;
  data.forEach((element) => total += element);
  return total;
}

function calculateGradient(sumX: number, sumY: number, sumXY: number, sumXSquared: number, length: number) {
  let numerator = (length * sumXY) - (sumX * sumY);
  let denominator = (length * sumXSquared) - (sumX ** 2);
  return numerator / denominator;
}

function calculateYIntercept(gradient: number, length: number, sumX: number, sumY: number) {
  return (sumY - (gradient * sumX)) / length;
}