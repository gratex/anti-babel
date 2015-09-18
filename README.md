# anti-babel

There are [plenty of projects](https://github.com/addyosmani/es6-tools) to translate es6 syntax to older syntaxes.
This allows you to write modern syntax and run on 'old machines'.

This project is opposite (hence anti- in the name and [babel](https://babeljs.io) as one of 'them'.

This project is opposite. 
Helping you to 
CONVERT OLD CODE BASE TO NEW API AND SYNTAX.


## Background
We are writing JavaScript from 'dark ages' (somewhere 19XX), and 
we are running big projects, this means we have to maintain them,
for ages sometimes.

This could help to modernize them into something more readable today.

Today we are developing in dojo, so many samples may involve 'old dojo' APIs and 
refactoring to ES5,6 APIs, but the idea can be taken to other codes as well.

To see if you can/should refactor you can use [compat-tables as UI](https://kangax.github.io/compat-table/es6/) 
or [out CLI](https://github.com/gratex/compat-table)

## Goal

Provide tools/procedures/guidelines for refactoring old syntaxes and patterns to something new.

- functional programing
- es5,6 APIs
- es6 syntax
- ...

# Idea explained

## refactoring [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) cycles

We do not like them, most of them can be map, filter, reduce 
or any reasonable [array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array).

### for cycles with single push() = map

Detector (very general):

	grasp -e 'for(__;__;__){ __.push(_$) }' -r .

Refactoring (one off):

	// before
	for (i = 0; i < opts.length; i++) {
	    retVal.push(opts[i].value);
	}

 	grasp -e 'for($i=0;$i<$arr.length;$i++){ $out.push($arr[$i].$prop) }'\
 	-R '{{out}}={{arr}}.map(function(item){return item.{{prop}};});' \
 	-r .

	// after (formated)
	retVal = opts.map(function(item) {
    	return item.value;
	});

## dojo

We are developing in dojo.
Dojo contains a lot of good ideas, but a lot of APIs is not needed anymore.

Example: 

[dojo/string/trim](https://dojotoolkit.org/reference-guide/1.7/dojo/string/trim.html) vs.
[String.prototype.trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) 


# Using on your project

Idea:

	cd $YOUR_JS_PROJECT
	
	git checkout -b refactoring-anti-babel

	# run (pick a refactoring script and run)
	src/js/for2map.v01
	src/dojo/trim
	# ... see src folder and file names for available refactorings


	# review manually
	git diff

	# run your unit tests !!!!
	# run your unit tests !!!!
	# run your unit tests !!!!
	
	# format your re-actored code
	# ????

	# commit 
	git commit -am "[REAFCTOR] ...."


# Contributing

- add more pattern variations to existing scripts
- add new patterns and scripts
- add samples from real project code to /samples folder

# TODO:

- test
- runner
- formating results











	









