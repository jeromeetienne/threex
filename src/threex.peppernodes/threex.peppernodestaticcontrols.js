var THREEx	= THREEx	|| {}

THREEx.PepperNodeStaticControls	= {}

THREEx.PepperNodeStaticControls.computePosition	= function(node){
	// special case of focus node position
	var isTopFocusedNode	= node.generation === 1 ? true : false
	if( isTopFocusedNode ){
		node.position.set(0,0,0)
	}

	// links to all further generations
	var linkedNodes	= []
	if( node.parent )	linkedNodes.push(node.parent)
	linkedNodes	= linkedNodes.concat(node.children)

	// compute lessFocusedNodes
	var lessFocusedNodes	= linkedNodes.filter(function(linkedNode){
		var isLessFocused	= linkedNode.generation > node.generation ? true : false
		return isLessFocused
	})

	// compute moreFocusedNode
	var moreFocusedNode	= null
	linkedNodes.forEach(function(linkedNode){
		var isMoreFocused	= linkedNode.generation < node.generation ? true : false
		if( isMoreFocused === true )	console.assert(moreFocusedNode === null)
		if( isMoreFocused === true )	moreFocusedNode	= linkedNode
	})

	// HERE compute the position of lessFocusedNodes
	var linksCount	= linkedNodes.length
	var deltaAngle	= Math.PI*2 / linksCount
	var startAngle	= 0
	if( moreFocusedNode !==  null ){
		var deltaY	= moreFocusedNode.position.y - node.position.y
		var deltaX	= moreFocusedNode.position.x - node.position.x
		startAngle	= -Math.atan2(-deltaY, deltaX)
		startAngle	+= deltaAngle
	}

	// compute the radius
	var radiuses	= [0, 200, 100, 70, 50, 30]
	console.assert(node.generation >= 1 && node.generation < radiuses.length )
	var radius	= radiuses[node.generation]

	// Set angle for each lessFocusedNodes
	var angle	= startAngle
	lessFocusedNodes.forEach(function(lessFocusedNode){
		lessFocusedNode.position.copy(node.position)
		lessFocusedNode.position.x += Math.cos(angle)*radius
		lessFocusedNode.position.y += Math.sin(angle)*radius
		angle	+= deltaAngle
	})

	// forward to each lessFocusedNode
	lessFocusedNodes.forEach(function(lessFocusedNode){
		THREEx.PepperNodeStaticControls.computePosition(lessFocusedNode)
	})
}