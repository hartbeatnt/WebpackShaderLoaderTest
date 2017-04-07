// shared variable to pass information
// to the frag shader
varying vec3 vNormal;
varying vec2 vUv;
// create a 'displacement' attribute
// variable to adjust vertex positions
// and a 'amplitude' uniform float
attribute float displacement;
uniform float amplitude;

void main() {
  // 'normal' is an attribute variable
  // automatically created by THREE.js.
  // Save it to vNormal to give the 
  // frag shader access to it
  vNormal = normal;
  vUv = (0.5 + amplitude) * uv + vec2(amplitude);

  // push the displacement into the three
  // positions of a vec3 so it can be used
  // in relation to other vec3's
  vec3 newPosition = position +
    normal * amplitude * vec3(displacement);

  gl_Position = projectionMatrix * 
                modelViewMatrix *
                vec4(newPosition, 1.0);
}