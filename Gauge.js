/**
 * CONSTANTS
 */
const svgns = "http://www.w3.org/2000/svg";
/**
 * UTILITARIES
 */
function initTextnodes(listnodes) {
  var txtNodes = [];
  listnodes.forEach((elem) => {
    txtNodes.push(document.createTextNode(elem));
  });
  return txtNodes;
}
function initSvg(listsvg) {
  var svgs = [];
  listsvg.forEach((elem) => {
    svgs.push(document.createElementNS(svgns, elem));
  });
  return svgs;
}
function SVGText(text, obj) {
  for (prop in obj) {
    text.setAttribute(prop, obj[prop]);
  }
  return text;
}
function initSvgs(params, num) {
  var multsvgs = [];
  for (let i = 0; i < num; i++) {
    let tempsvg = initSvg(params);
    multsvgs.push(tempsvg);
  }
  return multsvgs;
}
function Rect(rect, obj) {
  for (prop in obj) {
    rect.setAttribute(prop, obj[prop]);
  }
  return rect;
}
function SvgContainer(svg, obj) {
  for (prop in obj) {
    svg.setAttribute(prop, obj[prop]);
  }
  return svg;
}
function findLoc(el, arr, st, en) {
  st = st || 0;
  en = en || arr.length;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] > el) return i;
  }
  return en;
}
function printSpacers() {
  console.log("---------------------------------------------");
}
/**
 * CLASS
 */

class Gauge {
  constructor(id = "test", type, value, options = [1]) {
    this.id = id;
    this.type = type;
    this.value = value;
    this.options = options;
  }
  Test() {
    printSpacers();
    console.log("Gauge id : " + this.id);
    console.log("Options : " + Object.values(this.options));
    printSpacers();
  }
  Draw() {
    let currentgauge;
    switch (this.type) {
      case "lvlgauge":
        var lvl = new lvlGauge(this.value, this.options);
        currentgauge = lvl.getsvg();
        break;
      case "markergauge":
        var lvl = new markerGauge(this.value, this.options);
        currentgauge = lvl.getsvg();
        break;
      default:
        break;
    }
    let svg_gauge = currentgauge;
    svg_gauge.id = "svgauge";
    let id2append = document.getElementById(this.id);
    id2append.innerHTML = "";
    id2append.appendChild(svg_gauge);
  }
}

class lvlGauge {
  constructor(value = 0, options = [1], references = []) {
    this.value = value;
    this.options = options;
    this.references = references;
  }
  getsvg() {
    let svgelem = initSvg(["svg", "rect", "rect"]);
    let props = {
      GaugeW: 200,
      GaugeH: 40,
      GaugeX: 10,
      GaugeY: 10,
      GaugeRY: 20,
    };
    let gaugeval = (props["GaugeW"] * this.value) / 10;
    let colors = ["red", "yellow", "green"];
    let currentcolor = colors[0];
    if (this.value > 4) {
      currentcolor = colors[1];
      if (this.value > 7) {
        currentcolor = colors[2];
      }
    }
    svgelem[0] = SvgContainer(svgelem[0], {
      id: "lvlgauge",
      width: 400,
      height: 200,
      transform: "scale(" + this.options[0] + ")",
    });

    svgelem[1] = Rect(svgelem[1], {
      id: "lvlgauge",
      width: props["GaugeW"],
      height: props["GaugeH"],
      x: props["GaugeX"],
      y: props["GaugeY"],
      fill: "grey",
      ry: props["GaugeRY"],
    });

    if (this.value > 10) {
      gaugeval = props["GaugeW"];
    }
    if (this.value == 1) {
      gaugeval += 5;
    }

    svgelem[2] = Rect(svgelem[2], {
      id: "lvlgauge",
      width: gaugeval,
      height: props["GaugeH"],
      x: props["GaugeX"],
      y: props["GaugeY"],
      fill: currentcolor,
      ry: props["GaugeRY"],
    });

    svgelem[0].appendChild(svgelem[1]);
    svgelem[0].appendChild(svgelem[2]);

    return svgelem[0];
  }
}

class markerGauge {
  constructor(value = [0, 100, 55, 35, 50], options = [1]) {
    this.value = value;
    this.options = options;
  }
  getsvg() {
    let props = {
      GaugeW: 200,
      GaugeH: 40,
      GaugeX: 10,
      GaugeY: 10,
      GaugeRY: 5,
    };
    let propsmarkers = {
      GaugeW: 5,
      GaugeH: 40,
      GaugeX: 10,
      GaugeY: 10,
      GaugeRY: 3,
    };
    let svgelem = initSvg(["svg", "rect", "rect"]);
    let markers = this.value.slice(3, this.value.length).sort();
    console.log(markers);
    var textnodes = initTextnodes([...markers, this.value[2]]);

    let svgmarkers = initSvgs(["rect", "text"], markers.length);
    var xval = (this.value[2] * props["GaugeW"]) / this.value[1];

    for (let svgmki = 0; svgmki < svgmarkers.length; svgmki++) {
      var mkval = (markers[svgmki] * props["GaugeW"]) / this.value[1];

      svgmarkers[svgmki].forEach((element, idx) => {
        if (idx == 0) {
          element = Rect(element, {
            width: propsmarkers["GaugeW"],
            height: propsmarkers["GaugeH"],
            x: mkval + propsmarkers["GaugeW"],
            y: propsmarkers["GaugeY"],
            fill: "red",
            ry: propsmarkers["GaugeRY"],
          });
        } else {
          element = SVGText(element, {
            width: propsmarkers["GaugeW"],
            height: propsmarkers["GaugeH"],
            x: mkval + propsmarkers["GaugeW"],
            y: propsmarkers["GaugeY"] * 2 + 5 + propsmarkers["GaugeH"],
            fill: "black",
            ry: propsmarkers["GaugeRY"],
          });
        }
        element.appendChild(textnodes[svgmki]);
      });
    }

    svgelem[0] = SvgContainer(svgelem[0], {
      id: "markergauge",
      width: 400, 
      height: 200, 
      transform: "scale(" + this.options[0] + ")",
    });
    svgelem[1] = Rect(svgelem[1], {
      // rectangle
      width: props["GaugeW"], // width of the rectangle
      height: props["GaugeH"], // height of the rectangle
      x: props["GaugeX"], // x position of the rectangle
      y: props["GaugeY"], // y position of the rectangle
      fill: "grey", // fill color of the rectangle
      ry: props["GaugeRY"],
    });
    svgelem[2] = Rect(svgelem[2], {
      // rectangle
      width: xval,
      height: props["GaugeH"], 
      x: props["GaugeX"], 
      y: props["GaugeY"], 
      fill: "blue", 
      ry: props["GaugeRY"],
    });
    svgelem[0].appendChild(svgelem[1]);
    svgelem[0].appendChild(svgelem[2]);

    for (let svgmk = 0; svgmk < svgmarkers.length; svgmk++) {
      svgmarkers[svgmk].forEach((element) => {
        svgelem[0].appendChild(element);
      });
    }
    // svgelem[0].appendChild(svgmarkers[0][0]);

    return svgelem[0];
  }
}

/**
 * TESTS
 */

//Gauge one to ten with scale 1
var gauge = new Gauge("test", "lvlgauge", 1, [1]);
gauge.Draw();
//Gauge one to ten with scale 1
var marked_gauge = new Gauge(
  "testmarker",
  "markergauge",
  [0, 100, 28, 30, 50, 70, 90],
  [1]
);
marked_gauge.Draw();
