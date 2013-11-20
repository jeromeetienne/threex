THREEx v2 - guidelines to write extensions for three.js 

threex-v2 is an light extension system for three.js.
It isnt really a system, it is more a convention.
There provides no code, no tool for command lines.
It is guidelines how to write modules.

It is very vendor.js

i porting all my three.js code in it.

and i have quite a few by now.


It has no specific requirement about module management, how you get them, 
or how to load them.
You can use the way you like.
It is fitting well with ```package.require.js``` module management tho.
```package.require.js``` handle packages loading with require.js, another time only guidelines, very vendor.js.
You can store your extension the way you like.
If you pick npm, see ```npm4require``` guidelines, another which is vendor.js.
You can store and publish your packages thru npm, module mangement for node.js.

[readme driven development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html)

the old threex is in [jeromeetienne/threex](https://github.com/jeromeetienne/threex-v0)


How To Write a THREEx Module
============================

You can find a sample threex module in 
[threex.sample repo](https://github.com/jeromeetienne/threex.sample), 
You could just grab it and modify it if you see fit.
Let's come back on writing your own from scratch.

First you declare ```THREEx``` namespace. This will works whenever ```THREEx``` 
is already defined or not. Thus you dont have any dependancy. This is a [vendor.js]()
namespace, so to say.

```
/**
 * declare THREEx namespace
 */
var THREEx	= THREEx	|| {};
```

Then you declare your module, up to you to know what it is supposed to do. But if you 
could document it, i would be grateful :)
If you look for a format, see [jsdoc](http://usejsdoc.org/).

```
/**
 * THREEx module to do super things
 */
THREEx.SuperModule	= function( /* arguments... */ ){
	// here you put your own thing
};
```

If needed, you can have a ```.destroy()``` function to act as explicit destructor

```
this.destroy	= function(){
	// here, clean things up
}
```

## To Update Rendering of Your Module

If this module needs to be updated at each render, provide a function to update the
rendering of your module.

```
/**
 * function to be called at every render update
 * @param  {Number} delta number of seconds since last update
 * @param  {Number} now   Number of seconds since the begining
 */
this.update	= function(delta, now){
	// ... here you update the rendering of your module
}
```

### More Cooked Version

If you got many stuff to update, it may be nice to have an actual rendering
loop, like this one.

```
/**
 * All Update Functions
 * @type {Array}
 */
var updateFcts	= []

/**
 * function to be called at every render update
 * @param  {Number} delta number of seconds since last update
 * @param  {Number} now   Number of seconds since the begining
 */
this.update	= function(delta, now){
	updateFcts.forEach(function(updateFct){
		updateFct(delta, now)
	})
}
```

To add a function in this update loop, do

```
updateFcts.push(function callback(delta, now){
	// here you update a part of your module
})
```

to remove a function in this update loop, you can do

```
updateFcts.splice(updateFcts.indexOf(callback),1)
```

## To Update The Physics Of Your Module

Same as for updating rendering, but replace ```update``` by ```tick``` everywhere :)

## Folders Hierarchie

Some guidelines on how to organize your files:

* ```/examples``` contains the examples for your module
* ```/readme.md``` contains a readme about your module. 
For more on readme, see [Readme Driven Development](http://tom.preston-werner.com/2010/08/23/readme-driven-development.html)
* maybe a ```/threex.supermodule.js``` file which contains the js code of your module
  * If your module is too complex for a single file, for example you could do
    * ```/threex.supermodule.js``` the main file for your module
    * ```/threex.supermodulecontrols.js``` for the controls of your module
    * ```/threex.supermodulesounds.js``` for the sounds of your module
    * and so on
* put your images assets in ```/images```, your sounds assets in ```/sounds```
, your models in ```/models```, you get the idea.

## How To Handle Dependencies

With several files, it may become interesting to handle dependancy, for that, 
[require.js](http://requirejs.org/) is recommended.

You can provide a ```/package.require.js``` file.
This file will require all the files of your modules.
Thus the developper using your module just have to require this file to get
the dependancies of your modules.
for examples
  
```
define( [ './threex.supermodule',
	, './threex.supermodulecontrols',
	, './threex.supermodulesounds',
	], function(){
	// ... this is called when dependancies are loaded
});
```

## How To Localize Your Assets

Sometime a modules need assets, e.g. you got a module for a spaceship in a game, it will
need a model for the ship itself, some sounds for the reactors, and some images for the 
explosions when the ship fire. 
When you load the assets, you need to localise them. How to do that ?

A simple way is to define a baseUrl which depends on the module location, for example.

```
THREEx.SuperModule.baseUrl	= "../";
```

And now every time you needs to load one of your assets you build the url like that.

```
var imageUrl	= THREEx.SuperModule.baseUrl+'/images/explosion.jpg';
```

Up to you to set the ```.baseUrl```. You may set manually or automatically
with require.js with the following code in your ```package.require.js``` file.

```
define( [ 'module'
	], function(module){
	// set baseUrl for this module
	THREEx.SuperModule.baseUrl	= module.uri+'/../';
});
```

## Bower To Publish Threex Modules

Here is how to publish your module.

```
bower register threex.supermodule git@github.com:jeromeetienne/threex.supermodule.git
```

Here is how to install a module.

```
bower install threex.supermodule
```

Here is how to get the list of all threex modules.

```
bower search threex.
```

