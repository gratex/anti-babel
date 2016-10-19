require(["dojo/json"], function(JSON){
  
  JSON.parse('{"hello":"world"}', true);
  
  JSON.stringify({"hello":"world"});

});
