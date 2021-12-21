/**
 * CONSTANTS
 */
const svgns = "http://www.w3.org/2000/svg";
/**
 * UTILITARIES
 */
 function initSvg(listsvg) {
  var svgs = [];
  listsvg.forEach((elem) => {
    svgs.push(document.createElementNS(svgns, elem));
  });
  return svgs;
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
function printSpacers() {
  console.log("---------------------------------------------");
}
/**
 * CLASS
 */

class Gauge {
  constructor(id = "test", type, value) {
    this.id = id;
    this.type = type;
    this.value = value;
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
        var lvl = new lvlGauge(this.value);
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
  constructor(value = 0, options = "none") {
    this.value = value;
    this.options = options;
  }
  getsvg() {
    let svgelem = initSvg(["svg", "rect", "rect"]);
    let props = {
      GaugeW: 200,
      GaugeH: 40,
      GaugeX: 10,
      GaugeY: 10,
      GaugeRY:20
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
    });

    svgelem[1] = Rect(svgelem[1], {
      id: "lvlgauge",
      width: props["GaugeW"],
      height: props["GaugeH"],
      x: props["GaugeX"],
      y: props["GaugeY"],
      fill: "grey",
      ry: props['GaugeRY'],
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
      ry: props['GaugeRY'],
    });

    svgelem[0].appendChild(svgelem[1]);
    svgelem[0].appendChild(svgelem[2]);

    return svgelem[0];
  }
}


/**
 * TESTS
 */
var gauge = new Gauge("test", "lvlgauge",1);
gauge.Draw();
