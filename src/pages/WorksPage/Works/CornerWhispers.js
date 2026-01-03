import "./CornerWhispers.scss";
import works from "../../../content/works";
import flowerList from "../../../content/flower-list";
import flower001 from "../../../assets/imgs/pages/corner-whispers/001.png";
import flower003 from "../../../assets/imgs/pages/corner-whispers/003.png";
import flower008 from "../../../assets/imgs/pages/corner-whispers/008.png";
import titleFLower from "../../../assets/imgs/pages/corner-whispers/012.png";
import portrait from "../../../assets/imgs/portrait.jpeg";

import LoadingOverlay from "react-loading-overlay";
import { RingLoader } from "react-spinners";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import FlowerScene from "./FlowerScene";
import { useProgress, SpotLight } from "@react-three/drei";
import BackIcon from "../../../assets/icons/corner-whisper-backward.svg";
import nextIcon from "../../../assets/icons/corner-whisper-forward.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import AwesomeSlider from "react-awesome-slider";
import { Fragment } from "react";

function CornerWhispers() {
  const content = works.filter((value) => value.id === "202401")[0];
  const [CurrentFlower, setCurrentFLower] = useState(10);

  const { active, loaded } = useProgress();
  const photos = ["202401-1.jpg", "202401-2.jpg", "202401-3.jpg", "202401-4.jpg", "202401-5.jpg", "202401-6.jpg"];

  return (
    <div className='corner-whispers'>
      <LoadingOverlay
        active={active}
        spinner={<RingLoader color='white' />}
        text={`${Math.round((loaded * 100) / 51)} %`}
        className='loading-overlay'
      >
        <div className='corner-whispers__background-images'>
          <img src={flower003} alt='flower003' />
          <img src={flower008} alt='flower008' />
          <img src={flower001} alt='flower008' />
        </div>
        <section className='corner-whispers__about'>
          <div className='corner-whispers__title' style={{ backgroundImage: `url('${titleFLower}'` }}>
            <h1>{content.title}</h1>
            <p>{content.year}</p>
          </div>
          <div className='corner-whispers__description' dangerouslySetInnerHTML={{ __html: content.description }} />
        </section>
        <section className='corner-whispers__flowers'>
          <ReactSVG
            className='corner-whispers__flowers-last'
            src={BackIcon}
            onClick={() => setCurrentFLower(CurrentFlower <= 0 ? 12 : CurrentFlower - 1)}
          />
          <ReactSVG
            className='corner-whispers__flowers-next'
            src={nextIcon}
            onClick={() => setCurrentFLower(CurrentFlower >= 12 ? 0 : CurrentFlower + 1)}
          />
          <div className='corner-whispers__canvas'>
            <Suspense>
              <Canvas camera={{ fov: 45, position: [0, 1.5, 2] }}>
                <ambientLight intensity={1} />
                <SpotLight
                  color='white'
                  intensity={1}
                  position={[-2, 3, 5]}
                  distance={500}
                  radiusBottom={200}
                  decay={0}
                  penumbra={0}
                />
                <FlowerScene flower={flowerList[CurrentFlower]} list={flowerList} />
              </Canvas>
            </Suspense>
          </div>
          <div
            className='corner-whispers__flower-detail'
            dangerouslySetInnerHTML={{ __html: flowerList[CurrentFlower].text }}
          />
        </section>
        <section className='corner-whispers__exhibitions'>
          <h1 className='corner-whispers__exhibitions-title'>Exhibitions</h1>
          <div className='corner-whispers__exhibitions-video-wrapper'>
            <iframe
              title='corner whisper video'
              src='https://player.vimeo.com/video/961039766?h=7908025137&title=0&byline=0&portrait=0'
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              frameborder='0'
              allow='autoplay; fullscreen; picture-in-picture'
              allowfullscreen
            ></iframe>
          </div>
          <script src='https://player.vimeo.com/api/player.js'></script>
          <div className='corner-whispers__exhibitions-image-wrapper'>
            <AwesomeSlider style={{ marginBottom: "80px" }} animation='foldOutAnimation' allowFullScreen>
              {photos.map((photo, index) => (
                <Fragment key={index}>
                  <img
                    src={`/assets/images/202401/${photo}`}
                    alt='corner whisper'
                    style={{ objectFit: "contain", width: "100%", height: "100%" }}
                  />
                </Fragment>
              ))}
            </AwesomeSlider>
          </div>
        </section>
        <section className='corner-whispers__about'>
          <div className='corner-whispers__about-text'>
            <h1>Hsiao Li Chi</h1>
            <img className='corner-whispers__about-photo' src={portrait} alt='portrait' />
            <p>
              Li-Chi Hsiao, graduated from Berlin University of Art, is a Taiwanese new media artist whose oeuvre
              encompasses an array of mediums such as audio-visual, installations, and live performances. Her works talk
              about her personal connection with the internet and societal dynamics, reflecting a profound engagement
              with the symbiosis of technology and the individual, inviting audiences to contemplate the convergence of
              personal narratives within the digital landscape and the broader societal framework.
            </p>
            <Link to='/' className='corner-whispers__about-website'>
              HSIAO-LI-CHI.COM
            </Link>
            <div>
              &#115;&#105;&#097;&#111;&#046;&#108;&#105;&#099;&#104;&#105;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;
            </div>
          </div>
        </section>
      </LoadingOverlay>
    </div>
  );
}

export default CornerWhispers;
