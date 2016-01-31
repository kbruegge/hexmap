console.log("running main");
require('zeptojs');
const map = require("./map.js");
console.log(map)

$( document ).ready( init );
function init(){
    map.create_hexmap();
    $( "#colorbutton" ).click(map.update_hexmap);
}
