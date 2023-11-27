import { useSpring } from "@react-spring/three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Vector3 } from "three";

function CameraControl() {
  const currentPage = useSelector((state) => state.pages.currentPage);

  const three = useThree();
  const [_, springApi] = useSpring(() => ({
    from: {
      position: [0, 0, 0],
    },
    onChange: ({ value }) => {
      const position = value.position;
      three.camera.position.x = position[0];
      three.camera.position.y = position[1];
      three.camera.position.z = position[2];

      three.camera.lookAt(new Vector3(0, 0, 0));
    },
  }));

  useEffect(() => {
    switch (currentPage) {
      default:
      case "home":
      case "about":
        springApi.start({ position: [0, 5, 8] });
        break;
      case "works":
        springApi.start({ position: [0, 0, 8] });
        break;
    }
  }, [currentPage]);

  return "";
}

export default CameraControl;
