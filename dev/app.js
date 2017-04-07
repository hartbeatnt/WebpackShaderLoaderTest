var THREE = require('three')
// Load shaders and texture
// var vert = require('../public/shaders/vertShader1.glsl')
// var frag = require('../public/shaders/fragShader1.glsl')
var vert = require('../public/shaders/vertShader2.glsl')
var frag = require('../public/shaders/fragShader2.glsl')

var pinkBlack = THREE.TextureLoader('../public/pinkBlack.png')

// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 1, 1000 );
camera.position.z = 4;

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer clear color
renderer.setClearColor("#000000");

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );

// ------------------------------------------------
// FUN STARTS HERE
// ------------------------------------------------
// set up shader variables
var uniforms = {
  // time: { type: "f", value: 0 },
  // resolution: { type: "v2", value: new THREE.Vector2 },
  // texture: { type: "t", value: pinkBlack },
  amplitude: {type: 'f', value:1}

}
// Create a Cube Mesh with basic material
var geometry = new THREE.SphereBufferGeometry( 5 , 5, 6 );
var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vert,
    fragmentShader: frag
});
var vertexCount = geometry.attributes.position.count;
var displacement = new Float32Array(vertexCount);
geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 1))
var cube = new THREE.Mesh( geometry, material );

var noise = new Float32Array(vertexCount);
for (var i = 0; i < noise.length; i++) {
  noise[i] = 5*Math.random()
}
// Add cube to Scene
scene.add( cube );

// Render Loop
var render = function () {
  requestAnimationFrame( render );
  // uniforms.time.value += 0.1;
  var time = Date.now() * 0.01;
  for (var i = 0; i < displacement.length; i++) {
    displacement[ i ] = Math.sin( 0.01 * i + time )
    noise[i] += 0.5*(0.5-Math.random());
    noise[i] = THREE.Math.clamp(noise[i], -5, 5);
    displacement[i] += noise[i]
  }
  cube.geometry.attributes.displacement.needsUpdate = true;
  // Render the scene
  renderer.render(scene, camera);
};

render();