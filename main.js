const $ = require('zeptojs');
const map = require('./map.js');

$(document).ready(init);

function init() {
  var name = 'fact_map';
  var size = 550;
  var radius = 5;
  map.createHexmap(name, size, radius);

  $('#colorbutton').click(function () {
      map.updateHexmap(name);
    });
}
