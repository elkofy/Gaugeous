import { DEFAULT_VIEWBOX } from "../Types/const";
import { svgElementCreator, svgAssetCreator } from "../Types/utilsType";
export default class BaseGauge {
  value: number;
  maxValue: number;
  options?: object;
  gauge!: SVGElement;

  constructor(value: number, maxValue: number) {
    this.value = value;
    this.maxValue = maxValue;
  }

  getPercentage() {
    return this.value / this.maxValue;
  }

  createGauge() {
    let backgroundRect = svgAssetCreator("rect", {
      x: 1,
      y: 1,
      width: 300,
      height: 50,
      fill: "#f0f0f0",
      stroke: "black",
      strokeWidth: 1,
    });
    let gaugeRect = svgAssetCreator("rect", {
      x: 1,
      y: 1,
      width: 100,
      height: 50,
      fill: "green",
      stroke: "black",
      strokeWidth: 1,
    });

    this.gauge.appendChild(backgroundRect);
    this.gauge.appendChild(gaugeRect);
  }

  render(element: HTMLElement) {
    this.gauge = svgElementCreator("svg", DEFAULT_VIEWBOX);
    this.createGauge();
    element.appendChild(this.gauge);
  }
}
