const $ = require('zeptojs');
const map = require('./map.js');
const d3 = require('d3');

$(document).ready(init);

function init() {
  var parentID = 'fact_map';
  var size = 550;
  var radius = 5;
  this.camera = new map.Hexmap(parentID, size, radius);
  $("#colorbutton").click(
    $.proxy(function (){
      var data =  d3.range(1440).map(d3.random.normal(2, 2));
      this.camera.update(data, duration = 0);
    },this)
  );
}
