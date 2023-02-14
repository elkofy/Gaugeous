import { DEFAULT_VIEWBOX } from "../Types/const";
import {
  svgElementCreator,
  svgAssetCreator,
  GaugeOptions,
} from "../Types/utilsType";
export default class BaseGauge {
  value: number;
  maxValue: number;
  options?: GaugeOptions;
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
    let backgroundRect: SVGElement | undefined;
    let gaugeRect: SVGElement | undefined;
    let svgViewBox: any;
    if (this.options) {
      let svgGaugeElements = this.createGaugeWithOptions(
        backgroundRect,
        gaugeRect,
        svgViewBox
      );
      backgroundRect = svgGaugeElements[0];
      gaugeRect = svgGaugeElements[1];
      svgViewBox = svgGaugeElements[2];
    } else {
      backgroundRect = svgAssetCreator("rect", {
        x: 0,
        y: 0,
        width: 300,
        height: 50,
        fill: "#f0f0f0",
        stroke: "black",
        strokeWidth: 1,
      });
      gaugeRect = svgAssetCreator("rect", {
        x: 0,
        y: 0,
        width: 100,
        height: 50,
        fill: "green",
        stroke: "black",
        strokeWidth: 1,
      });
      svgViewBox = DEFAULT_VIEWBOX;
    }

    this.gauge = svgElementCreator("svg", svgViewBox);
    this.gauge.appendChild(backgroundRect);
    this.gauge.appendChild(gaugeRect);
  }

  createGaugeWithOptions(
    backgroundRect: SVGElement | undefined,
    gaugeRect: SVGElement | undefined,
    svgViewBox: any
  ): Array<SVGElement> {
    let { width, height, colors, stroke } = this.options!;
    let { backgroundColor, strokeColor , fillColors } = colors!;
    let percentage = this.getPercentage();
    console.log(height);
    backgroundRect = svgAssetCreator("rect", {
      x: 0,
      y: 0,
      width: width,
      height: height,
      fill: backgroundColor,
      stroke: strokeColor,
      strokeWidth: stroke,
    });
    gaugeRect = svgAssetCreator("rect", {
      x: 0,
      y: 0,
      width: width! * percentage,
      height: height,
      fill: fillColors,
      stroke: strokeColor,
      strokeWidth: stroke,
    });
    svgViewBox = {
      width: width!,
      height: height!,
      viewBox: `0 0 ${width} ${height}`,
      preserveAspectRatio: "none",
    };



    return [backgroundRect, gaugeRect, svgViewBox] as Array<SVGElement>;
  }

  render(element: HTMLElement) {
    this.createGauge();
    element.appendChild(this.gauge);
  }
}
