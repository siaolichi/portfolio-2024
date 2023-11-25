import { Html, shaderMaterial } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import glsl from "babel-plugin-glsl/macro";
import { useRef } from "react";

const PortalMaterial = shaderMaterial(
  { uTime: 0, uColorStart: new THREE.Color("hotpink"), uColorEnd: new THREE.Color("white") },
  glsl`
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }`,
  glsl`
  #pragma glslify: cnoise3 = require(glsl-noise/classic/3d.glsl) 
  uniform float uTime;
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  varying vec2 vUv;
  void main() {
    vec2 displacedUv = vUv + cnoise3(vec3(vUv * 7.0, uTime * 0.1));
    float strength = cnoise3(vec3(displacedUv * 5.0, uTime * 0.2));
    float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
    strength += outerGlow;
    strength += step(-0.2, strength) * 0.8;
    strength = clamp(strength, 0.0, 1.0);
    vec3 color = mix(uColorStart, uColorEnd, strength);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }`
);

// shaderMaterial creates a THREE.ShaderMaterial, and auto-creates uniform setter/getters
// extend makes it available in JSX, in this case <portalMaterial />
extend({ PortalMaterial });

const BloomMaterial = shaderMaterial(
  { a_position: new THREE.Vector3(0, 0, 0), a_tex_coord: new THREE.Color(1, 1, 1) },
  // vertex shader
  glsl`
    in vec2 a_position;
    in vec2 a_tex_coord;
    in vec4 a_colour;

    uniform mat4 matrix;

    out vec4 v_colour;
    out vec2 tex_coord;

    void main() {
      v_colour = a_colour;
      tex_coord = a_tex_coord;
      gl_Position = matrix * vec4(a_position, 0, 1);
    }
  `,
  // fragment shader
  glsl`
    in vec4 v_colour;
    in vec2 tex_coord;
    out vec4 pixel;

    uniform sampler2D t0;
    uniform float bloom_spread = 1;
    uniform float bloom_intensity = 2;
    void main() {
      ivec2 size = textureSize(t0, 0);

        float uv_x = tex_coord.x * size.x;
        float uv_y = tex_coord.y * size.y;

        vec4 sum = vec4(0.0);
        for (int n = 0; n < 9; ++n) {
            uv_y = (tex_coord.y * size.y) + (bloom_spread * float(n - 4));
            vec4 h_sum = vec4(0.0);
            h_sum += texelFetch(t0, ivec2(uv_x - (4.0 * bloom_spread), uv_y), 0);
            h_sum += texelFetch(t0, ivec2(uv_x - (3.0 * bloom_spread), uv_y), 0);
            h_sum += texelFetch(t0, ivec2(uv_x - (2.0 * bloom_spread), uv_y), 0);
            h_sum += texelFetch(t0, ivec2(uv_x - bloom_spread, uv_y), 0);
            h_sum += texelFetch(t0, ivec2(uv_x, uv_y), 0);
            h_sum += texelFetch(t0, ivec2(uv_x + bloom_spread, uv_y), 0);
            h_sum += texelFetch(t0, ivec2(uv_x + (2.0 * bloom_spread), uv_y), 0);
            h_sum += texelFetch(t0, ivec2(uv_x + (3.0 * bloom_spread), uv_y), 0);
            h_sum += texelFetch(t0, ivec2(uv_x + (4.0 * bloom_spread), uv_y), 0);
            sum += h_sum / 9.0;
        }

        pixel = texture(t0, tex_coord) - ((sum / 9.0) * bloom_intensity);
    }
  `
);

// declaratively
extend({ BloomMaterial });

function WorkCard({ position }) {
  // const portalMaterial = useRef();
  // useFrame((_, delta) => (portalMaterial.current.uTime += delta));
  return (
    <>
      <mesh position={position}>
        <boxGeometry args={[2, 2, 0.5]} />
        {/* <portalMaterial
          ref={portalMaterial}
          blending={THREE.AdditiveBlending}
          uColorStart='#FF69B4'
          uColorEnd='#FF50B6'
        /> */}
        <meshStandardMaterial
          transparent
          emissive={"blue"}
          blending={THREE.AdditiveBlending}
          emissiveIntensity={1}
          color={"blue"}
          opacity={0.8}
        />
        <Html center>HHHHHHHH</Html>
      </mesh>
    </>
  );
}

export default WorkCard;
