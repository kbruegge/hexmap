function hex() {
  //get three variables, margin, width, height. width and height will be the dimensions of the svg container
  //this svg will be square.
  var size = 400;

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
          width = size - margin.left - margin.right,
          height = size - margin.top - margin.bottom;

  var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "hexmap")
            .attr("id", "main_hexmap");

    var radius = 4;
    d3.csv("./pixel_positions.csv")
        .row(function (csv_row) {
            return csv_row;
        })
        .get(function(error, rows) {
            var offset_x = width/2.0;
            var offset_y =height/2.0;
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
}

function update_hex(){
  // console.log("button clicked");
  var data =  d3.range(1440).map(d3.random.normal(2,2));

  var min_data = Math.min(...data);
  var max_data = Math.max(...data);

  var color = d3.scale.linear()
    .domain([min_data, max_data])
    .range(["orange", "steelblue"]);

  svg = d3.select("#main_hexmap");
  var circles = svg.selectAll("circle")
                        .data(data)
                        .style("fill", function (d) {
                          return color(d);
                        });
}
// main();

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
