threex.materialchanger
======================

It aims to provide a way to modify ```THREE.Material```.


Algorithm
=========
* mark each material sub part with custom tags
* then the user will insert its own stuff into the shader
  * will we take another material ?
  * overwrite the 'three.MeshPhongMaterial' ?
  * best to create a new material
    * can i take phong shader and create a new material with it ?
      * if so this algo is viable to custom material
    * try on basic first
      * works on MeshBasicMaterial and MeshNormalMaterial
