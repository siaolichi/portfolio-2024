import "./Home.scss";

import LoadingOverlay from "react-loading-overlay";
import { RingLoader } from "react-spinners";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { useProgress, CameraControls, OrthographicCamera } from "@react-three/drei";
import { Suspense, useEffect } from "react";

import Plants from "./Plants";
import AboutSection from "../AboutPage/AboutSection";
import CameraControl from "./CameraControl";
import WorksSection from "../WorksPage/WorksSection";
import ContactSection from "../ContactPage/ContactSection";
import WebList from "../Webpage/WebList";
import AudioPage from "../AudioPage/AudioPage";

import instagramImg from "../../assets/icons/instagram_dark.svg";
import soundcloudImg from "../../assets/icons/soundcloud_dark.svg";
import emailImg from "../../assets/icons/email_dark.svg";
import WorkCarousel from "../WorksPage/WorkCarousel";

function Home() {
  const currentPage = useSelector((state) => state.pages.currentPage);
  const { active, progress } = useProgress();
  return (
    <div className='Home'>
      <LoadingOverlay
        active={active}
        spinner={<RingLoader color='white' />}
        className='loading-overlay'
        text={`${Math.round(progress)} %`}
      >
        <Suspense>
          <div className='canvas-wrapper'>
            <Canvas className='canvas' camera={{ fov: 90 }}>
              {/* <OrthographicCamera> */}
              {/* <CameraControls /> */}
              <CameraControl />
              {currentPage === "about" && <AboutSection />}
              {currentPage === "contact" && <ContactSection />}
              <Plants />
              {/* </OrthographicCamera> */}
            </Canvas>
          </div>
        </Suspense>
        {currentPage === "works" && <WorkCarousel />}
        <div id='footer'>
          <a href='https://www.instagram.com/hsiao.li.chi/'>
            <img src={instagramImg} alt='instagram' height='30px' />
          </a>
          <a href='https://soundcloud.com/siao'>
            <img src={soundcloudImg} alt='soundcloud' height='28px' />
          </a>

          <a href='mailto:siao.lichi@gmail.com'>
            <img src={emailImg} alt='email' height='28px' />
          </a>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default Home;
