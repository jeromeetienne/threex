#!/bin/env node
#
# used to rename all the .tga in .jpg with convert from image magic
# used with the following line
# $ find . -name "*.tga" | xargs -l1 node convert.js


console.assert( process.argv.length === 3 )

var srcName	= process.argv[2];
var dstName	= srcName.replace(/\.tga$/, '.jpg');

//console.log("srcName", srcName)
//console.log("dstName", dstName)

var cmdline	= "convert '"+srcName+"' '"+dstName+"'";
console.log("*************************************************")
console.log("cmdline: ", cmdline);
var child	= require('child_process').exec(cmdline,
	function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
});