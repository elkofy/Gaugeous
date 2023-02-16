import { SVGNS } from "./const";

export interface SvgOptions {
  width: number;
  height: number;
  viewBox: string;
  preserveAspectRatio: string;
}

export const svgElementCreator = (
  tag: string,
  options: SvgOptions
): SVGElement => {
  const svg = document.createElementNS(SVGNS, tag);
  svg.setAttribute("width", options.width.toString());
  svg.setAttribute("height", options.height.toString());
  svg.setAttribute("viewBox", options.viewBox);
  svg.setAttribute("preserveAspectRatio", options.preserveAspectRatio);
  return svg;
};

export const svgAssetCreator = (tag: string, options: any): SVGElement => {
  const svg = document.createElementNS(SVGNS, tag);
  options = Object.keys(options).reduce((acc: any, key) => {
    if (options[key] !== undefined) {
      acc[key] = options[key];
    }
    return acc;
  }, {});

  for (const key in options) {
    svg.setAttribute(camelToUnderscore(key), options[key]);
  }

  return svg;
};

function camelToUnderscore(key: string) {
  let spacedCamel = key.replace(/([A-Z])/g, " $1");
  return spacedCamel.split(" ").join("-").toLocaleLowerCase();
}

export type GaugeOptions = {
  type: string;
  width?: number;
  height?: number;
  radius?: number;
  colors?: Gcolors;
  placeholder?: string[];
  stroke?: number;
  scale?: number;
  animation?: Ganimation;
  cssClass?: string | string[];
  id?: string;
};

export type Gcolors = {
  backgroundColor?: string;
  fillColors?: string | string[];
  textColor?: string;
  strokeColor?: string;
};

export type Gvalues = {
  value: number;
  max: number;
  min?: number;
  percentage?: number;
};

export type Ganimation = {
  duration: number;
  delay: number;
  easing: string;
};

export type GaugeType =
  | "simple"
  | "gradient"
  | "cursors"
  | "placeholder"
  | "rounded";
