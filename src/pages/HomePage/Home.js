import "./Home.css";

import LoadingOverlay from "react-loading-overlay";
import { RingLoader } from "react-spinners";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { useProgress } from "@react-three/drei";
import { Suspense } from "react";

import Street from "./Street";
import Title from "./Title";
// import HomeEffects from "./HomeEffects";
import BackgroundElements from "./BackgroundElements";
import RollingText from "./RollingText";
import AboutSection from "../AboutPage/AboutSection";
import CameraControl from "./CameraControl";
import WorksSection from "../WorksPage/WorksSection";
import ContactSection from "../ContactPage/ContactSection";
import WebList from "../Webpage/WebList";
import AudioPage from "../AudioPage/AudioPage";
function Home() {
  const currentPage = useSelector((state) => state.pages.currentPage);
  const { active } = useProgress();

  return (
    <div className='Home'>
      <LoadingOverlay active={active} spinner={<RingLoader color='white' />} className='loading-overlay'>
        <Suspense>
          {currentPage === "home" && <Title />}
          {currentPage === "home" && <RollingText />}
          <BackgroundElements />
          <Canvas className='canvas' camera={{ fov: 45, position: [-1, 5, 8] }}>
            <CameraControl />
            {currentPage === "about" && <AboutSection />}
            {currentPage === "contact" && <ContactSection />}
            <WorksSection />
            {currentPage === "websites" && <WebList />}
            {currentPage === "audio" && <AudioPage />}
            <Street />
            {/* {currentPage === "home" && <HomeEffects />} */}
          </Canvas>
        </Suspense>
      </LoadingOverlay>
    </div>
  );
}

export default Home;
