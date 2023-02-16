import { GaugeOptions, Gvalues } from "../Types/utilsType";
import BaseGauge from "./BaseGauge";

export default class GradientGauge extends BaseGauge {
  //TODO: fix this gauge not working
    declare gauge: SVGElement;

  constructor(values: Gvalues, options?: GaugeOptions) {
    super(values, options);
  }
  createGauge(): void {
    console.log("GradientGauge");
  }
}
