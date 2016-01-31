const d3 = require('d3');
const d3_scale = require('d3-scale');


function createCameraHexmap(element_id, size, radius) {
  //get three variables, margin, width, height. width and height will be the dimensions of the svg container
  //this svg will be square.

  var margin = {top: 20, right: 40, bottom: 20, left: 20},
          width = size - margin.left - margin.right,
          height = size - margin.top - margin.bottom;

  var svg = d3.select('#' + element_id)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'hexmap')
            .attr('id', 'hexmap');

  d3.csv('./pixel_positions.csv')
      .row(function (csv_row) {
          return csv_row;
      })
      .get(function (error, rows) {
        var offsetX = width / 2.0;
        var offsetY = height / 2.0;

        var h = (Math.sqrt(3) / 2.0);

        var line = d3.svg.line()
                  .x(function(d)  { return d.x;  })
                  .y(function(d)  { return d.y;  })
                  .interpolate('linear');


          var polys = svg.selectAll('path')
                                .data(rows)
                              .enter()
                                .append('path')
                                .attr('d', function (d, i){
                                  var xp = d.pos_X*2*radius + offsetX;
                                  var yp = d.pos_Y*2*radius + offsetY;
                                  hexagonData = [
                                    { 'x': radius+xp,   'y': yp},
                                    { 'x': radius/2+xp,  'y': radius*h+yp},
                                    { 'x': -radius/2+xp,  'y': radius*h+yp},
                                    { 'x': -radius+xp,  'y': yp},
                                    { 'x': -radius/2+xp,  'y': -radius*h+yp},
                                    { 'x': radius/2+xp, 'y': -radius*h+yp}
                                  ];
                                  return line(hexagonData);
                                })
                                .style('fill', function (d) {return '#858587';});
      });
}

function updateHexmap(element_id, scale=d3_scale.scaleInferno(), duration = 150){
    var data =  d3.range(1440).map(d3.random.normal(2,2));

    var min_data = d3.min(data);
    var max_data = d3.max(data);

    var color = scale
      .domain([min_data, max_data]);

    svg = d3.select('#'+element_id + ' svg');
    var circles = svg.selectAll('path')
                          .data(data)
                          .transition()
                          .duration(duration)
                          .style('fill', function (d) {
                            return color(d);
                          });
}
module.exports={createHexmap:createCameraHexmap, updateHexmap:updateHexmap };
