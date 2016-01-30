function hex() {
  function log(message){
      $('#debug').append('<p>' + message + '</p>');
  }


  //get three variables, margin, width, height. width and height will be the dimensions of the svg container
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 960 - margin.top - margin.bottom;

var svg = d3.select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
var radius = 10;
var offset_x  = 0;
var offset_y  = 0;
d3.csv("./pixel_positions.csv")
    .row(function (csv_row) {
        // console.log(csv_row);
        // center = pixelCenter(csv_row, radius=10);
        //now paint stuff in here
        // console.log(center);
        // points.append(csv_row);
        offset_x = Math.max(offset_x, csv_row.pos_X);
        offset_y = Math.max(offset_y, csv_row.pos_Y);
        return csv_row;
    })
    .get(function(error, rows) {
        // console.log(error);
        // console.log(rows);

        var circles = svg.selectAll("circle")
                              .data(rows)
                            .enter()
                              .append("svg:circle")
                              .attr("cx", function (d, i){
                                return d.pos_X*2*radius + offset_x;
                              })
                              .attr("cy",  function (d, i){
                                return d.pos_Y*2*radius + offset_y;
                              });

        var circleAttributes = circles
                                      .attr("r", radius)
                                      .style("fill", function (d) {return "#858587";});
});





  var pixelCenter = function(d, radius){
      x = -d.pos_Y * radius;
      y = -d.pos_X * radius;
      return {id : d.id,  x:x, y:y };
  };

  // var color = d3.scale.linear()
  //     .domain([0, 20])
  //     .range(["white", "white"])
  //     .interpolate(d3.interpolateLab);
  //
  // var x = d3.scale.identity()
  //     .domain([0, width]);
  //
  // var y = d3.scale.linear()
  //     .domain([0, height])
  //     .range([height, 0]);
  //
  // var xAxis = d3.svg.axis()
  //     .scale(x)
  //     .orient("bottom")
  //     .tickSize(6, -height);
  //
  // var yAxis = d3.svg.axis()
  //     .scale(y)
  //     .orient("left")
  //     .tickSize(6, -width);
  //
  // var svg = d3.select("div#container").append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //     .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //
  // svg.append("g")
  //     .attr("class", "y axis")
  //     .call(yAxis);
  //
  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);


  //------------ load the csv and call the drawsvg function on success

  //
  //
  //
  //
  //
  // var colorFromId= function (number){
  //     //var normalized = number/255.0
  //     var color = tinycolor("#ea4040");
  //     color = tinycolor.spin(color, number/1440.0 * 255.0);
  //     //color = tinycolor.saturate(color, number/1440.0 * 255.0)
  //     //log(color.toHexString());
  //     //console.log(color.toHexString());
  //     return color.toHexString();
  // };
  //
  // function showcolors(){
  //     var circles = svg.selectAll("circle");
  //     var circleAttributes = circles.style("fill", function (d) {return colorFromId(d.id);});
  // }
  //
  // function showGreyScale(){
  //     var circles = svg.selectAll("circle");
  //     var circleAttributes = circles.style("fill", function (d) {return colorFromId(d.id);});
  // }
  // function showsoftids(){
  //     //console.log(d3.selectAll("#textid"));
  //
  //     d3.selectAll("#textid").remove();
  //
  //     var texts = svg.selectAll("textIds")
  //                 .data(points);
  //
  //     texts.enter().append("text")
  //         .text(softIDtext);
  //
  //     texts.attr("x", textCenterX)
  //         .attr("y", textCenterY)
  //         .attr("font-size", 7)
  //         .attr("font-family", "sans-serif")
  //         .attr("id","textid");
  // }

}
// main();
