
require(["dojo/string"], function(dstring) {
	
	//console.log(dstring);
	var x=" aaa ";
	var xx=dstring.trim(x);
	console.log("xx:"+xx);
	console.assert(xx==='aaa');


	var y=" aaa ";
	var yy=dstring.trim(y || "");
	console.log("yy:"+yy);
	console.assert(yy==='aaa');


	var z;
	var zz=dstring.trim(z || "");
	console.log("zz:"+zz);
	console.assert(zz==='');

});





