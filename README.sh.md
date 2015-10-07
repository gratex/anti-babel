# ignore this file, this is internal generator of README.sh

echo "
# anti-babel

## TL;DR;
Refactorings from proptietary libraries code to ES5, ES6 constructions.

NOTE: The code of scripts DOES NOT cover all possible scenarios,
some usages of api may not me matched, or we just do not want
to automate their usage (working on safest possible scenarios, but sometimes it is better to convert border cases by humans).
You are always welcomed to CONTRIBUTE another variants.


Currently available refactoring scripts:

$(
	git ls-files src | sed "s;\.v[0-9]*$;;" | cut -d"/" -f2- \
	| sort -u \
	| md-ul
)



Install external tools:

	npm install -g grasp 	#yes for now as global, sorry

Apply refactoring (on sample files)

	< samples/hitch2bind/hitch2bind.before.js hitch2bind.v03

Check what is changed and if behaves same (naive samples for now):

	# before: print source and results

	< samples/lodash/array.forEach.js | tee /dev/fd/2 | node
	
	# after: print source and results

	< samples/lodash/array.forEach.js ./src/lodash/array.forEach.v02 | tee /dev/fd/2 | node

Run on your project:
	
	# set anti-babel root to path
	AB=\$PWD

	# cd to your project/js folder
	# run all or one of

$(
	ls -1 src/*/* | awk '{print "$AB/"$0" -i -r ."}' | md-indent
)
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
$(<es5.txt grep "." | md-escape-emphasis | tr "\t" "|" | sed "s;|$;|-;" )

Note: es5,6 features derived from compat-tables
"
cat <<<'
	node ../compat-table/cli.js es6 tests | jsontool -a name > es5.txt
	node ../compat-table/cli.js es6 tests | jsontool -a name > es6.txt
'
echo "
ES6 features (TODO: mapping)

es | dojo
---|-----
$(<es6.txt grep "." | md-escape-emphasis | tr "\t" "|" | sed "s;$;|-;" )

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

"









	









