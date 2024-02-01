
# anti-babel

## TL;DR;
Refactorings from proptietary libraries code to ES5, ES6 constructions.

See also more general project called [lebab](https://github.com/mohebifar/lebab)

NOTE: The code of scripts DOES NOT cover all possible scenarios,
some usages of api may not me matched, or we just do not want
to automate their usage (working on safest possible scenarios, but sometimes it is better to convert border cases by humans).
You are always welcomed to CONTRIBUTE another variants.


Currently available refactoring scripts:

- all
- dojo/array.indexOf
- dojo/array.map
- dojo/df.keys
- dojo/dstring.trim
- dojo/hitch2bind
- dojo/lang.isArray
- dojo/lang.isFunction
- dojo/partial2bind
- js/for2map
- js/object.keys
- js/substring.length
- js/substring.tail
- lodash/array.forEach
- node/mkdirp.sync



Install external tools:

	npm install -g grasp 	#yes for now as global, sorry

Apply refactoring (on sample files)

	< samples/hitch2bind/hitch2bind.before.js src/dojo/hitch2bind.v01 # NOTE: should apply all versions step by step

Check what is changed and if behaves same (naive samples for now):

	# before: print source and results

	< samples/lodash/array.forEach.js tee /dev/fd/2 | node
	
	# after: print source and results

	< samples/lodash/array.forEach.js ./src/lodash/array.forEach.v02 | tee /dev/fd/2 | node

	# for dojo samples use dnode

	< samples/dojo/dstring.trim.js src/dojo/dstring.trim.v01  | tee x.js; dnode x.js; rm x.js

Run on your project:
	
	# set anti-babel root to path
	AB=$PWD

	# cd to your project/js folder
	# run all or one of

	$AB/src/dojo/array.indexOf.v01 -i -r .
	$AB/src/dojo/array.map.v01 -i -r .
	$AB/src/dojo/array.map.v02 -i -r .
	$AB/src/dojo/df.keys.v01 -i -r .
	$AB/src/dojo/dstring.trim.v01 -i -r .
	$AB/src/dojo/dstring.trim.v02 -i -r .
	$AB/src/dojo/hitch2bind.v01 -i -r .
	$AB/src/dojo/hitch2bind.v02 -i -r .
	$AB/src/dojo/hitch2bind.v03 -i -r .
	$AB/src/dojo/hitch2bind.v04 -i -r .
	$AB/src/dojo/lang.isArray.v01 -i -r .
	$AB/src/dojo/lang.isFunction.v01 -i -r .
	$AB/src/dojo/partial2bind.v01 -i -r .
	$AB/src/js/for2map.v01 -i -r .
	$AB/src/js/for2map.v02 -i -r .
	$AB/src/js/for2map.v03 -i -r .
	$AB/src/js/object.keys.v01 -i -r .
	$AB/src/js/substring.length -i -r .
	$AB/src/js/substring.tail -i -r .
	$AB/src/lodash/array.forEach.v00 -i -r .
	$AB/src/lodash/array.forEach.v01 -i -r .
	$AB/src/lodash/array.forEach.v02 -i -r .
	$AB/src/lodash/array.forEach.v03 -i -r .
	$AB/src/node/mkdirp.sync.v00 -i -r .
	# review
	git diff

	# test

Study [grasp.js](http://www.graspjs.com/) for CLI parameters (we pass all to underlying grasp now)

## Details

There are [plenty of projects](https://github.com/addyosmani/es6-tools) to translate es6 syntax to older syntaxes.
This allows you to write modern syntax and run on 'old machines'.

This project is opposite.

Helping you to 
CONVERT OLD CODE BASE TO NEW API AND SYNTAX.
(hence anti- in the name and [babel](https://babeljs.io) as one of 'them'.)

## Background

We are writing JavaScript from 'dark ages' (somewhere 19XX), and 
we are running big projects, this means we have to maintain them,
for ages sometimes.

This could help to modernize them into something more readable today.

Today we are developing in dojo, so many samples may involve 'old dojo' APIs and 
refactoring to ES5,6 APIs, but the idea can be taken to other codes as well.

To see if you can/should refactor you can use [compat-tables as UI](https://kangax.github.io/compat-table/es6/) 
or [out CLI](https://github.com/gratex/compat-table)


## dojo

We are developing in dojo.
Dojo contains a lot of good ideas, but a lot of APIs is not needed anymore.

For Example 

[dojo/string/trim](https://dojotoolkit.org/reference-guide/1.7/dojo/string/trim.html) vs.
[String.prototype.trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) 


# 'Unlearn dojo', learn es5,6

es5 features mapped to dojo apis. This is only approx mapping and
for caveats you must learn both APIs, to understand if you can(not) refactor:

ES5 features mapped to dojo API, all of these except strict mode are supported in IE9.

es | dojo
---|-----
Object.create|-
Object.defineProperty|-
Object.defineProperties|-
Object.getPrototypeOf|-
Object.keys|df.keys 
Object.seal|-
Object.freeze|-
Object.preventExtensions|-
Object.isSealed|-
Object.isFrozen|-
Object.isExtensible|-
Object.getOwnPropertyDescriptor|-
Object.getOwnPropertyNames|-
Date.prototype.toISOString|date/stamp.toISOString
Date.now|-
Array.isArray|\_base/lang.isArray
JSON|json|-
Function.prototype.bind|\_base/lang.hitch, \_base/lang.partial
String.prototype.trim|\_base/lang.trim
Array.prototype.indexOf|\_base/array.indexOf
Array.prototype.lastIndexOf|\_base/array.lastIndexOf
Array.prototype.every|\_base/array.every
Array.prototype.some|\_base/array.some
Array.prototype.forEach|\_base/array.forEach
Array.prototype.map|\_base/array.map
Array.prototype.filter|\_base/array.filter
Array.prototype.reduce|lang/functional/reduce
Array.prototype.reduceRight|lang/functional/reduceRight
Getter in property initializer|-
Setter in property initializer|-
Property access on strings|-
Reserved words as property names|-
Zero-width chars in identifiers|-
parseInt() ignores leading zeros|-
Immutable undefined|-
Strict mode|-

Note: es5,6 features derived from compat-tables


	node ../compat-table/cli.js es6 tests | jsontool -a name > es5.txt
	node ../compat-table/cli.js es6 tests | jsontool -a name > es6.txt
	node ../compat-table/cli.js es7 tests | jsontool -a name > es7.txt


ES6 features (TODO: mapping)

es | dojo
---|-----
proper tail calls (tail call optimisation) - direct recursion|-
proper tail calls (tail call optimisation) - mutual recursion|-
default function parameters - basic functionality|-
default function parameters - explicit undefined defers to the default|-
default function parameters - defaults can refer to previous params|-
default function parameters - arguments object interaction|-
default function parameters - temporal dead zone|-
default function parameters - separate scope|-
default function parameters - new Function() support|-
rest parameters - basic functionality|-
rest parameters - function 'length' property|-
rest parameters - arguments object interaction|-
rest parameters - can't be used in setters|-
rest parameters - new Function() support|-
spread (...) operator - with arrays, in function calls|-
spread (...) operator - with arrays, in array literals|-
spread (...) operator - with sparse arrays, in function calls|-
spread (...) operator - with sparse arrays, in array literals|-
spread (...) operator - with strings, in function calls|-
spread (...) operator - with strings, in array literals|-
spread (...) operator - with astral plane strings, in function calls|-
spread (...) operator - with astral plane strings, in array literals|-
spread (...) operator - with generator instances, in calls|-
spread (...) operator - with generator instances, in arrays|-
spread (...) operator - with generic iterables, in calls|-
spread (...) operator - with generic iterables, in arrays|-
spread (...) operator - with instances of iterables, in calls|-
spread (...) operator - with instances of iterables, in arrays|-
spread (...) operator - spreading non-iterables is a runtime error|-
object literal extensions - computed properties|-
object literal extensions - shorthand properties|-
object literal extensions - shorthand methods|-
object literal extensions - string-keyed shorthand methods|-
object literal extensions - computed shorthand methods|-
object literal extensions - computed accessors|-
for..of loops - with arrays|-
for..of loops - with sparse arrays|-
for..of loops - with strings|-
for..of loops - with astral plane strings|-
for..of loops - with generator instances|-
for..of loops - with generic iterables|-
for..of loops - with instances of generic iterables|-
for..of loops - iterator closing, break|-
for..of loops - iterator closing, throw|-
octal and binary literals - octal literals|-
octal and binary literals - binary literals|-
octal and binary literals - octal supported by Number()|-
octal and binary literals - binary supported by Number()|-
template strings - basic functionality|-
template strings - toString conversion|-
template strings - tagged template strings|-
template strings - passed array is frozen|-
template strings - line break normalisation|-
RegExp "y" and "u" flags - "y" flag|-
RegExp "y" and "u" flags - "y" flag, lastIndex|-
RegExp "y" and "u" flags - "u" flag|-
RegExp "y" and "u" flags - "u" flag, Unicode code point escapes|-
destructuring - with arrays|-
destructuring - with sparse arrays|-
destructuring - with strings|-
destructuring - with astral plane strings|-
destructuring - with generator instances|-
destructuring - with generic iterables|-
destructuring - with instances of generic iterables|-
destructuring - iterator closing|-
destructuring - iterable destructuring expression|-
destructuring - chained iterable destructuring|-
destructuring - trailing commas in iterable patterns|-
destructuring - with objects|-
destructuring - object destructuring with primitives|-
destructuring - trailing commas in object patterns|-
destructuring - object destructuring expression|-
destructuring - parenthesised left-hand-side is a syntax error|-
destructuring - chained object destructuring|-
destructuring - throws on null and undefined|-
destructuring - computed properties|-
destructuring - multiples in a single var statement|-
destructuring - nested|-
destructuring - in parameters|-
destructuring - in parameters, 'arguments' interaction|-
destructuring - in parameters, new Function() support|-
destructuring - in parameters, function 'length' property|-
destructuring - in for-in loop heads|-
destructuring - in for-of loop heads|-
destructuring - rest|-
destructuring - nested rest|-
destructuring - empty patterns|-
destructuring - empty patterns in parameters|-
destructuring - defaults|-
destructuring - defaults in parameters|-
destructuring - defaults, let temporal dead zone|-
destructuring - defaults in parameters, separate scope|-
destructuring - defaults in parameters, new Function() support|-
Unicode code point escapes - in strings|-
Unicode code point escapes - in identifiers|-
new.target - in constructors|-
new.target - assignment is an early error|-
const - basic support|-
const - is block-scoped|-
const - redefining a const is an error|-
const - temporal dead zone|-
const - basic support (strict mode)|-
const - is block-scoped (strict mode)|-
const - redefining a const (strict mode)|-
const - temporal dead zone (strict mode)|-
let - basic support|-
let - is block-scoped|-
let - for-loop statement scope|-
let - temporal dead zone|-
let - for-loop iteration scope|-
let - basic support (strict mode)|-
let - is block-scoped (strict mode)|-
let - for-loop statement scope (strict mode)|-
let - temporal dead zone (strict mode)|-
let - for-loop iteration scope (strict mode)|-
block-level function declaration|-
arrow functions - 0 parameters|-
arrow functions - 1 parameter, no brackets|-
arrow functions - multiple parameters|-
arrow functions - lexical "this" binding|-
arrow functions - "this" unchanged by call or apply|-
arrow functions - can't be bound, can be curried|-
arrow functions - lexical "arguments" binding|-
arrow functions - no line break between params and <code>=></code>|-
arrow functions - correct precedence|-
arrow functions - no "prototype" property|-
arrow functions - lexical "super" binding|-
arrow functions - lexical "new.target" binding|-
class - class statement|-
class - is block-scoped|-
class - class expression|-
class - anonymous class|-
class - constructor|-
class - prototype methods|-
class - string-keyed methods|-
class - computed prototype methods|-
class - static methods|-
class - computed static methods|-
class - accessor properties|-
class - computed accessor properties|-
class - static accessor properties|-
class - computed static accessor properties|-
class - class name is lexically scoped|-
class - computed names, temporal dead zone|-
class - methods aren't enumerable|-
class - implicit strict mode|-
class - constructor requires new|-
class - extends|-
class - extends expressions|-
class - extends null|-
class - new.target|-
super - statement in constructors|-
super - expression in constructors|-
super - in methods, property access|-
super - in methods, method calls|-
super - method calls use correct "this" binding|-
super - constructor calls use correct "new.target" binding|-
super - is statically bound|-
super - super() invokes the correct constructor|-
generators - basic functionality|-
generators - generator function expressions|-
generators - correct "this" binding|-
generators - can't use "this" with new|-
generators - sending|-
generators - %GeneratorPrototype%|-
generators - %GeneratorPrototype%.constructor|-
generators - %GeneratorPrototype%.throw|-
generators - %GeneratorPrototype%.return|-
generators - yield operator precedence|-
generators - yield \*, arrays|-
generators - yield \*, sparse arrays|-
generators - yield \*, strings|-
generators - yield \*, astral plane strings|-
generators - yield \*, generator instances|-
generators - yield \*, generic iterables|-
generators - yield \*, instances of iterables|-
generators - yield \* on non-iterables is a runtime error|-
generators - yield \*, iterator closing|-
generators - yield \*, iterator closing via throw()|-
generators - shorthand generator methods|-
generators - string-keyed shorthand generator methods|-
generators - computed shorthand generators|-
generators - shorthand generator methods, classes|-
generators - computed shorthand generators, classes|-
typed arrays - Int8Array|-
typed arrays - Uint8Array|-
typed arrays - Uint8ClampedArray|-
typed arrays - Int16Array|-
typed arrays - Uint16Array|-
typed arrays - Int32Array|-
typed arrays - Uint32Array|-
typed arrays - Float32Array|-
typed arrays - Float64Array|-
typed arrays - DataView (Int8)|-
typed arrays - DataView (Uint8)|-
typed arrays - DataView (Int16)|-
typed arrays - DataView (Uint16)|-
typed arrays - DataView (Int32)|-
typed arrays - DataView (Uint32)|-
typed arrays - DataView (Float32)|-
typed arrays - DataView (Float64)|-
typed arrays - ArrayBuffer[Symbol.species]|-
typed arrays - constructors require new|-
typed arrays - constructors accepts generic iterables|-
typed arrays - correct prototype chains|-
typed arrays - %TypedArray%.from|-
typed arrays - %TypedArray%.of|-
typed arrays - %TypedArray%.prototype.subarray|-
typed arrays - %TypedArray%.prototype.join|-
typed arrays - %TypedArray%.prototype.indexOf|-
typed arrays - %TypedArray%.prototype.lastIndexOf|-
typed arrays - %TypedArray%.prototype.slice|-
typed arrays - %TypedArray%.prototype.every|-
typed arrays - %TypedArray%.prototype.filter|-
typed arrays - %TypedArray%.prototype.forEach|-
typed arrays - %TypedArray%.prototype.map|-
typed arrays - %TypedArray%.prototype.reduce|-
typed arrays - %TypedArray%.prototype.reduceRight|-
typed arrays - %TypedArray%.prototype.reverse|-
typed arrays - %TypedArray%.prototype.some|-
typed arrays - %TypedArray%.prototype.sort|-
typed arrays - %TypedArray%.prototype.copyWithin|-
typed arrays - %TypedArray%.prototype.find|-
typed arrays - %TypedArray%.prototype.findIndex|-
typed arrays - %TypedArray%.prototype.fill|-
typed arrays - %TypedArray%.prototype.keys|-
typed arrays - %TypedArray%.prototype.values|-
typed arrays - %TypedArray%.prototype.entries|-
typed arrays - %TypedArray%.prototype[Symbol.iterator]|-
typed arrays - %TypedArray%[Symbol.species]|-
Map - basic functionality|-
Map - constructor arguments|-
Map - constructor requires new|-
Map - constructor accepts null|-
Map - constructor invokes set|-
Map - iterator closing|-
Map - Map.prototype.set returns this|-
Map - -0 key converts to +0|-
Map - Map.prototype.size|-
Map - Map.prototype.delete|-
Map - Map.prototype.clear|-
Map - Map.prototype.forEach|-
Map - Map.prototype.keys|-
Map - Map.prototype.values|-
Map - Map.prototype.entries|-
Map - Map.prototype[Symbol.iterator]|-
Map - Map iterator prototype chain|-
Map - Map[Symbol.species]|-
Set - basic functionality|-
Set - constructor arguments|-
Set - constructor requires new|-
Set - constructor accepts null|-
Set - constructor invokes add|-
Set - iterator closing|-
Set - Set.prototype.add returns this|-
Set - -0 key converts to +0|-
Set - Set.prototype.size|-
Set - Set.prototype.delete|-
Set - Set.prototype.clear|-
Set - Set.prototype.forEach|-
Set - Set.prototype.keys|-
Set - Set.prototype.values|-
Set - Set.prototype.entries|-
Set - Set.prototype[Symbol.iterator]|-
Set - Set iterator prototype chain|-
Set - Set[Symbol.species]|-
WeakMap - basic functionality|-
WeakMap - constructor arguments|-
WeakMap - constructor requires new|-
WeakMap - constructor accepts null|-
WeakMap - constructor invokes set|-
WeakMap - frozen objects as keys|-
WeakMap - iterator closing|-
WeakMap - WeakMap.prototype.set returns this|-
WeakMap - WeakMap.prototype.delete|-
WeakMap - no WeakMap.prototype.clear method|-
WeakSet - basic functionality|-
WeakSet - constructor arguments|-
WeakSet - constructor requires new|-
WeakSet - constructor accepts null|-
WeakSet - constructor invokes add|-
WeakSet - iterator closing|-
WeakSet - WeakSet.prototype.add returns this|-
WeakSet - WeakSet.prototype.delete|-
WeakSet - no WeakSet.prototype.clear method|-
Proxy - constructor requires new|-
Proxy - "get" handler|-
Proxy - "get" handler, instances of proxies|-
Proxy - "set" handler|-
Proxy - "set" handler, instances of proxies|-
Proxy - "has" handler|-
Proxy - "has" handler, instances of proxies|-
Proxy - "deleteProperty" handler|-
Proxy - "getOwnPropertyDescriptor" handler|-
Proxy - "defineProperty" handler|-
Proxy - "getPrototypeOf" handler|-
Proxy - "setPrototypeOf" handler|-
Proxy - "isExtensible" handler|-
Proxy - "preventExtensions" handler|-
Proxy - "enumerate" handler|-
Proxy - "ownKeys" handler|-
Proxy - "apply" handler|-
Proxy - "construct" handler|-
Proxy - Proxy.revocable|-
Proxy - Array.isArray support|-
Proxy - JSON.stringify support|-
Reflect - Reflect.get|-
Reflect - Reflect.set|-
Reflect - Reflect.has|-
Reflect - Reflect.deleteProperty|-
Reflect - Reflect.getOwnPropertyDescriptor|-
Reflect - Reflect.defineProperty|-
Reflect - Reflect.getPrototypeOf|-
Reflect - Reflect.setPrototypeOf|-
Reflect - Reflect.isExtensible|-
Reflect - Reflect.preventExtensions|-
Reflect - Reflect.enumerate|-
Reflect - Reflect.ownKeys, string keys|-
Reflect - Reflect.ownKeys, symbol keys|-
Reflect - Reflect.apply|-
Reflect - Reflect.construct|-
Reflect - Reflect.construct sets new.target meta property|-
Reflect - Reflect.construct creates instance from newTarget argument|-
Promise - basic functionality|-
Promise - constructor requires new|-
Promise - Promise.all |promise/all|-
Promise - Promise.all, generic iterables|-
Promise - Promise.race|-
Promise - Promise.race, generic iterables|-
Promise - Promise[Symbol.species]|-
Symbol - basic functionality|-
Symbol - typeof support|-
Symbol - symbol keys are hidden to pre-ES6 code|-
Symbol - Object.defineProperty support|-
Symbol - cannot coerce to string or number|-
Symbol - can convert with String()|-
Symbol - new Symbol() throws|-
Symbol - Object(symbol)|-
Symbol - JSON.stringify ignores symbols|-
Symbol - global symbol registry|-
well-known symbols - Symbol.hasInstance|-
well-known symbols - Symbol.isConcatSpreadable|-
well-known symbols - Symbol.iterator, existence|-
well-known symbols - Symbol.iterator, arguments object|-
well-known symbols - Symbol.species, existence|-
well-known symbols - Symbol.species, Array.prototype.concat|-
well-known symbols - Symbol.species, Array.prototype.filter|-
well-known symbols - Symbol.species, Array.prototype.map|-
well-known symbols - Symbol.species, Array.prototype.slice|-
well-known symbols - Symbol.species, Array.prototype.splice|-
well-known symbols - Symbol.species, RegExp.prototype[Symbol.split]|-
well-known symbols - Symbol.replace|-
well-known symbols - Symbol.search|-
well-known symbols - Symbol.split|-
well-known symbols - Symbol.match|-
well-known symbols - Symbol.match, RegExp constructor|-
well-known symbols - Symbol.match, String.prototype.startsWith|-
well-known symbols - Symbol.match, String.prototype.endsWith|-
well-known symbols - Symbol.match, String.prototype.includes|-
well-known symbols - Symbol.toPrimitive|-
well-known symbols - Symbol.toStringTag|-
well-known symbols - Symbol.toStringTag, misc. built-ins|-
well-known symbols - Symbol.unscopables|-
Object static methods - Object.assign|lang.mixin ||-
Object static methods - Object.is|-
Object static methods - Object.getOwnPropertySymbols|-
Object static methods - Object.setPrototypeOf|-
function "name" property - function statements|-
function "name" property - function expressions|-
function "name" property - new Function|-
function "name" property - bound functions|-
function "name" property - variables (function)|-
function "name" property - object methods (function)|-
function "name" property - accessor properties|-
function "name" property - shorthand methods|-
function "name" property - shorthand methods (no lexical binding)|-
function "name" property - symbol-keyed methods|-
function "name" property - class statements|-
function "name" property - class expressions|-
function "name" property - variables (class)|-
function "name" property - object methods (class)|-
function "name" property - class prototype methods|-
function "name" property - class static methods|-
function "name" property - isn't writable, is configurable|-
String static methods - String.raw|-
String static methods - String.fromCodePoint|-
String.prototype methods - String.prototype.codePointAt|-
String.prototype methods - String.prototype.normalize|-
String.prototype methods - String.prototype.repeat|-
String.prototype methods - String.prototype.startsWith|-
String.prototype methods - String.prototype.endsWith|-
String.prototype methods - String.prototype.includes|-
String.prototype methods - String.prototype[Symbol.iterator]|-
String.prototype methods - String iterator prototype chain|-
RegExp.prototype properties - RegExp.prototype.flags|-
RegExp.prototype properties - RegExp.prototype[Symbol.match]|-
RegExp.prototype properties - RegExp.prototype[Symbol.replace]|-
RegExp.prototype properties - RegExp.prototype[Symbol.split]|-
RegExp.prototype properties - RegExp.prototype[Symbol.search]|-
RegExp.prototype properties - RegExp[Symbol.species]|-
Array static methods - Array.from, array-like objects|-
Array static methods - Array.from, generator instances|-
Array static methods - Array.from, generic iterables|-
Array static methods - Array.from, instances of generic iterables|-
Array static methods - Array.from map function, array-like objects|-
Array static methods - Array.from map function, generator instances|-
Array static methods - Array.from map function, generic iterables|-
Array static methods - Array.from map function, instances of iterables|-
Array static methods - Array.from, iterator closing|-
Array static methods - Array.of|-
Array static methods - Array[Symbol.species]|-
Array.prototype methods - Array.prototype.copyWithin|-
Array.prototype methods - Array.prototype.find|-
Array.prototype methods - Array.prototype.findIndex|-
Array.prototype methods - Array.prototype.fill|-
Array.prototype methods - Array.prototype.keys|-
Array.prototype methods - Array.prototype.values|-
Array.prototype methods - Array.prototype.entries|-
Array.prototype methods - Array.prototype[Symbol.iterator]|-
Array.prototype methods - Array iterator prototype chain|-
Array.prototype methods - Array.prototype[Symbol.unscopables]|-
Number properties - Number.isFinite|-
Number properties - Number.isInteger|-
Number properties - Number.isSafeInteger|-
Number properties - Number.isNaN|-
Number properties - Number.EPSILON|-
Number properties - Number.MIN\_SAFE\_INTEGER|-
Number properties - Number.MAX\_SAFE\_INTEGER|-
Math methods - Math.clz32|-
Math methods - Math.imul|-
Math methods - Math.sign|-
Math methods - Math.log10|-
Math methods - Math.log2|-
Math methods - Math.log1p|-
Math methods - Math.expm1|-
Math methods - Math.cosh|-
Math methods - Math.sinh|-
Math methods - Math.tanh|-
Math methods - Math.acosh|-
Math methods - Math.asinh|-
Math methods - Math.atanh|-
Math methods - Math.trunc|-
Math methods - Math.fround|-
Math methods - Math.cbrt|-
Math methods - Math.hypot|-
Array is subclassable - length property (accessing)|-
Array is subclassable - length property (setting)|-
Array is subclassable - correct prototype chain|-
Array is subclassable - Array.isArray support|-
Array is subclassable - Array.prototype.concat|-
Array is subclassable - Array.prototype.filter|-
Array is subclassable - Array.prototype.map|-
Array is subclassable - Array.prototype.slice|-
Array is subclassable - Array.prototype.splice|-
Array is subclassable - Array.from|-
Array is subclassable - Array.of|-
RegExp is subclassable - basic functionality|-
RegExp is subclassable - correct prototype chain|-
RegExp is subclassable - RegExp.prototype.exec|-
RegExp is subclassable - RegExp.prototype.test|-
Function is subclassable - can be called|-
Function is subclassable - correct prototype chain|-
Function is subclassable - can be used with "new"|-
Function is subclassable - Function.prototype.call|-
Function is subclassable - Function.prototype.apply|-
Function is subclassable - Function.prototype.bind|-
Promise is subclassable - basic functionality|-
Promise is subclassable - correct prototype chain|-
Promise is subclassable - Promise.all|-
Promise is subclassable - Promise.race|-
miscellaneous subclassables - Boolean is subclassable|-
miscellaneous subclassables - Number is subclassable|-
miscellaneous subclassables - String is subclassable|-
miscellaneous subclassables - Map is subclassable|-
miscellaneous subclassables - Set is subclassable|-
prototype of bound functions - basic functions|-
prototype of bound functions - generator functions|-
prototype of bound functions - arrow functions|-
prototype of bound functions - classes|-
prototype of bound functions - subclasses|-
Proxy, internal 'get' calls - ToPrimitive|-
Proxy, internal 'get' calls - CreateListFromArrayLike|-
Proxy, internal 'get' calls - instanceof operator|-
Proxy, internal 'get' calls - HasBinding|-
Proxy, internal 'get' calls - CreateDynamicFunction|-
Proxy, internal 'get' calls - ClassDefinitionEvaluation|-
Proxy, internal 'get' calls - IteratorComplete, IteratorValue|-
Proxy, internal 'get' calls - ToPropertyDescriptor|-
Proxy, internal 'get' calls - Object.assign|-
Proxy, internal 'get' calls - Object.defineProperties|-
Proxy, internal 'get' calls - Function.prototype.bind|-
Proxy, internal 'get' calls - Error.prototype.toString|-
Proxy, internal 'get' calls - String.raw|-
Proxy, internal 'get' calls - RegExp constructor|-
Proxy, internal 'get' calls - RegExp.prototype.flags|-
Proxy, internal 'get' calls - RegExp.prototype.test|-
Proxy, internal 'get' calls - RegExp.prototype[Symbol.match]|-
Proxy, internal 'get' calls - RegExp.prototype[Symbol.replace]|-
Proxy, internal 'get' calls - RegExp.prototype[Symbol.search]|-
Proxy, internal 'get' calls - RegExp.prototype[Symbol.split]|-
Proxy, internal 'get' calls - Array.from|-
Proxy, internal 'get' calls - Array.prototype.concat|-
Proxy, internal 'get' calls - Array.prototype iteration methods|-
Proxy, internal 'get' calls - Array.prototype.pop|-
Proxy, internal 'get' calls - Array.prototype.reverse|-
Proxy, internal 'get' calls - Array.prototype.shift|-
Proxy, internal 'get' calls - Array.prototype.splice|-
Proxy, internal 'get' calls - Array.prototype.toString|-
Proxy, internal 'get' calls - JSON.stringify|-
Proxy, internal 'get' calls - Promise resolve functions|-
Proxy, internal 'get' calls - String.prototype.match|-
Proxy, internal 'get' calls - String.prototype.replace|-
Proxy, internal 'get' calls - String.prototype.search|-
Proxy, internal 'get' calls - String.prototype.split|-
Proxy, internal 'get' calls - Date.prototype.toJSON|-
Proxy, internal 'set' calls - Object.assign|-
Proxy, internal 'set' calls - Array.from|-
Proxy, internal 'set' calls - Array.of|-
Proxy, internal 'set' calls - Array.prototype.copyWithin|-
Proxy, internal 'set' calls - Array.prototype.fill|-
Proxy, internal 'set' calls - Array.prototype.pop|-
Proxy, internal 'set' calls - Array.prototype.push|-
Proxy, internal 'set' calls - Array.prototype.reverse|-
Proxy, internal 'set' calls - Array.prototype.shift|-
Proxy, internal 'set' calls - Array.prototype.splice|-
Proxy, internal 'set' calls - Array.prototype.unshift|-
Proxy, internal 'defineProperty' calls - [[Set]]|-
Proxy, internal 'defineProperty' calls - SetIntegrityLevel|-
Proxy, internal 'deleteProperty' calls - Array.prototype.copyWithin|-
Proxy, internal 'deleteProperty' calls - Array.prototype.pop|-
Proxy, internal 'deleteProperty' calls - Array.prototype.reverse|-
Proxy, internal 'deleteProperty' calls - Array.prototype.shift|-
Proxy, internal 'deleteProperty' calls - Array.prototype.splice|-
Proxy, internal 'deleteProperty' calls - Array.prototype.unshift|-
Proxy, internal 'getOwnPropertyDescriptor' calls - [[Set]]|-
Proxy, internal 'getOwnPropertyDescriptor' calls - Object.assign|-
Proxy, internal 'getOwnPropertyDescriptor' calls - Object.prototype.hasOwnProperty|-
Proxy, internal 'getOwnPropertyDescriptor' calls - Function.prototype.bind|-
Proxy, internal 'ownKeys' calls - SetIntegrityLevel|-
Proxy, internal 'ownKeys' calls - TestIntegrityLevel|-
Proxy, internal 'ownKeys' calls - SerializeJSONObject|-
Object static methods accept primitives - Object.getPrototypeOf|-
Object static methods accept primitives - Object.getOwnPropertyDescriptor|-
Object static methods accept primitives - Object.getOwnPropertyNames|-
Object static methods accept primitives - Object.seal|-
Object static methods accept primitives - Object.freeze|-
Object static methods accept primitives - Object.preventExtensions|-
Object static methods accept primitives - Object.isSealed|-
Object static methods accept primitives - Object.isFrozen|-
Object static methods accept primitives - Object.isExtensible|-
Object static methods accept primitives - Object.keys|-
own property order - for..in|-
own property order - Object.keys|-
own property order - Object.getOwnPropertyNames|-
own property order - Object.assign|-
own property order - JSON.stringify|-
own property order - JSON.parse|-
own property order - Reflect.ownKeys, string key order|-
own property order - Reflect.ownKeys, symbol key order|-
miscellaneous - no escaped reserved words as identifiers|-
miscellaneous - duplicate property names in strict mode|-
miscellaneous - no semicolon needed after do-while|-
miscellaneous - no assignments allowed in for-in head|-
miscellaneous - accessors aren't constructors|-
miscellaneous - Invalid Date|-
miscellaneous - RegExp constructor can alter flags|-
miscellaneous - built-in prototypes are not instances|-
miscellaneous - function 'length' is configurable|-
miscellaneous - String.prototype case methods, Unicode support|-
non-strict function semantics - hoisted block-level function declaration|-
non-strict function semantics - labeled function statements|-
non-strict function semantics - function statements in if-statement clauses|-
\_\_proto\_\_ in object literals - basic support|-
\_\_proto\_\_ in object literals - multiple \_\_proto\_\_ is an error|-
\_\_proto\_\_ in object literals - not a computed property|-
\_\_proto\_\_ in object literals - not a shorthand property|-
\_\_proto\_\_ in object literals - not a shorthand method|-
Object.prototype.\_\_proto\_\_ - get prototype|-
Object.prototype.\_\_proto\_\_ - set prototype|-
Object.prototype.\_\_proto\_\_ - absent from Object.create(null)|-
Object.prototype.\_\_proto\_\_ - present in hasOwnProperty()|-
Object.prototype.\_\_proto\_\_ - correct property descriptor|-
Object.prototype.\_\_proto\_\_ - present in Object.getOwnPropertyNames()|-
String.prototype HTML methods - existence|-
String.prototype HTML methods - tags' names are lowercase|-
String.prototype HTML methods - quotes in arguments are escaped|-
RegExp.prototype.compile|-
RegExp syntax extensions - hyphens in character sets|-
RegExp syntax extensions - invalid character escapes|-
RegExp syntax extensions - invalid control-character escapes|-
RegExp syntax extensions - invalid Unicode escapes|-
RegExp syntax extensions - invalid hexadecimal escapes|-
RegExp syntax extensions - incomplete patterns and quantifiers|-
RegExp syntax extensions - octal escape sequences|-
RegExp syntax extensions - invalid backreferences become octal escapes|-
HTML-style comments|-


ES7 features (TODO: mapping)

es | dojo
---|-----
exponentiation (\*\*) operator - 0|-
exponentiation (\*\*) operator - 1|-
Array.prototype.includes|-
async functions - 0|-
async functions - 1|-
async functions - 2|-
SIMD (Single Instruction, Multiple Data) - 0|-
SIMD (Single Instruction, Multiple Data) - 1|-
SIMD (Single Instruction, Multiple Data) - 2|-
SIMD (Single Instruction, Multiple Data) - 3|-
SIMD (Single Instruction, Multiple Data) - 4|-
SIMD (Single Instruction, Multiple Data) - 5|-
SIMD (Single Instruction, Multiple Data) - 6|-
SIMD (Single Instruction, Multiple Data) - 7|-
SIMD (Single Instruction, Multiple Data) - 8|-
SIMD (Single Instruction, Multiple Data) - 9|-
SIMD (Single Instruction, Multiple Data) - 10|-
SIMD (Single Instruction, Multiple Data) - 11|-
SIMD (Single Instruction, Multiple Data) - 12|-
SIMD (Single Instruction, Multiple Data) - 13|-
SIMD (Single Instruction, Multiple Data) - 14|-
SIMD (Single Instruction, Multiple Data) - 15|-
SIMD (Single Instruction, Multiple Data) - 16|-
SIMD (Single Instruction, Multiple Data) - 17|-
SIMD (Single Instruction, Multiple Data) - 18|-
SIMD (Single Instruction, Multiple Data) - 19|-
SIMD (Single Instruction, Multiple Data) - 20|-
SIMD (Single Instruction, Multiple Data) - 21|-
SIMD (Single Instruction, Multiple Data) - 22|-
SIMD (Single Instruction, Multiple Data) - 23|-
SIMD (Single Instruction, Multiple Data) - 24|-
SIMD (Single Instruction, Multiple Data) - 25|-
SIMD (Single Instruction, Multiple Data) - 26|-
SIMD (Single Instruction, Multiple Data) - 27|-
SIMD (Single Instruction, Multiple Data) - 28|-
SIMD (Single Instruction, Multiple Data) - 29|-
SIMD (Single Instruction, Multiple Data) - 30|-
SIMD (Single Instruction, Multiple Data) - 31|-
SIMD (Single Instruction, Multiple Data) - 32|-
SIMD (Single Instruction, Multiple Data) - 33|-
SIMD (Single Instruction, Multiple Data) - 34|-
SIMD (Single Instruction, Multiple Data) - 35|-
SIMD (Single Instruction, Multiple Data) - 36|-
SIMD (Single Instruction, Multiple Data) - 37|-
SIMD (Single Instruction, Multiple Data) - 38|-
SIMD (Single Instruction, Multiple Data) - 39|-
SIMD (Single Instruction, Multiple Data) - 40|-
SIMD (Single Instruction, Multiple Data) - 41|-
SIMD (Single Instruction, Multiple Data) - 42|-
SIMD (Single Instruction, Multiple Data) - 43|-
SIMD (Single Instruction, Multiple Data) - 44|-
SIMD (Single Instruction, Multiple Data) - 45|-
SIMD (Single Instruction, Multiple Data) - 46|-
SIMD (Single Instruction, Multiple Data) - 47|-
SIMD (Single Instruction, Multiple Data) - 48|-
SIMD (Single Instruction, Multiple Data) - 49|-
String trimming - 0|-
String trimming - 1|-
function.sent|-
Object.values|dojox/lang/functional/object.values|-
Object.entries|-
Object.observe|-
trailing commas in function syntax - 0|-
trailing commas in function syntax - 1|-
object rest properties|-
object spread properties|-
typed objects|-
ArrayBuffer.transfer|-
class decorators|-
class properties|-
call constructor|-
String padding - 0|-
String padding - 1|-
bind (::) operator - 0|-
bind (::) operator - 1|-
do expression|-
Object.getOwnPropertyDescriptors|-
Map.prototype.toJSON|-
Set.prototype.toJSON|-
String.prototype.at|-
array comprehensions|-
generator comprehensions|-
destructuring in comprehensions|-
Reflect.Realm|-
RegExp.escape|-
generator functions can't be used with "new"|-
strict fn w/ non-strict non-simple params is error|-
nested rest destructuring|-

# Contributing

- es5.csv, es6.csv need more work
- add more pattern variations to existing scripts
- add new patterns and scripts
- add samples from real project code to /samples folder

# TODO:

- test
- runner
- formating results

# Links

- <https://www.sitepen.com/blog/2013/04/03/introducing-dojo-amd-converter>


