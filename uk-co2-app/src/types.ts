export type EmissionsPoint = {
  year: number;
  value: number;
};

export class Line {
  yIntercept: number;
  gradient: number;

  constructor(yIntercept: number, gradient: number) {
    this.yIntercept = yIntercept;
    this.gradient = gradient;
  }

  getPoint(x: number) {
    return (this.gradient * x) + this.yIntercept;
  }
}