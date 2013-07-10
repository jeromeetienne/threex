examples explained: how to make a procedural city
=================================================

This post explains an example which proceduraly build a city.
@mrdoob recently released a small demo showing up a city fully generated on the fly.
It was a very eleguant solution, simple and efficient. 

[here is the screencast]()

How it is done from 10000 miles high
====================================
* building the city is less than 100 lines long
  * fully procedural so no download
* build cube.
  * they will represent all the building
  * they got random size and position.
  * but it is ok.
  * the illusion is convincing enougth if you fly over it at low altitude.
* performance aspect
  * merge all buildings in a single geometry
  * remove neverseen faces (bottom one) 
  * single material so no shader swap
* in city, at the street level you got shaddow from the other buildings.
  * so the bottom of the building are darker than the top
  * we can reproduce this effect with ```vertexColor```
  * we take the bottom vertices of the building and make them darker than the top

Generate the base Geometry for the building
===========================================

We build a base geometry. It will be reused several time while building the whole city.

So we build a simple cubeGeometry

```
  var geometry = new THREE.CubeGeometry( 1, 1, 1 );
```

We change the pivot point to be at the bottom of the cube, instead of its center.
So we translate the whole geomatry

```
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
```

Then we remove the bottom face. This is an optimisation. As the bottom face of a building is always on the ground, 
it is always against the ground, so it is never seen. So it is useless and we remove it.

```
  geometry.faces.splice( 3, 1 );
```

Now we fix the [UVs]() for the roof face. We set tem to the single coordinate 0,0. So the 
roof will be the same color as a floor row.
As each face of the building is using a single texture, it can be drawn in a single draw call.
Sweat trick for optimisation

```
  geometry.faceVertexUvs[0][2][0].set( 0, 0 );
  geometry.faceVertexUvs[0][2][1].set( 0, 0 );
  geometry.faceVertexUvs[0][2][2].set( 0, 0 );
  geometry.faceVertexUvs[0][2][3].set( 0, 0 );
```

Where to place buildings in the city
====================================

well... to be honest we put them anywhere. all is random ;)
Obviously there are collisions but the illusion is nice if you fly
at low altitude.
So first, we put the building at random position.

```
    buildingMesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 10;
    buildingMesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 10;
```

Then we put a random rotation in Y.

```
    buildingMesh.rotation.y = Math.random()*Math.PI*2;
```

Then we change the mesh.scale to change the building size.
First how wide and deep a building can be.

```
    buildingMesh.scale.x  = Math.random() * Math.random() * Math.random() * Math.random() * 50 + 10;
    buildingMesh.scale.z  = buildingMesh.scale.x
```

Then how high it is.

```
    buildingMesh.scale.y  = (Math.random() * Math.random() * Math.random() * buildingMesh.scale.x) * 8 + 8;
```

Ambient occlusion with vertexColor
==================================

* in a city with lots of building, the bottom of the building 
  tends to be darker than the top
* this is because the sun light hit the top harder than the bottom
* other building hiding the sun and casting shadow.
* this is what we call [ambient occlusion]() in visual graphics

* with three.js, it is is possible to assign a color to every vertice
* it will alter the final color of the face.
* We gonna use that to simulate shaddows at the bottom of building.


First we define the base colors for the part which receive lights, and the ones
which get shadows. 

```
  var light = new THREE.Color( 0xffffff )
  var shadow  = new THREE.Color( 0x303050 )
```

Those are constants for each building. Now we need to get a color 
for this particular building. We put some randomness to variety.

```
    var value = 1 - Math.random() * Math.random();
    var baseColor = new THREE.Color().setRGB( value + Math.random() * 0.1, value, value + Math.random() * 0.1 );
```

Now we need to assign the .vertexColor every vertex of every face.
If the face is a top face, we use ```baseColor``` of the building.
If it is a side face, we use ```baseColor``` multiplied by our
```light``` and ```shaddow color``` as cheap ambient occulise

