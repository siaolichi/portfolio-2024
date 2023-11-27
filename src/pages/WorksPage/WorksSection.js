import "./WorksSection.scss";
import WorkCard from "./WorkCard";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";
import content from "../../content/works";

import BackIcon from "../../assets/icons/back.svg";
import LastIcon from "../../assets/icons/last-arrow.svg";
import NextIcon from "../../assets/icons/next-arrow.svg";
import { Html } from "@react-three/drei";
import { ReactSVG } from "react-svg";
import { a, useSpring } from "@react-spring/three";
import { useEffect, useState } from "react";

function WorksSection() {
  const dispatch = useDispatch();
  let [currentIndex, setCurrentIndex] = useState(0);
  const [spring, api] = useSpring(() => ({
    from: {
      rotation: [0, 0, 0],
    },
  }));

  const closeWorksPage = (e) => {
    e.stopPropagation();
    dispatch(setPage("home"));
  };

  const onNextWork = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const onLastWork = () => {
    setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    api.start({
      to: {
        rotation: [0, (currentIndex / content.length) * Math.PI * 2, 0],
      },
    });
  }, [currentIndex]);

  return (
    <>
      <a.group rotation={spring.rotation}>
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
      </a.group>
      <Html fullscreen className='works-section'>
        <ReactSVG className='back-icon' src={BackIcon} onClick={closeWorksPage} />
        <ReactSVG className='next-icon' src={NextIcon} onClick={onNextWork} />
        <ReactSVG className='last-icon' src={LastIcon} onClick={onLastWork} />
      </Html>
    </>
  );
}

export default WorksSection;
