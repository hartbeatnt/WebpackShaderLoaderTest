// vNormal will be passed in from the 
// vertex shader
varying vec3 vNormal;
varying vec2 vUv;

void main() {
  // create a 'light' vector
  vec3 light = vec3(0.5, 0.2, 1.0);
  // 'normalize' is a native GLSL function
  // to calculate a vector's unit vector
  light = normalize(light);
  // calculate the dot product of the light
  // to the vertex and clamp it b/t 0 & 1
  float dProd = max(0.0, dot(vNormal, light));
  // feed the dot product into fragment color
  gl_FragColor = vec4(dProd, dProd, dProd, 1.0);
}

// NOTE:
// The 'Dot Product' of two vectors a & b can be
// calculated in one of two ways:
// -- a · b = |a| × |b| × cos(θ)
////  --OR
// -- a · b = a.x × b.x + a.y × b.y + a.z × b.z
//// -- (for 2d vectors the z value would be 0)