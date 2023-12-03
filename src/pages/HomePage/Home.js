import "./Home.css";
import { Canvas } from "@react-three/fiber";
import { useSelector } from "react-redux";

import Street from "./Street";
import Title from "./Title";
import HomeEffects from "./HomeEffects";
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

  return (
    <div className='Home'>
      {currentPage === "home" && <Title />}
      {currentPage === "home" && <RollingText />}
      <BackgroundElements />
      <Canvas className='canvas' camera={{ fov: 45, position: [-1, 5, 8] }}>
        <CameraControl />
        {currentPage === "about" && <AboutSection />}
        {currentPage === "contact" && <ContactSection />}
        {currentPage === "works" && <WorksSection />}
        {currentPage === "websites" && <WebList />}
        {currentPage === "audiovisual" && <AudioPage />}
        <Street />
        {/* <HomeEffects /> */}
      </Canvas>
    </div>
  );
}

export default Home;
