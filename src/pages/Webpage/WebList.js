import "./WebList.scss";
import websites from "../../content/websites";
import { Image, Scroll, ScrollControls } from "@react-three/drei";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/pages";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function WebList() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pages.currentPage);
  const groupRef = useRef();
  const scrollRef = useRef();
  const { height } = useThree((state) => state.viewport);

  useEffect(() => {
    if (currentPage === "websites") groupRef.current.visible = true;
    else groupRef.current.visible = false;
    console.log(scrollRef);
  }, [currentPage, groupRef]);

  const onBackHome = (e) => {
    e.stopPropagation();
    dispatch(setPage("home"));
  };
  return (
    <ScrollControls className='scroll-control' ref={scrollRef} pages={currentPage === "websites" ? websites.length : 0}>
      <Scroll>
        <group onPointerMissed={onBackHome} ref={groupRef}>
          {websites.map((item, index) => (
            <group>
              <Image
                url={`/assets/images/websites/${item.src}-desktop.png`}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0.2, 4 - index * height, 0]}
                scale={[16 / 8, 9 / 8]}
              />
              <Image
                url={`/assets/images/websites/${item.src}-mobile.png`}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[-0.5, 6 - index * height, 0]}
                scale={[9 / 15, 16 / 15]}
              />
            </group>
          ))}
        </group>
      </Scroll>
      <Scroll html>
        {currentPage === "websites" &&
          websites.map((item, index) => (
            <div className='web-list__title-wrapper' key={item.name}>
              <h1 className='web-list__title' onClick={(e) => e.stopPropagation()}>
                {websites[index].name}
              </h1>
              <a
                className='web-list__link'
                onClick={(e) => e.stopPropagation()}
                href={item.link}
                target='_blank'
                rel='noreferrer'
              >
                <h2>LINK</h2>
              </a>
            </div>
          ))}
      </Scroll>
    </ScrollControls>
  );
}

export default WebList;
