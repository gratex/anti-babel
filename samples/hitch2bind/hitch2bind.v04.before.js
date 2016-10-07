// Test for [FIXME] hitch2bind.v04 produces invalid JS

// run this to inline replace
// 		src/dojo/hitch2bind.v04 -i -c samples/hitch2bind/hitch2bind.v04.before.js
// or this to see result (without replace)
//		grasp -e 'lang.hitch($ctx,$f,_$args)' -R '{{f}}.bind({{ctx}}{{args | join ", " | before ", " }})' samples/hitch2bind/hitch2bind.v04.before.js

var lang, cntr, handles = [];
function myFunc1() {}
function myFunc2() {}
function myFunc3() {}

// [1] OK
handles.push(cntr.watchPausable("abc", lang.hitch(this, myFunc1)));
this.own(cntr.watch("def", lang.hitch(this, myFunc2)), cntr.watch("ghi", lang.hitch(this, myFunc3)));

// [2] BUGGY
// produced good position of myFunc3 in new code, 
// but original source code is shifted left due to first replacement (25 - 18 = 7) ???
/*
handles.push(cntr.watchPausable("abc", myFunc1.bind(this)));
this.own(cntr.watch("def", myFunc2.bind(this)), cntr.watch("ghi", lang.himyFunc3.bind(this)
*/
handles.push(cntr.watchPausable("abc", lang.hitch(this, // this new line is problem ??
	myFunc1)));
this.own(cntr.watch("def", lang.hitch(this, myFunc2)), cntr.watch("ghi", lang.hitch(this, myFunc3))); // invalid code will be produced here

// [3] same as [1] BUGGY NOW TOO !!!
handles.push(cntr.watchPausable("abc", lang.hitch(this, myFunc1)));
this.own(cntr.watch("def", lang.hitch(this, myFunc2)), cntr.watch("ghi", lang.hitch(this, myFunc3))); // invalid code will be produced here
