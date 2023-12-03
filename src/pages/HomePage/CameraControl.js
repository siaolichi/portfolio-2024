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
        springApi.start({ position: [0, 5, 8] });
        break;
      case "about":
        if (three.size.width > 900) {
          springApi.start({ position: [-2, 1.2, 2] });
        } else {
          springApi.start({ position: [-1.9, 0, 1.5] });
        }
        break;
      case "contact":
        if (three.size.width > 900) {
          springApi.start({ position: [3, -1, 3] });
        } else {
          springApi.start({ position: [2, 0, 1.8] });
        }
        break;
      case "works":
        springApi.start({ position: [0, 0, 8] });
        break;
      case "websites":
        springApi.start({ position: [0, 8, 0] });
        break;
    }
  }, [currentPage]);

  return "";
}

export default CameraControl;
