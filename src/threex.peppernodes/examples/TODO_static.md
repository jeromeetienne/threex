## About threex.tweencontrols.js

* NOTES: is it position only ?
* it gives the currentPosition
* it gives the targetPosition
* it gives a transitionDelay
* targetPosition is dynamic
    - everytime it changes, test if a tweening is in progress
    - if current tweening, don't change the delay
    - else put default delay
* which function for the tweening ?

## About size variations

* if focus generation changes, the display size will change too
* could that be handled at the css level

## About dynamic generation based on wikipedia content

* how to query it from wikipedia
  * query some info from a page
  * query related pages from a page - build from it
  * cache all that 
* how to build it dynamically

## About threex.peppernodestaticcontrols.js

### About controls strategy
* i went for a dynamic physics
    - it seems hard to controls
    - it is hard to predict too
* what about a hardcoded topology
    - like a given tree portion will be visualized this way
    - with very little freedom, thus very predictive
    - a given tree portion got a single visualisation 
    - switch from a portion to another is just a tweening on top 
    - it seems possible and seems to be simpler, what about the details

### Deterministic visualisation 
* without animation for now, as a simplification assumption.
    - go for the simplest 
* focused node at the center
* children of a node spread around the parent node
    - equal angle between each link
    - so the parent is included in the computation
* the length of a link is relative to the child node generation

#### Nice... how to code it now
* if generation === 1, then position.set(0,0,0)
* the world position of children is set by the parent
* so setting position of each node is only done on a node if it got children
    - what is the algo to apply to each node ? 
    - reccursive function: handle current node and forward to all child
    - to handle a node is finding its position in world space

#### Pseudo code for computePosition(node)

```
function computePosition(node){
    // special case of focus node position
    var isFocusedNode   = node.parent !== null ? true : false
    if( isFocusedNode ){
        node.position.set(0,0,0)
    }
    // if no children, do nothing more
    if( node.children.length === 0 ) continue;

    // ... here compute the position of each node

    // forward to each child
    node.children.forEach(function(child){
        computePosition(child)
    })
}
```

**how to compute the position of each child ?**

* is there a node.parent ?
* how many children are there.

```
var linksCount = node.children.length + (node.parent !== null? 1 : 0)
var deltaAngle    = Math.PI*2 / linksCount
var startAngle    = 0
if( node.parent !==  null ){
    var deltaY = node.parent.position.y - node.position.y
    var deltaX = node.parent.position.x - node.position.x
    startAngle  = Math.atan2(deltaY, deltaX)
    startAngle  += deltaAngle
}

// compute the radius
var radiuses= [0,100, 40]
console.assert(node.generation >= 1 && node.generation < radiuses.length )
var radius  = radiuses[node.generation]

var angle = startAngle
node.children.forEach(function(nodeChild){
    nodeChild.position.x = Math.cos(angle)*radius
    nodeChild.position.y = Math.sin(angle)*radius
    angle += deltaAngle
})
```