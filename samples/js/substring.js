var s = "0123456789";

var r1 = s.substring(5, s.length);
console.assert(r1 === "56789");

var r2 = s.substring(s.length - 6, s.length);
console.assert(r2 === "456789");

var r3 = s.substring(s.length - 6);
console.assert(r3 === "456789");

console.log(r1, r2, r3);
