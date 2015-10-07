var _=require("lodash"),r;

// trivial v01
_.forEach([1,2,3],function(item){
	// some body here	
});


//lodash forEach returns arr, 
//Array forEach it always returns the value undefined and is not chainable

var arr1=[1,2,3],arr2;
// supported by v02
arr2=_.forEach(arr1,function(item){});
console.assert(arr1===arr2);
console.log(arr2);

var n=null;
arr2=_.forEach(n,function(item){});
console.assert(arr2===null);
console.log(arr2);

// not supported yet
var arr3=_.forEach(arr1,function(item){}).concat([4]);
console.assert(arr3!==arr1);
console.log(arr3);

// not supported yet
_.forEach(arr1,function(item){}).push(5);
console.assert(arr1.length===4);
console.log(arr1);

// TODO: support for return (return must be mapped to some or find)

