import "./WorksSection.scss";

import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";
import { Html, Image } from "@react-three/drei";
import { a, useSpring } from "@react-spring/three";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

import content from "../../content/works";

import WorkCard from "./WorkCard";
import WorkDetail from "./WorkDetail";

function WorksSection() {
  const dispatch = useDispatch();
  const { size } = useThree();
  const [groupSize, setGroupSize] = useState(false);

  let [currentIndex, setCurrentIndex] = useState(0);
  const [showDetail, setShowDetail] = useState(undefined);
  const [spring, api] = useSpring(() => ({
    from: {
      rotation: [0, 0, 0],
    },
  }));

  const closeWorksPage = (e) => {
    e.stopPropagation();
    if (showDetail) return;
    dispatch(setPage("home"));
  };

  const onNextWork = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const onLastWork = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const onOpenDetail = (content) => {
    setShowDetail(content);
  };
  const onCloseDetail = () => {
    setShowDetail(undefined);
  };

  useEffect(() => {
    api.start({
      to: {
        rotation: [0, (currentIndex / content.length) * Math.PI * 2, 0],
      },
    });
  }, [currentIndex]);

  useEffect(() => {
    if (size.width > size.height || size.width > 900) {
      setGroupSize(1);
    } else if (size.width > 600) {
      setGroupSize(1);
    } else {
      setGroupSize(0.8);
    }
  }, [size]);

  return (
    <>
      <group onPointerMissed={closeWorksPage}>
        <a.group rotation={spring.rotation}>
          {content.map((item, index) => (
            <WorkCard
              key={item.id}
              content={item}
              position={[
                Math.sin(((Math.PI * 2) / content.length) * index) * 4 * groupSize,
                0,
                Math.cos(((Math.PI * 2) / content.length) * index) * 4 * groupSize,
              ]}
              scale={groupSize}
              rotation={((Math.PI * 2) / content.length) * index}
              onOpenDetail={() => onOpenDetail(item)}
            />
          ))}
        </a.group>
        <Image
          url={`assets/icons/next-arrow.svg`}
          onClick={onNextWork}
          position={[1 * groupSize, 0, 4 * groupSize]}
          scale={0.4 * groupSize}
          transparent
        />
        <Image
          url={`assets/icons/last-arrow.svg`}
          onClick={onLastWork}
          position={[-1 * groupSize, 0, 4 * groupSize]}
          scale={0.4 * groupSize}
          transparent
        />
        {showDetail && (
          <Html fullscreen className='works-section'>
            <div className='works-section__detail-wrapper' onClick={onCloseDetail}>
              <WorkDetail work={showDetail} />
            </div>
          </Html>
        )}
      </group>
    </>
  );
}

export default WorksSection;
