"use strict"

const d3 = require('d3');
const d3_scale = require('d3-scale');

const IDs = require('./pixel_ids.js')

function Hexmap(parentID, size, radius, chid=true) {
  //Get three variables, margin, width, height. width and height will be the dimensions of the svg container
  //this svg will be square.
  this.parentID = parentID;
  var ids = new IDs()

  var   margin = { top: 20, right: 20, bottom: 20, left: 20 },
          width = size - margin.left - margin.right,
          height = size - margin.top - margin.bottom;

  var svg = d3.select('#' + parentID)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'hexmap')
            .attr('id', 'hexmap');

  var pixel_positions = ids.sorted_softid
  if(chid){
    pixel_positions = ids.sorted_chid
  }

  console.log(pixel_positions)
  var offsetX = width / 2.0;
  var offsetY = height / 2.0;

  var h = (Math.sqrt(3) / 2.0);

  var line = d3.svg.line()
            .x(function (d)  { return d.x;  })
            .y(function (d)  { return d.y;  })
            .interpolate('linear');

  var polys = svg.selectAll('path')
                        .data(pixel_positions)
                      .enter()
                        .append('path')
                          .attr('d', function (d, i) {
                            var xp = d.pos_X * 2 * radius + offsetX;
                            var yp = d.pos_Y * 2 * radius + offsetY;
                            var hexagonData = [
                              { x: radius + xp,   y: yp },
                              { x: radius / 2 + xp,  y: radius * h + yp },
                              { x: -radius / 2 + xp,  y: radius * h + yp },
                              { x: -radius + xp,  y: yp },
                              { x: -radius / 2 + xp,  y: -radius * h + yp },
                              { x: radius / 2 + xp, y: -radius * h + yp },
                            ];
                            return line(hexagonData);
                          })
                          .style('fill', '#888888')
                          .style('stroke', '#888888')
                          .style('stroke-width', '1')
                          .style('shape-rendering', 'geometricPrecision');

  this.update = function updateHexmap(data, duration = 150, scale=d3_scale.scaleInferno()) {
    var min_data = d3.min(data);
    var max_data = d3.max(data);

    var color = scale.domain([min_data, max_data]);

    svg = d3.select('#' + this.parentID + ' svg');
    if (duration === 0){
      var circles = svg.selectAll('path')
                            .data(data)
                            .style('fill', function (d) {
                              return color(d);
                            })
                            .style('stroke', function (d) {
                              return color(d);
                            });

    } else {
      var circles = svg.selectAll('path')
                            .data(data)
                            .transition()
                            .duration(duration)
                            .style('fill', function (d) {
                              return color(d);
                            })
                            .style('stroke', function (d) {
                              return color(d);
                            });
    }
  }
}

module.exports = Hexmap;
