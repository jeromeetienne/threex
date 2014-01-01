title: Three.js Mini Game Workshop 
output: index.html

--
# What Is Threex
  
--

### What we gonna do ?

* present what is threex
* effort to easy three.js games
* extension system - very light, vanilla.js light

--

### Goals

* "to make dev of three.js games easy"

--

### Means 

* dev of game modules around html5 tech
* minigame to show off what is possible
* documentation and advocaty of the effort

--

### Techs

* webgl
* webaudioapi
* webrtc
* websocket

--

### Policy

* fix problems people actually have
* open standard is prefered
* open source is preffered

--

# Existing Code

--

### in 3d

* all three.js obviously
* threex extensions
* some good idea in tquery plugins. to import
* good stuff to import from babylon.js 
  * it has a game orientation

--

### in audio

* sound localisation is a key feature
* webaudiox.js to ease access to webaudio api
* html5rocks tutorial

--

### in physics

* not much
  * due to no clear winner for 'good 3d physics library in js'
  * mainly because there are no clear winner for 'good 3d physics library in js'
* some work in threex.cannonjs
* maybe something based on obb,aabb, sphere, raycasting
  * good math in /src/math three.js
  * it is included in Geometry
* what babylon.js is doing ?

--

### in inputs

* for keyboard, threex.keyboardstate
* for touchscreen joystick, simulate arrow and click, virtualjoystick.js
* leap motion
* device orientation

--

### in user authentication

* passport.js with all big social networks

--

### in IA

* machine.js
* pathfinding.js


--

### about game itself

* unclear how much we should do 
  * out of scope of the library ?
* "maybe you can do that like that, or like this. it is up to you"
* component/behavior ? or some other wellknow scheme ?
* chat
