import { GizmoHelper, GizmoViewport, useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { a, useSpringRef, useSprings } from "@react-spring/three";
import { useNavigate } from "react-router-dom";

import { setPage } from "../../features/pages";

useGLTF.preload("./assets/models/flowers.glb");
useGLTF.preload("./assets/models/about.glb");
useGLTF.preload("./assets/models/contact.glb");
useGLTF.preload("./assets/models/av.glb");
useGLTF.preload("./assets/models/project.glb");

function Plants() {
  const flowers = useGLTF("./assets/models/flowers.glb");
  const about = useGLTF("./assets/models/about.glb");
  const cv = useGLTF("./assets/models/cv.glb");
  const performance = useGLTF("./assets/models/performance.glb");
  const works = useGLTF("./assets/models/works.glb");
  console.log(about);

  const buildingsRef = [];

  buildingsRef[0] = useSpringRef();
  buildingsRef[1] = useSpringRef();
  buildingsRef[2] = useSpringRef();
  buildingsRef[3] = useSpringRef();
  buildingsRef[4] = useSpringRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        scale: [1.2, 1.2, 1.2],
        position: [0, 0, 0],
      },
      config: { mass: 0.1, tension: 180, friction: 10 },
    });
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
  };

  return (
    <>
      <group position={[0, -3, 0]} scale={1.2} rotation-y={Math.PI / 2}>
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
          onPointerOver={(e) => pointerOverEvent(e, 1)}
          onPointerLeave={(e) => pointerLeaveEvent(e, 1)}
          onClick={(e) => onClickPage(e, "cv")}
          object={cv.scene}
          scale={springs[1].scale}
          position={springs[1].position}
          name='cv'
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
