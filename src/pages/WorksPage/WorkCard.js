import "./WorkCard.scss";

import { useSpring, a } from "@react-spring/three";
import { Html, Image, Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";
import WorkDetail from "./WorkDetail";
import { ReactSVG } from "react-svg";

import BackIcon from "../../assets/icons/back.svg";

function WorkCard({ position, rotation, content }) {
  const [showDetail, setShowDetail] = useState(false);
  const [spring, api] = useSpring(() => ({
    from: { cardSize: 0 },
  }));

  useEffect(() => {
    api.start({
      to: {
        cardSize: 1,
      },
    });
  }, []);

  const onOpenDetail = () => {
    setShowDetail(true);
  };
  const onCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <>
      <a.group onClick={onOpenDetail} position={position} rotation={[0, rotation, 0]} scale={spring.cardSize}>
        <mesh scale={[1.5, 1.5, 1]}>
          <planeGeometry position={[0, 0, 0]} />
          <meshPhongMaterial color={"blue"} emissive={"blue"} emissiveIntensity={1} blending={THREE.AdditiveBlending} />
        </mesh>
        <mesh scale={[1.4, 1.4, 1]}>
          <planeGeometry position={[0, 0, -0.1]} />
          <meshPhongMaterial emissive={"blue"} emissiveIntensity={1} />
        </mesh>
        {content.photos.length > 0 && (
          <Image url={`assets/images/${content.id}/${content.photos[0]}`} position={[0, 0.1, 0.1]} />
        )}
        <Text fontSize={0.1} position={[0, -0.5, 0.1]} color={"white"} font=''>
          {content.title}
        </Text>
        <Text fontSize={0.05} position={[0, -0.6, 0.1]} color={"white"}>
          {content.year}
        </Text>
      </a.group>
      {showDetail && (
        <Html fullscreen className='work-card'>
          <ReactSVG className='back-icon' src={BackIcon} onClick={onCloseDetail} />
          <WorkDetail work={content} />
        </Html>
      )}
    </>
  );
}

export default WorkCard;
