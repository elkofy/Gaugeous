import { DEFAULT_VIEWBOX } from "../Types/const";
import { svgElementCreator, svgAssetCreator, GaugeOptions } from "../Types/utilsType";
export default class BaseGauge {
  value: number;
  maxValue: number;
  options?: GaugeOptions ;
  gauge!: SVGElement;

  constructor(value: number, maxValue: number, options?: GaugeOptions) {
    this.value = value;
    this.maxValue = maxValue;
    this.options = options;
  }

  getPercentage() {
    return this.value / this.maxValue;
  }

  createGauge() {
    let backgroundRect = svgAssetCreator("rect", {
      x: 0,
      y: 0,
      width: 300,
      height: 50,
      fill: "#f0f0f0",
      stroke: "black",
      strokeWidth: 1,
    }); 
    let gaugeRect = svgAssetCreator("rect", {
      x: 0,
      y: 0,
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
