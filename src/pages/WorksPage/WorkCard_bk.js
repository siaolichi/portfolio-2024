import "./WorkCard.scss";

import { Image, Text } from "@react-three/drei";
import * as THREE from "three";

function WorkCard({ position, rotation, content, onOpenDetail, scale }) {
  return (
    <>
      <group onClick={onOpenDetail} position={position} rotation={[0, rotation, 0]}>
        <mesh scale={[1.5 * scale, 1.5 * scale, 1 * scale]}>
          <planeGeometry position={[0, 0, 0]} />
          <meshPhongMaterial color={"blue"} emissive={"blue"} emissiveIntensity={1} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh scale={[1.4 * scale, 1.4 * scale, 1 * scale]}>
          <planeGeometry position={[0, 0, -0.1]} />
          <meshPhongMaterial emissive={"blue"} emissiveIntensity={1} />
        </mesh>
        {content.photos.length > 0 && (
          <Image
            url={`assets/images/${content.id}/${content.photos[0]}`}
            position={[0, 0.1 * scale, 0.1]}
            scale={scale}
          />
        )}
        <Text fontSize={0.1 * scale} position={[0, -0.5 * scale, 0.1]} color={"white"}>
          {content.title}
        </Text>
        <Text fontSize={0.05 * scale} position={[0, -0.6 * scale, 0.1]} color={"white"}>
          {content.year}
        </Text>
      </group>
    </>
  );
}

export default WorkCard;
