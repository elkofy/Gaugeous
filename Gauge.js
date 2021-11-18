const svgns = "http://www.w3.org/2000/svg";

class Gauge {
  constructor(id = "test", options = [0, 1, 2]) {
    this.id = id;
    this.options = options;
  }
  Test() {
    printSpacers();
    console.log("Gauge id : " + this.id);
    console.log("Options : " + Object.values(this.options));
    printSpacers();
  }
  Draw() {
    //initGauge();
    let svg_gauge = document.createElementNS(svgns, "svg");
    svg_gauge.id = "svgauge";
    let id2append = document.getElementById(this.id);
    id2append.innerHTML = "";
    id2append.appendChild(svg_gauge);
  }
}
function printSpacers() {
  console.log("---------------------------------------------");
}

class Options {
  constructor(width, height, scale, orientation, type) {
    this.width = width;
    this.height = height;
    this.scale = scale;
    this.orientation = orientation;
    this.type = type;
  }
  Test() {
    printSpacers();
    console.log("width : " + this.width);
    console.log("height : " + this.height);
    console.log("scale : " + this.scale);
    console.log("orientation : " + this.orientation);
    console.log("type : " + Object.values(this.type));
    printSpacers();
  }
  getSvg() {
    console.log(this.type.getGauge());
  }
}

class Type {
  constructor(name, colors, radius, svg) {
    this.name = name;
    this.colors = colors;
    this.radius = radius;
    this.svg = svg;
  }
  Test() {
    printSpacers();
    console.log("name : " + this.name);
    console.log("colors : " + this.colors);
    console.log("radius : " + this.radius);
    console.log("svg : " + this.svg);
    printSpacers();
  }

  getGauge() {
    var gauge;
    switch (this.name) {
      case "linear_prgss_gauge":
        gauge = this.getLinearProgressGauge();
        console.log("Progress gauge", gauge);
        break;
      case "linear_grad_gauge":
        gauge = this.getLinearGradGauge();
        console.log("Gradient gauge", gauge);
        break;
      case "linear_lvl_gauge":
        gauge = this.getLinearLvlGauge();
        console.log("Lvl gauge", gauge);
        break;
      default:
        gauge = getLinearProgressGauge();
        console.log(gauge);
        break;
    }
  }
  getLinearProgressGauge() {
    
    return "linear_prgss_gauge";
  }
  getLinearGradGauge() {
    return "linear_grad_gauge";
  }
  getLinearLvlGauge() {
    return "linear_lvl_gauge";
  }
}

// function initGauge() {
//   var defs = document.createElementNS(svgns, "defs");
//   var svg_gauge = document.createElementNS(svgns, "svg");
//   var svg_bgauge = document.createElementNS(svgns, "rect");
//   var svg_gradient = document.createElementNS(svgns, "linearGradient");
//   var svg_line = document.createElementNS(svgns, "line");
//   var svg_polygon = document.createElementNS(svgns, "polygon");
// }

let test_Type = new Type("linear_lvl_gauge", [1, 1, 3, 4], 5, "svg");
printSpacers();
test_Type.getGauge();
printSpacers();

let test_opt = new Options(400, 600, 1, "l", test_Type);

let test_gauge = new Gauge("test");
let test_gauge2 = new Gauge("id", test_opt);

test_gauge.Test();
test_gauge.Draw();

printSpacers();
test_opt.getSvg();

/* setInterval(() => {
  test_gauge.Draw();
}, 1000); */

test_gauge2.Test();
test_opt.Test();
test_opt.Test();
