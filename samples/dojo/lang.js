require([
	"dojo/_base/lang"
], function(lang) {

	function fn1() {
	}

	var val, arr = [];
	var isArr = val || !lang.isArray(val);
	var isFn = val || !lang.isFunction(val);

	if (lang.isFunction(fn1)) {
		fn1();
	}

	if (lang.isArray(arr)) {
		arr.forEach(fn1);
	}
});