import { useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

function Particles() {
  const particlesRef = useRef();
  const texture = useLoader(THREE.TextureLoader, "./assets/img/snow.jpg");
  const verticesAmount = 2000;
  const positionArray = new Float32Array(verticesAmount * 3);

  useFrame((_, delta) => {
    particlesRef.current.rotation.x -= delta * 0.1;
    particlesRef.current.rotation.y += delta * 0.1;
  });

  for (let i = 0; i < verticesAmount * 3; i++) {
    positionArray[i] = (Math.random() - 0.5) * 10;
  }

  const points = new THREE.BufferAttribute(positionArray, 3);

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' {...points} />
      </bufferGeometry>
      <pointsMaterial size={0.02} alphaMap={texture} transparent depthTest={false} />
    </points>
  );
}

export default Particles;
