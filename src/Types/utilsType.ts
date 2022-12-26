import { SVGNS } from "./const";

export const svgElementCreator = (tag: string): SVGElement => {
  return document.createElementNS(SVGNS, tag);
};
