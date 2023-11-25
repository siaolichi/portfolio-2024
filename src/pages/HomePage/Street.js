import { SpotLight, PresentationControls, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { a, useSpring, useSpringRef, useSprings } from "@react-spring/three";
import { useThree } from "@react-three/fiber";

import { setPage } from "../../features/pages";

// import Cat from "./Cat";

useGLTF.preload("./assets/street.glb");
useGLTF.preload("./assets/building1.glb");
useGLTF.preload("./assets/building2.glb");
useGLTF.preload("./assets/building3.glb");
useGLTF.preload("./assets/building4.glb");
useGLTF.preload("./assets/building5.glb");

const jump = (item) => {
  item.start({
    to: [
      {
        scale: [1, 0.5, 1],
        position: [0, 2, 0],
      },
      {
        scale: [1, 1, 1],
        position: [0, 0, 0],
      },
    ],
    config: { mass: 0.1, tension: 180, friction: 10 },
  });
};

function Street() {
  const [groupSize, setGroupSize] = useState(false);
  const { size } = useThree();

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pages.currentPage);

  const buildings = [];
  const buildingsRef = [];

  const street = useGLTF("./assets/street.glb");

  buildings[0] = useGLTF("./assets/building1.glb");
  buildings[1] = useGLTF("./assets/building2.glb");
  buildings[2] = useGLTF("./assets/building3.glb");
  buildings[3] = useGLTF("./assets/building4.glb");
  buildings[4] = useGLTF("./assets/building5.glb");

  buildingsRef[0] = useSpringRef();
  buildingsRef[1] = useSpringRef();
  buildingsRef[2] = useSpringRef();
  buildingsRef[3] = useSpringRef();
  buildingsRef[4] = useSpringRef();

  const [lightSpring, lightApi] = useSpring(() => ({
    from: {
      intensity: 1,
    },
  }));

  useEffect(() => {
    if (currentPage !== "home") {
      lightApi.start({ to: { intensity: 0 } });
    } else {
      lightApi.start({ to: { intensity: 1 } });
    }
  }, [currentPage]);

  useEffect(() => {
    if (size.width > size.height || size.width > 900) {
      setGroupSize(1);
    } else if (size.width > 600) {
      setGroupSize(0.8);
    } else {
      setGroupSize(0.5);
    }
  }, [size]);

  const springs = useSprings(
    5,
    buildingsRef.map((item) => ({
      ref: item,
      from: {
        scale: [1, 1, 1],
        position: [0, 0, 0],
      },
      config: { mass: 0.1, tension: 180, friction: 10 },
    }))
  );

  const clickEvent = (e, num) => {
    e.stopPropagation();
    jump(buildingsRef[num]);
  };

  const onClickAbout = (e) => {
    if (currentPage !== "home") return;
    e.stopPropagation();
    dispatch(setPage("about"));
    jump(buildingsRef[0]);
  };

  const onClickWorks = (e) => {
    if (currentPage !== "home") return;
    e.stopPropagation();
    dispatch(setPage("works"));
    jump(buildingsRef[4]);
  };

  const pointerOverEvent = (e, num) => {
    if (currentPage !== "home") return;
    e.stopPropagation();
    buildingsRef[num].start({
      to: {
        scale: [1, 1.2, 1],
        position: [0, 0.1, 0],
      },
      config: { mass: 0.1, tension: 180, friction: 10 },
    });
  };

  const pointerLeaveEvent = (e, num) => {
    if (currentPage !== "home") return;
    e.stopPropagation();
    buildingsRef[num].start({
      to: {
        scale: [1, 1, 1],
        position: [0, 0, 0],
      },
      config: { mass: 0.1, tension: 180, friction: 10 },
    });
  };

  return (
    <>
      <PresentationControls
        global
        snap={{ mass: 2, tension: 1500 }}
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <group position={[0, 0, 0]} rotation-y={(-Math.PI * 2) / 3} scale={groupSize}>
          <primitive object={street.scene} />
          <a.ambientLight intensity={lightSpring.intensity} />
          {/* <directionalLight /> */}
          <SpotLight
            color='white'
            intensity={0.2}
            position={[-2, 3, 5]}
            distance={500}
            radiusBottom={200}
            decay={0}
            penumbra={0}
          />
          <SpotLight
            color='white'
            intensity={0.2}
            position={[-2, 3, -5]}
            distance={500}
            radiusBottom={200}
            decay={0}
            penumbra={0}
          />
          <a.primitive
            onPointerOver={(e) => pointerOverEvent(e, 0)}
            onPointerLeave={(e) => pointerLeaveEvent(e, 0)}
            onClick={onClickAbout}
            object={buildings[0].scene}
            scale={springs[0].scale}
            position={springs[0].position}
          />
          <a.primitive
            onPointerOver={(e) => pointerOverEvent(e, 1)}
            onPointerLeave={(e) => pointerLeaveEvent(e, 1)}
            onClick={(e) => clickEvent(e, 1)}
            object={buildings[1].scene}
            scale={springs[1].scale}
            position={springs[1].position}
          />
          <a.primitive
            onPointerOver={(e) => pointerOverEvent(e, 2)}
            onPointerLeave={(e) => pointerLeaveEvent(e, 2)}
            onClick={(e) => clickEvent(e, 2)}
            object={buildings[2].scene}
            scale={springs[2].scale}
            position={springs[2].position}
          />
          <a.primitive
            onPointerOver={(e) => pointerOverEvent(e, 3)}
            onPointerLeave={(e) => pointerLeaveEvent(e, 3)}
            onClick={(e) => clickEvent(e, 3)}
            scale={springs[3].scale}
            position={springs[3].position}
            object={buildings[3].scene}
          />
          <a.primitive
            onPointerOver={(e) => pointerOverEvent(e, 4)}
            onPointerLeave={(e) => pointerLeaveEvent(e, 4)}
            onClick={onClickWorks}
            object={buildings[4].scene}
            scale={springs[4].scale}
            position={springs[4].position}
          />
        </group>
      </PresentationControls>
    </>
  );
}

export default Street;
