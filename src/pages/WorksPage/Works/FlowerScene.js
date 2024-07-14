import { useAnimations } from "@react-three/drei";
import { useEffect } from "react";

import { useGLTF } from "@react-three/drei";

// useGLTF.preload(`../../assets/models/${flowerList[0].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[1].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[2].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[3].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[4].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[5].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[6].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[7].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[8].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[9].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[10].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[11].title}.glb`);
// useGLTF.preload(`../../assets/models/${flowerList[12].title}.glb`);

function FlowerScene({ list, flower }) {
  list[0].model = useGLTF(`../../assets/models/${list[0].title}.glb`);
  list[1].model = useGLTF(`../../assets/models/${list[1].title}.glb`);
  list[2].model = useGLTF(`../../assets/models/${list[2].title}.glb`);
  list[3].model = useGLTF(`../../assets/models/${list[3].title}.glb`);
  list[4].model = useGLTF(`../../assets/models/${list[4].title}.glb`);
  list[5].model = useGLTF(`../../assets/models/${list[5].title}.glb`);
  list[6].model = useGLTF(`../../assets/models/${list[6].title}.glb`);
  list[7].model = useGLTF(`../../assets/models/${list[7].title}.glb`);
  list[8].model = useGLTF(`../../assets/models/${list[8].title}.glb`);
  list[9].model = useGLTF(`../../assets/models/${list[9].title}.glb`);
  list[10].model = useGLTF(`../../assets/models/${list[10].title}.glb`);
  list[11].model = useGLTF(`../../assets/models/${list[11].title}.glb`);
  list[12].model = useGLTF(`../../assets/models/${list[12].title}.glb`);

  const { actions } = useAnimations(flower.model.animations, flower.model.scene);
  console.log(actions);

  useEffect(() => {
    actions?.[`Idle_${flower.title}`].play();
  });
  return (
    <>
      <primitive object={flower.model.scene} />
    </>
  );
}

export default FlowerScene;
