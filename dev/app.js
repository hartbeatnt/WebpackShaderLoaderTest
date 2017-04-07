var THREE = require('three')
// Load shaders and texture
var vert1 = require('../public/shaders/vertShader1.glsl')
var frag1 = require('../public/shaders/fragShader1.glsl')
var pinkBlack = THREE.TextureLoader('../public/pinkBlack.png')

// ------------------------------------------------
// BASIC SETUP
// ------------------------------------------------

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
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
  time: { type: "f", value: 0 },
  resolution: { type: "v2", value: new THREE.Vector2 },
  texture: { type: "t", value: pinkBlack }  
}
// Create a Cube Mesh with basic material
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vert1,
    fragmentShader: frag1
});
var cube = new THREE.Mesh( geometry, material );

// Add cube to Scene
scene.add( cube );

// Render Loop
var render = function () {
  requestAnimationFrame( render );
  uniforms.time.value += 0.1;
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // Render the scene
  renderer.render(scene, camera);
};

render();