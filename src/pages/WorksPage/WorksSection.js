import "./WorksSection.scss";

import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/pages";
import { Html, PresentationControls } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { useThree } from "@react-three/fiber";

import content from "../../content/works";

import WorkCard from "./WorkCard";
import WorkDetail from "./WorkDetail";

function WorksSection() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pages.currentPage);
  const groupRef = useRef();

  useEffect(() => {
    if (currentPage === "works") groupRef.current.visible = true;
    else groupRef.current.visible = false;
  }, [currentPage, groupRef]);

  const { size } = useThree();
  const [groupSize, setGroupSize] = useState(false);

  const [showDetail, setShowDetail] = useState(undefined);

  const closeWorksPage = (e) => {
    e.stopPropagation();
    if (showDetail) return;
    dispatch(setPage("home"));
  };

  const onOpenDetail = (content) => {
    setShowDetail(content);
  };
  const onCloseDetail = () => {
    setShowDetail(undefined);
  };

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
      <group ref={groupRef} onPointerMissed={closeWorksPage}>
        <PresentationControls global polar={[0, 0, 0]}>
          <group rotation={[0, 0, 0]}>
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
          </group>
        </PresentationControls>
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
