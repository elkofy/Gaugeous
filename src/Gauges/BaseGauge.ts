import {
  DEFAULT_BACKGROUND_RECT,
  DEFAULT_GAUGE_RECT,
  DEFAULT_VIEWBOX,
} from "../Types/const";
import {
  svgElementCreator,
  svgAssetCreator,
  GaugeOptions,
  Gvalues,
} from "../Types/utilsType";
export default class BaseGauge {
  values: Gvalues;
  options?: GaugeOptions;
  gauge!: SVGElement;

  constructor(values: Gvalues, options?: GaugeOptions) {
    this.values = values;
    this.options = options;
  }

  getPercentage() {
    return this.values.value / this.values.max;
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
      backgroundRect = svgAssetCreator("rect", DEFAULT_BACKGROUND_RECT);
      gaugeRect = svgAssetCreator("rect", DEFAULT_GAUGE_RECT);
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
    let { width, height, colors } = this.options!;
    let { backgroundColor, strokeColor, fillColors } = colors!;
    let stroke = this.options!.stroke || 0;
    let percentage = this.getPercentage();
    backgroundRect = svgAssetCreator("rect", {
      x: stroke,
      y: stroke,
      width: width,
      height: height,
      fill: backgroundColor,
      stroke: strokeColor,
      strokeWidth: stroke,
      rx: this.options!.radius,
    });
    gaugeRect = svgAssetCreator("rect", {
      x: stroke,
      y: stroke,
      width: width! * percentage,
      height: height,
      fill: fillColors,
      stroke: strokeColor,
      strokeWidth: stroke,
      rx: this.options!.radius,
    });

    Array.isArray(this.options!.cssClass)
      ? (this.options!.cssClass = this.options!.cssClass.join(" "))
      : (this.options!.cssClass = this.options!.cssClass);

    svgViewBox = {
      width: width! + stroke,
      height: height! + stroke,
      viewBox: `0 0 ${width! + stroke * 2} ${height! + stroke * 2}`,
      preserveAspectRatio: "none",
      class: this.options!.cssClass,
      id: this.options!.id,
    };

    return [backgroundRect, gaugeRect, svgViewBox] as Array<SVGElement>;
  }

  render(element: HTMLElement) {
    this.createGauge();
    element.appendChild(this.gauge);
  }
}
