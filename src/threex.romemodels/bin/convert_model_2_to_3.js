// All ro.me assets seems in old .js format which actually contains javascript and not only JSON
// - so current loader fails to load them
// - this tool is made to convert them
// 
// 
// node bin/convert_model_2_to_3.js models rome/deploy/asset_viewer/files/models/animals/*.js

var dstDirname	= process.argv[2]
var filenames	= process.argv.slice(3)

filenames.forEach(function(srcFilename){
	// console.log('process', srcFilename)
	var content	= require('fs').readFileSync(srcFilename, 'utf8')
	var basename	= require('path').basename(srcFilename)
	var dstFilename	= require('path').join(dstDirname, basename)
	var lines	= content.split('\n')

	// if it is already converted
	if( lines[0] === '{' ){
		require('fs').writeFileSync(dstFilename, content, 'utf8')
		return
	}

	// find the leading 'var model ='
	do{
		// console.assert(lines.length > 0)
		var hasModelEqual	= lines[0].match(/var model =/) ? true : false
		lines.shift()
	}while(hasModelEqual === false)
	lines.splice(0, 0, '{')

	// find the trailing '};'
	do{
		// console.assert(lines.length > 0)
		var hasModelEqual	= lines[lines.length-1].match(/};/) ? true : false
		lines.pop()
	}while(hasModelEqual === false)
	lines.splice(lines.length, 0, '}')

	// write destination
	var newContent	= lines.join('\n')
	require('fs').writeFileSync(dstFilename, newContent, 'utf8')
})

