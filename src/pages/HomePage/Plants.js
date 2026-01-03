import { useAnimations, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { a, useSpringRef, useSprings } from "@react-spring/three";
import { useNavigate } from "react-router-dom";

import { setPage } from "../../features/pages";

useGLTF.preload("./assets/models/flowers.glb");
useGLTF.preload("./assets/models/about.glb");
useGLTF.preload("./assets/models/performance.glb");
useGLTF.preload("./assets/models/works.glb");
useGLTF.preload("./assets/models/namw.glb");

function Plants() {
  const flowers = useGLTF("./assets/models/flowers.glb");
  const about = useGLTF("./assets/models/about.glb");
  const performance = useGLTF("./assets/models/performance.glb");
  const works = useGLTF("./assets/models/works.glb");
  const name = useGLTF("./assets/models/name.glb");

  const buildingsRef = [];

  buildingsRef[0] = useSpringRef();
  buildingsRef[1] = useSpringRef();
  buildingsRef[2] = useSpringRef();
  buildingsRef[3] = useSpringRef();
  buildingsRef[4] = useSpringRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { size } = useThree();

  const { actions } = useAnimations(flowers.animations, flowers.scene);

  useEffect(() => {
    for (const [_, action] of Object.entries(actions)) {
      action.play();
    }
  });

  const currentPage = useSelector((state) => state.pages.currentPage);
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

  const onClickPage = (e, page) => {
    if (currentPage !== "home") return;
    e.stopPropagation();

    if (page === "performance") navigate("performance");
    dispatch(setPage(page));
  };

  const pointerOverEvent = (e, num) => {
    // if (currentPage !== "home") return;
    e.stopPropagation();
    buildingsRef[num].start({
      to: {
        scale: [1.1, 1.1, 1.1],
        position: [0, 0, 0],
      },
      config: { mass: 0.1, tension: 180, friction: 10 },
    });

    document.body.style.cursor = "pointer";
  };

  const pointerLeaveEvent = (e, num) => {
    // if (currentPage !== "home") return;
    e.stopPropagation();
    buildingsRef[num].start({
      to: {
        scale: [1, 1, 1],
        position: [0, 0, 0],
      },
      config: { mass: 0.1, tension: 180, friction: 10 },
    });

    document.body.style.cursor = "default";
  };

  return (
    <>
      <primitive
        object={name.scene}
        position={size.width > 960 ? [0, 1.5, 0] : [0, 3, 0]}
        scale={size.width > 960 ? 1 : 1.2}
        rotation-x={size.width > 960 ? Math.PI / 6 : Math.PI / 8}
      />
      <group
        position={size.width > 960 ? [0.1, -3, 0] : [0, -5, 0]}
        scale={size.width > 960 ? 1.2 : 1.5}
        rotation-y={Math.PI / 2}
        rotation-x={-Math.PI / 8}
      >
        <primitive object={flowers.scene} />

        <ambientLight intensity={1} />
        {/* <GizmoHelper
          alignment='bottom-right'
          margin={[80, 80]}
        >
          <GizmoViewport axisColors={["red", "green", "blue"]} labelColor='black' />
        </GizmoHelper> */}
        <a.primitive
          onPointerOver={(e) => pointerOverEvent(e, 0)}
          onPointerLeave={(e) => pointerLeaveEvent(e, 0)}
          onClick={(e) => onClickPage(e, "about")}
          object={about.scene}
          scale={springs[0].scale}
          position={springs[0].position}
          name='about'
        />
        <a.primitive
          onPointerOver={(e) => pointerOverEvent(e, 2)}
          onPointerLeave={(e) => pointerLeaveEvent(e, 2)}
          onClick={(e) => onClickPage(e, "performance")}
          object={performance.scene}
          scale={springs[2].scale}
          position={springs[2].position}
          name='performance'
        />
        <a.primitive
          onPointerOver={(e) => pointerOverEvent(e, 3)}
          onPointerLeave={(e) => pointerLeaveEvent(e, 3)}
          onClick={(e) => onClickPage(e, "works")}
          scale={springs[3].scale}
          position={springs[3].position}
          object={works.scene}
          name='works'
        />
      </group>
    </>
  );
}

export default Plants;
