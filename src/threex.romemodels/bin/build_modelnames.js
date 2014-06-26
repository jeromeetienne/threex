var filenames	= process.argv.slice(2)
var modelNames	= []

filenames.forEach(function(filename){
	var basename	= require('path').basename(filename, '.js')	
	modelNames.push(basename)
})

console.dir(modelNames)