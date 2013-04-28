var THREEx	= THREEx || {};

THREEx.QuerySelector	= function(){
}

//////////////////////////////////////////////////////////////////////////////////
//		Handle dom attribute						//
//////////////////////////////////////////////////////////////////////////////////

THREEx.QuerySelector.name	= function(object3D, value){
	// sanity check
	console.assert(object3D instanceof THREE.Object3D)
	// handle getter
	if( value === undefined )	return object3d.name;
	// handle setter
	object3d.name	= value;
	return this;
}

/**
 * Getter/Setter for the id of the matched elements
*/
THREEx.QuerySelector.domId	= function(object3D, value){
	// sanity check
	console.assert(object3D instanceof THREE.Object3D)
	if( value === undefined )	return object3D.userData.domId;
	object3D.userData.domId	= value;
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


THREEx.QuerySelector.domClasses	= function(object3D, value){
	// sanity check
	console.assert(object3D instanceof THREE.Object3D)
	if( value === undefined )	return object3D.userData.domClasses;
	object3D.userData.domClasses	= value;
	return this;
};

THREEx.QuerySelector.addClass	= function(object3D, className){
	var userData		= object3D.userData
	userData.domClasses	= userData.domClasses	|| '';
	if( this.hasClass(object3D, className) )	return;
	userData.domClasses	+= (userData.domClasses?' ':'') + className
	return this
}

THREEx.QuerySelector.hasClass	= function(object3D, className){
	var userData		= object3D.userData
	userData.domClasses	= userData.domClasses	|| '';
	var regexp		= new RegExp('(^| |\t)+('+className+')($| |\t)+');
	var matches		= userData.domClasses.match(regexp) ? true : false;
	return matches ? true : false
}

THREEx.QuerySelector.removeClass= function(object3d, className){
	var userData	= object3d.userData
	userData.domClasses	= userData.domClasses	|| '';

	var regexp		= new RegExp('(^|[ \t]*)('+className+')($|[ \t]*)');
	userData.domClasses	= userData.domClasses.replace(regexp, ' ');
	return this;
};

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////

THREEx.QuerySelector.select	= function(selector, object3D){
	// sanity check
	console.assert(object3D instanceof THREE.Object3D);
	console.assert(typeof(selector) === 'string')
	// handle parameter
	var selectorItems	= selector.split(' ').filter(function(value){
		return value.length > 0;
	})
	
	var objects	= THREEx.QuerySelector._crawls(object3D, selectorItems);
	return objects;
}

if( THREEx.Context ){
	THREEx.Context.prototype.querySelector	= function(selector, object3D){
		object3D	= object3D || ctx.scene;
		var objects	= THREEx.QuerySelector.select(selector, object3D)
		return objects.length > 0 ? objects[0] : null;
	}
	THREEx.Context.prototype.querySelectorAll	= function(selector, object3D){
		object3D	= object3D || ctx.scene;
		var objects	= THREEx.QuerySelector.select(selector, object3D)
		return objects;
	}
}

THREEx.QuerySelector._crawls	= function(object3D, selectorItems)
{
	console.assert( selectorItems.length >= 1 );

	var selectorItem= selectorItems[0]
	var match	= THREEx.QuerySelector._selectItemMatch(object3D, selectorItem);
	var nextItems	= match ? selectorItems.slice(1) : selectorItems;
	if( nextItems.length === 0 )	return [object3D];

	var objects	= [];
	object3D.children.forEach(function(child){
		var nodes	= THREEx.QuerySelector._crawls(child, nextItems);
		// FIXME reallocate the array without need
		objects		= objects.concat(nodes);
	}.bind(this));

	return objects;
}

THREEx.QuerySelector._selectItemMatch	= function(object3D, selectorItem){
	// sanity check
	console.assert( object3D instanceof THREE.Object3D );
	console.assert( typeof selectorItem === 'string' );

	// parse selectItem into subItems
	var subItems	= selectorItem.match(new RegExp("([^.#]+|\.[^.#]+|\#[^.#]+)", "g"));;

	// go thru each subItem
	var completed	= subItems.every(function(subItem){
		var meta	= subItem.charAt(0);
		var suffix	= subItem.slice(1);
		if( meta === "." ){
			var hasClass	= THREEx.QuerySelector.hasClass(object3D, suffix);
			return hasClass ? true : false;
		}else if( meta === "#" ){
			return THREEx.QuerySelector.domId(object3D) === suffix ? true : false;
		}else if( meta === "[" ){
			var matches	= subItem.match(/\[(.*)([=])(.*)\]/);
			var key		= matches[1]
			var operator	= matches[2]
			var value	= matches[3]
				.replace(/^['"]/, '')	// remove left "'
				.replace(/['"]$/, '')	// remove right "'
			if( key === 'name'){
				if( operator === '=' ){
					return object3d.name === value ? true : false;
				}else{
					console.assert('operator not handled')
				}
			}else{
				console.assert(false, 'key not handled:', key)
			}
			console.assert(false, 'this point should never be reached')
			return undefined;
		}else if( subItem === "*" ){
			return true;
		}else if( this._selectableGeometries.indexOf(subItem) !== -1 ){	// Handle geometries
			var geometry	= object3D.geometry;
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1) + "Geometry";
			return geometry instanceof THREE[className];
		}else if( this._selectableLights.indexOf(subItem) !== -1 ){	// Handle light
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1) + "Light";
			return object3D instanceof THREE[className];
		}else if( this._selectableClasses.indexOf(subItem) !== -1 ){	// Handle light
			var className	= subItem.charAt(0).toUpperCase() + subItem.slice(1);
			return object3D instanceof THREE[className];
		}
		// this point should never be reached
		console.assert(false, "invalid selector: "+subItem);
		return true;
	}.bind(this));

	return completed ? true : false;	
}

//////////////////////////////////////////////////////////////////////////////////
//		expose this API in THREEx.Mesh					//
//////////////////////////////////////////////////////////////////////////////////

THREEx.Mesh.prototype.name	= function(value){
	if( value === undefined )	return THREEx.QuerySelector.name(this, value);
	THREEx.QuerySelector.name(this, value);
	return this;
}
THREEx.Mesh.prototype.domId	= function(value){
	if( value === undefined )	return THREEx.QuerySelector.domId(this, value);
	THREEx.QuerySelector.domId(this, value);
	return this;
}
THREEx.Mesh.prototype.domClasses= function(value){
	if( value === undefined )	return THREEx.QuerySelector.domClasses(this, value);
	THREEx.QuerySelector.domClasses(this, value);
	return this;
}

THREEx.Mesh.prototype.hasClass	= function(value){
	THREEx.QuerySelector.hasClass(this, value);
	return this;
}

THREEx.Mesh.prototype.addClass	= function(value){
	THREEx.QuerySelector.addClass(this, value);
	return this;
}

THREEx.Mesh.prototype.removeClass	= function(value){
	THREEx.QuerySelector.removeClass(this, value);
	return this;
}

