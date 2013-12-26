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
* threex extensions, tquery plugins
* good stuff to import from babylon.js 
  * it has a game orientation

--

### in audio

* webaudiox.js to ease access to webaudio api
* sound localisation is a key feature
* html5rocks tutorial

--

### in physics

* not much
  * mainly because there are no clear winner for 'good 3d physics library in js'
* some work in threex.cannonjs

--

### in inputs

* for keyboard, threex.keyboardstate
* for touchscreen joystick, simulate arrow and click, virtualjoystick.js
* leap motion
* device orientation

--

### about game itself

* unclear how much we should do 
  * out of scope of the library ?
* "maybe you can do that like that, or like this. it is up to you"
* component/behavior ? or some other wellknow scheme ?
