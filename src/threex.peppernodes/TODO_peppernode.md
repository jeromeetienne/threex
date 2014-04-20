### Coding Notes
* nodes come and go, the visualisation is very dynamic
  - so for each element, do a clean .destroy()

### Structure composing the three
* there is a tree with nodes
* a node got
  - a name to identify it
  * a parent: pointer to parent node
  * children: array of children nodes
  * generationDelta : my distance to the focused node. this an integer

### Visualisation
* in three.js css for mobile support and web content integration
* it is up to the children to draw the link to the parent
* a node is visualized with a sprite for now, ball.png
  - the scale of the sprite depends directly on the generationDelta
  - the links is displayed by the child to its parent

### Controls
* note about smarter initial placement of node
  - when placing a child, scan all your sibling angle from the parent center
  - for each angle testes, measure the distance to the closest sibling angle
  - the one the furthest from the others win. 
* from generationDelta, you get the separation area of the node
  * if another node radius is within separation radius, we try to move away
  * similar to boids in flocking 
* focus node is stable at the center
  * there is a constant force bringing him to the center
* there is a boid like controls
  - physics is applied to each node
* a separation is applied if the other area intersect with ours
* an attraction is applied between 2 node which are linked together
* scale of the power area depend on the generationDelta

############################################################
############################################################
############################################################

# Interesting Links
* http://en.wikipedia.org/wiki/Wikipedia:Tools/Alternative_browsing
Looks at them. read to learn from them. They know more about wikipedia
* http://threejs.org/examples/css3d_molecules.html css3d animtion of nodes
* You need to know the structure of a page
* Looks for [wikinodes on youtube](https://www.youtube.com/watch?v=fdiXXxMnqJQ)
    - Kindof wonderwheels for wikipedia
* the tech behind wikinodes: http://en.wikipedia.org/wiki/SpicyNodes
    - official site http://www.spicynodes.org/
    - good video showing principle http://www.spicynodes.org/blog/2011/01/22/sneak-peek-spicynodes-touch-jan-2011/
    - apps on ipad and on flash. ipad seems fine but flash is flickering all over.
* Wikiweb on youtube
    - https://www.youtube.com/watch?v=pLk-3iima9s
    - https://www.youtube.com/watch?v=ZkcfHIYwqPY














