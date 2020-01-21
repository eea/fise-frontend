import * as d3 from 'd3';
import {scaleLinear, scaleBand} from 'd3-scale';

let node = null;

const area_chart = (svgWidth, svgHeight, data) => {
  if (node && node.tagName === 'DIV') {
    node.innerHTML = '';
  } else {
    node = document.createElement('div');
  }
  node.className = 'svg-container';
  // I. Default
  let margin = 0;
  let svg = {
    _el: null,
    width: svgWidth,
    height: svgHeight
  }
  let canvas = {
    _el: null,
    width: svg.width - 2 * margin,
    height: svg.height - 2 * margin
  }
  let scale = {
    x: null,
    y: null
  }
  let domain = {
    x: data.map(d => d.x),
    y: data.map(d => d.y)
  }
  //  II. Create d3 svg selection
  svg._el = d3
    .select(node)
      .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", `0 0 ${svg.width} ${svg.height}`)
  //  III. Create chart canvas
  canvas._el = svg._el
    .append("g")
      .attr("class", "canvas")
      .attr("transform", `translate(${margin}, ${margin})`)
  //  IV. Set scales
  scale.y = scaleLinear()
      .range([canvas.height, 0])
      .domain([ d3.min(domain.y), d3.max(domain.y) ])
  scale.x = scaleBand()
    .range([0, canvas.width])
    .domain(domain.x)
    .padding(0,2)
  //  V. Draw axis
  // canvas._el
  //   .append("g")
  //     .attr("class", "y axis")
  //     .call(
  //       d3
  //         .axisLeft(scale.y)  //  LEFT
  //         .tickSize(0)
  //         .tickSizeOuter(0)
  //         .tickPadding(10)
  //         .ticks(5)
  //     )
  // canvas._el
  //   .append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", `translate(0, ${canvas.height})`)
  //     .call(
  //       d3
  //         .axisBottom(scale.x)  //  BOTTOM
  //         .tickSize(0)
  //         .tickSizeOuter(0)
  //         .tickPadding(10)
  //         .ticks(5)
  //     )
  if (data.length === 0) {
    let x = canvas.width/2
    let y = canvas.height/2
    canvas._el
      .append("text")
        .text("No data")
        .attr("x", x)
        .attr("y", y)
  }
  //  VI. 
  //  DEFINE AREA
  let area = d3.area()
    .x(function(d) { return scale.x(d.x); })
    .y0(canvas.height)
    .y1(function(d) { return scale.y(d.y); });
  //  DEFINE THE LINE
  let line = d3.line()
    .x(function(d) { return scale.x(d.x); })
    .y(function(d) { return scale.y(d.y); });
  //  VII. DRAW
  canvas._el
    .append("path")
      .data([data])
      .attr("class", "area")
      .attr("d", area);
  canvas._el
    .append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", line);
  

  return node
  // // SVG
  // let svg = d3.select(node)
  //   .append("svg")
  //     .attr("viewBox",`0 0 ${svgWidth} ${svgHeight}`)
  //     .attr("preserveAspectRatio", "xMinYMin meet")
  //   .append("g")
  //     .attr("transform", "translate(" + Math.min(width,height) / 2 + "," + Math.min(width,height) / 2 + ")");

  // svg.append("path")
  //   .datum(data)
  //   .attr("class", "area")
  //   .attr("d", area);
    
  // svg.append("g")
  //   .attr("class", "x axis")
  //   .attr("transform", "translate(0," + height + ")")
  //   .call(xAxis);
  
  // svg.append("g")
  //   .attr("class", "y axis")
  //   .call(yAxis);
}

export default area_chart