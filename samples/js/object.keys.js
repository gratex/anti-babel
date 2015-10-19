var x = {
    a: 10,
    b: 20
};

var r = [];
for (var k in x) {
    r.push(k);
}
console.log(r);
console.assert(r[0] === 'a' && r[1] === 'b');

