## Reference
* http://www.kevinboulanger.net/grass.html
* http://http.developer.nvidia.com/GPUGems/gpugems_ch07.html
* http://outerra.blogspot.fr/2012/05/procedural-grass-rendering.html
* http://simonschreibt.de/gat/airborn-trees/ for normal tweaking

## Tech
* some LOD
* some normal tweaking

## talks with bai
[07:20am] jetienne: bai: oh cool
[07:20am] bai: I found http://bai.dev.supcrit.com/media/space/textures/grass/grass01.png http://bai.dev.supcrit.com/media/space/textures/grass/grass02.png http://bai.dev.supcrit.com/media/space/textures/grass/flowers01.png and http://bai.dev.supcrit.com/media/space/textures/grass/flowers02.png in an article, I'll see if I can track that url down...
[07:20am] bai: they should probably be sized down for real world use
[07:21am] jetienne: tt_mike: expansive but REAL nice 
[07:21am] jetienne: bai: nice! thanks
[07:21am] bai: but with those I got grass which looked like this http://baicoianu.com/~bai/webgl/elation-engine-proctree-grass3.png
[07:22am] jetienne: bai: oh cool you already worked on the subject. can i pick you brain ?
[07:22am] bai: sure
[07:24am] bai: I based my approach loosely on http://http.developer.nvidia.com/GPUGems/gpugems_ch07.html
[07:24am] bai: basically three intersecting planes in an equilateral triangle standing on end
[07:25am] jetienne: bai: looking
[07:25am] bai: and you tile those at random across the area you want to have covered in grass, you can vary density etc
[07:26am] bai: what I did was use THREE.Shape which lets me define any sort of boundary, then THREE.GeometryUtils.randomPointsInGeometry() to get a nice distribution
