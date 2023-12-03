import "./WorksSection.scss";
import WorkCard from "./WorkCard";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";
import content from "../../content/works";

import BackIcon from "../../assets/icons/back.svg";
import LaseIcon from "../../assets/icons/last-arrow.svg";
import NextIcon from "../../assets/icons/next-arrow.svg";
import { Html } from "@react-three/drei";
import { ReactSVG } from "react-svg";

function WorksSection() {
  const dispatch = useDispatch();
  const closeWorksPage = (e) => {
    e.stopPropagation();
    dispatch(setPage("home"));
  };

  return (
    <>
      <group>
        {content.map((item, index) => (
          <WorkCard
            key={item.id}
            content={item}
            position={[
              Math.sin(((Math.PI * 2) / content.length) * index) * 4,
              0,
              Math.cos(((Math.PI * 2) / content.length) * index) * 4,
            ]}
            rotation={((Math.PI * 2) / content.length) * index}
          />
        ))}
      </group>
      <Html fullscreen className='works-section'>
        <ReactSVG className='back-icon' src={BackIcon} onClick={closeWorksPage} />
      </Html>
    </>
  );
}

export default WorksSection;
