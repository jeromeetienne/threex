examples explained: how to make a procedural city
=================================================

This post explains an example which proceduraly build a city.
@mrdoob recently released a small demo showing up a city fully generated on the fly.
It was a very eleguant solution, simple and efficient. 

How it is done from 10000 miles high
------------------------------------
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
  
How to generate the texture
---------------------------
* the side texture for a building shows the floors.
* It alternate between row of window and row of floor
* window row are dark with a small noise to simulate lights in each room.
* upscaling texture without filtering