```
    // set topColor/bottom vertexColors as adjustement of baseColor
    var topColor  = baseColor.clone().multiply( light );
    var bottomColor = baseColor.clone().multiply( shadow );
    // set .vertexColors for each face
    var geometry  = buildingMesh.geometry;    
    for ( var j = 0, jl = geometry.faces.length; j < jl; j ++ ) {
      if ( j === 2 ) {
        // set face.vertexColors on root face
        geometry.faces[ j ].vertexColors = [ baseColor, baseColor, baseColor, baseColor ];
      } else {
        // set face.vertexColors on sides faces
        geometry.faces[ j ].vertexColors = [ topColor, bottomColor, bottomColor, topColor ];
      }
    }
```

Merge all buildings to make a city
==================================
To make our city, we gonna merge 20000 buildings together.
So we gonna loop and apply the above formulas 20000 time.

We have already seen that reducing draw calls is good for performance.
Here all building share the same material, so we gonna merge them all
in a single geometry. 

```
  var cityGeometry= new THREE.Geometry();
  for( var i = 0; i < 20000; i ++ ){
    // ...

    // merge it with cityGeometry - very important for performance
    THREE.GeometryUtils.merge( cityGeometry, buildingMesh );
  }
```

Now we got a single large geometry for the whole city, let's build
a mesh from it.


```
  // build the mesh
  var material  = new THREE.MeshLambertMaterial({
    map           : texture,
    vertexColors  : THREE.VertexColors
  });
  var mesh = new THREE.Mesh(cityGeometry, material );
```

This mesh is a whole city.
Rather cool. now one last step. let's explain how to make this texture.

Procedural generation of Building's Texture
===========================================

Here we want to generate the texture for the side of each building.
In a nutshell, it will shows the floors for realism and variety.
So it alternates between row of window and row of floor.
Window rows are dark with a small noise to simulate light variations in each room.
Then we upscale texture carefully avoiding filtering.

So let's Status First you build a canvas. Make it small, 32x64.

```
    var canvas  = document.createElement( 'canvas' );
    canvas.width  = 32;
    canvas.height = 64;
    var context = canvas.getContext( '2d' );
```

Then you paint it in white

```
    context.fillStyle = '#ffffff';
    context.fillRect( 0, 0, 32, 64 );
```

Now we need to draw on this white surface. We gonna draw floors on it.
one windows row, then a floor row and we loop.
In fact, as the face is already white, we just have to draw the window rows.
To draw the window row, we add some random to simulate lights variations in each windows.

```
    for( var y = 2; y < 64; y += 2 ){
      for( var x = 0; x < 32; x += 2 ){
        var value = Math.floor( Math.random() * 64 );
        context.fillStyle = 'rgb(' + [value, value, value].join( ',' )  + ')';
        context.fillRect( x, y, 2, 1 );
      }
    }
```

Now we got the texture... just it is super small, 32, 64
We need to increase its resolution. But lets be carefull.
By default when you increase the resolution, you get a smoothed result, so it may easily appears blurly.
See on the left side.
It doesn't look good... to avoid that we disable ```.imageSmoothedEnabled```.
See the result on the write. 
It is as sharp as the original but with a better resolution.

ok now lets code exactly that. First we create the large canvas

```
    var canvas2 = document.createElement( 'canvas' );
    canvas2.width = 512;
    canvas2.height  = 1024;
    var context = canvas2.getContext( '2d' );
```

we disable the smoothing

```
    context.imageSmoothingEnabled   = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled  = false;
```

Now we just have to copy the small canvas into the big one.

```
    context.drawImage( canvas, 0, 0, canvas2.width, canvas2.height );
```

Then all we need to do is to actually build the ```THREE.Texture```.
We set the anisotropie to a high number to get better result.
see [tojiro on anisotropy]() for detail.

```
  var texture   = new THREE.Texture( generateTexture() );
  texture.anisotropy  = renderer.getMaxAnisotropy();
  texture.needsUpdate = true;
```

Conclusion
==========
