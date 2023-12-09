import "./WebList.scss";
import websites from "../../content/websites";
import { Html, Image, Scroll, ScrollControls } from "@react-three/drei";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";
import { useThree } from "@react-three/fiber";

function WebList() {
  const dispatch = useDispatch();
  const { width, height } = useThree((state) => state.viewport);
  return (
    // <Html className='web-list' fullscreen>
    //   <div className='web-list__wrapper' onClick={() => dispatch(setPage("home"))}>
    //     <div className='web-list__grid' onClick={(e) => e.stopPropagation()}>
    //       {websites.map((item) => (
    //         <a href={item.link} className='web-list__link' key={item.name} target='_blank' rel='noreferrer'>
    //           <img className='web-list__image' src={`/assets/images/websites/${item.src}`} alt={item.name} />
    //         </a>
    //       ))}
    //     </div>
    //   </div>
    // </Html>
    <ScrollControls pages={websites.length + 1}>
      <Scroll>
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
      </Scroll>
      <Scroll html>
        {websites.map((item, index) => (
          <div className='web-list__title-wrapper' key={item.name}>
            <h1 className='web-list__title'>{websites[index].name}</h1>
            <a className='web-list__link' href={item.link}>
              <h2>LINK</h2>
            </a>
          </div>
        ))}
      </Scroll>
    </ScrollControls>
  );
}

export default WebList;
