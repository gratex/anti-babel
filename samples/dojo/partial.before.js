require(["dojo/_base/lang"], function(lang) {

    var obj = {
        toString: function(a, b, c) {
            console.log(Array.prototype.join.call(arguments, ','));
        }
    };

    function fName(a, b, c) {
        console.log(Array.prototype.join.call(arguments, ','));
    }

    // normal call
    var f1 = obj.toString("f1", 10, 20);
    var f2 = fName("f2", 10, 20);

    var p1 = lang.partial(obj.toString, "p1", 10);
    var r1 = p1(20);

    var p2 = lang.partial(fName, "p2");
    var r2 = p2(10, 20);

    var p3 = lang.partial(obj.toString, "p3", 10);
    var r3b = p3(20);

    var p4 = lang.partial(function(a, b, c) {
        console.log(Array.prototype.join.call(arguments, ','));
    }, "p4");
    var r4b = p4(10, 20);

    // binded call bind
    var b1 = obj.toString.bind(null, "b1");
    var r3 = b1(10, 20);

    // binded call bind
    var b2 = fName.bind(null, "b2");
    var r4 = b2(10, 20);

    // hitch
    var h1 = lang.hitch(obj, "toString", "hitch");
    var r5 = h1(10, 20);

    // TODO
    // lang.partial(function(a, b) {
    //      return Array.prototype.join.call(arguments, ',');
    //    }, a)
    // lang.partial(fName,"param1","param2","param3","paramN")
    // lang.partial(obj.func, a("param"))

    var o = {
        p: 10,
        m: function(a) {
            //console.assert(this===global);
            return this.p + "," + a;
        }
    }
    console.assert(o.m("sample")==="10,sample");
    console.assert(lang.partial(o.m,"sample")()==="undefined,sample");

    // TODO: this one shell not be used 
    //lang.partial("on")
});
