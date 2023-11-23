import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

// import { useControls } from "leva";

useGLTF.preload("/cat.glb");

function Cat() {
  const catRef = useRef();

  const cat = useGLTF("/cat.glb");
  const { actions } = useAnimations(cat.animations, cat.scene);

  // const levaControl = useControls({
  //   XPosition: 0,
  //   YPosition: 0,
  //   ZPosition: 0,
  //   XRotation: 0,
  //   YRotation: 0,
  //   ZRotation: 0,
  // });

  /*- Native Threee.js animation code example

  const mixer = new THREE.AnimationMixer(cat.scene.children[0]);
  const idleAction = mixer.clipAction(animations[0]);

  useEffect(() => {
    if (idleAction) idleAction.play();
  }, [idleAction]);

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  -*/

  useEffect(() => {
    actions.Idle.play();
  });

  return (
    <>
      <primitive ref={catRef} object={cat.scene} scale={5} position={[1.5, -1.04, -2]} rotation-y={Math.PI / 2} />
    </>
  );
}

export default Cat;
