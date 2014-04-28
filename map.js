

function main() {
    $('#softidbutton').click( function(){
        showsoftids();
    });
    $('#chidbutton').click( function(){
        showchids();
    });

var points = [];
var radius = 10,
    offset = 0;

//-------init the coordinate system and the svg thingy
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 960 - margin.top - margin.bottom;


var color = d3.scale.linear()
    .domain([0, 20])
    .range(["white", "white"])
    .interpolate(d3.interpolateLab);

var x = d3.scale.identity()
    .domain([0, width]);

var y = d3.scale.linear()
    .domain([0, height])
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickSize(6, -height);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickSize(6, -width);

var svg = d3.select("div#container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);


//------------ load the csv and call the drawsvg function on success
d3.csv("pixel-map-with-chids.csv")
    .row(function (d) { points.push(d); })
    .get(function(error, rows) {
        console.log(error);
        //console.log(points);
        drawSVG();
    });


    
//-------------
//   These functions get a row from the csv and return some stuff based on that data
// 
//    !!! X AND Y COORDINATES FROM  THE FACT-MAP ARE SWITCHED!!!!
//-------
var circleCenterX = function (d) {
        return -(d.pos_Y) * 2 * (radius + offset) +  width / 2; 
    };

var textCenterX = function (d){
    return circleCenterX(d) - (radius* 0.8); 
    };
var textCenterY = function (d){
    return circleCenterY(d) + (radius* 0.1); 
    };

var circleCenterY = function (d){
    return -(d.pos_X)*2*(radius + offset) +  width / 2; 
};

var softIDtext = function (d) {
        return d.softID;
};
var chIDtext = function (d) {
        return d.CHID;
};
    
    
//_-------------
  
var drawSVG = function () {
    var circles = svg.selectAll("circle")
                          .data(points)
                          .enter()
                          .append("circle");

    var circleAttributes = circles
                       .attr("cx", circleCenterX)
                       .attr("cy", circleCenterY)
                       .attr("r", radius)
                    .style("fill", function (d) { return "lightgrey"; });
    
    showchids();
    
};
        
    
//------- update the drawn text
function showchids(){
    d3.selectAll("#textid").remove();
    var texts = svg.selectAll("textIds")
                .data(points);
                
    texts.enter().append("text")
        .text(chIDtext);
    
    texts.attr("x", textCenterX)
        .attr("y", textCenterY)
        .attr("font-size", 7)
        .attr("font-family", "sans-serif")
        .attr("id","textid");
}
    
function showsoftids(){
    //console.log(d3.selectAll("#textid"));
    d3.selectAll("#textid").remove();
    
    var texts = svg.selectAll("textIds")
                .data(points);
                
    texts.enter().append("text")
        .text(softIDtext);
    
    texts.attr("x", textCenterX)
        .attr("y", textCenterY)
        .attr("font-size", 7)
        .attr("font-family", "sans-serif")
        .attr("id","textid");
    /*        
    texts.enter().append("text")
        .text(softIDtext);
    texts.exit().remove();
    
    texts.attr("x", textCenterX)
        .attr("y", textCenterY)
        .attr("font-size", 7)
        .attr("font-family", "sans-serif")
        .attr("id","textid");
      */          
}
    
    
};