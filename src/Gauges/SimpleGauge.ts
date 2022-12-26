import { svgElementCreator } from "../Types/utilsType";
export class SimpleGauge {
  value: number;
  maxValue: number;

  constructor(value: number, maxValue: number) {
    this.value = value;
    this.maxValue = maxValue;
  }

  getPercentage() {
    return this.value / this.maxValue;
  }
  render(element: HTMLElement) {
    console.log("rendering");
    const gauge = svgElementCreator("svg");
    element.appendChild(gauge);
  }
}
