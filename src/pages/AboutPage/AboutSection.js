import { Html } from "@react-three/drei";
import "./AboutSection.scss";
import { useSprings, a, useSpringRef } from "@react-spring/web";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";

import paper from "../../assets/imgs/paper.png";

function AboutSection() {
  // const title = useSpringRef();
  const border = useSpringRef();
  const content = useSpringRef();
  const dispatch = useDispatch();

  const spring = useSprings(3, [
    {
      ref: border,
      from: {
        width: "100%",
        height: "0%",
      },
    },
    {
      ref: content,
      from: {
        opacity: 0,
      },
    },
  ]);

  const beginAnimation = () => {
    border.start({
      to: [
        {
          width: "100%",
          height: "100%",
        },
      ],
    });
    content.start({
      to: {
        opacity: 1,
      },
      delay: 200,
    });
  };

  const closeAboutPage = () => {
    dispatch(setPage("home"));
  };
  useEffect(() => {
    beginAnimation();
  });
  return (
    <Html fullscreen>
      <div className='about-section' onClick={closeAboutPage}>
        <div className='about-section__wrapper'>
          <a.div style={{ overflow: "hidden", ...spring[1] }}>
            <div className='about-section__content' style={{ backgroundImage: `url('${paper}')` }}>
              <a.div style={{ ...spring[2] }} className='about-section__text-wrapper'>
                <p>
                  蕭力綺，畢業於柏林藝術大學，是一位來自台灣的新媒體藝術家，常駐於柏林與台北。她的藝術創作跨足多個媒介，包括聲音藝術、裝置
                  藝術，以及現場表演等。透過多元的媒材，他將探索科技之於人與群體相互交錯的生態系。
                </p>
                <p>
                  Li-Chi Hsiao, graduated from Berlin University of Art, is a Taiwanese new media artist whose oeuvre
                  encompasses an array of mediums such as audio-visual, installations, and live performances. Her works
                  talk about her personal connection with the internet and societal dynamics, reflecting a profound
                  engagement with the symbiosis of technology and the individual, inviting audiences to contemplate the
                  convergence of personal narratives within the digital landscape and the broader societal framework.
                </p>
                <p className='about-section__cv'>
                  <b>Performances</b> <br />
                  <div className='about-section__form'>
                    <div>2024</div>
                    <div> Resonance of the Virtual, Future Vision Lab, Taipei</div>
                    <div>2024</div>
                    <div> 克里奧化身體 Live Performance (Sound/Installation), Xinzhu </div>
                    <div>2018</div>
                    <div> Xero Xerco, Taipei </div>
                    <div>2017</div>
                    <div> Emitter Micro, Ausland, Berlin </div>
                    <div>2016</div>
                    <div> 0ff2n0ff, Tresor Linz, Linz </div>
                    <div>2015</div>
                    <div> Chaning, Ausland, Berlin </div>
                    <div>2014</div>
                    <div> Lacking sound Festival Listen 68 , Taipei </div>
                    <div>2013</div>
                    <div> Linux Audio Conference, Graz, Austria</div>
                    <div>2013</div>
                    <div> Kangding Ray Live In Taipei After Party, Korner, Taipei </div>
                    <br />
                  </div>
                </p>
                <p className='about-section__cv'>
                  <b>Exhibitions</b> <br />
                  <div className='about-section__form'>
                    <div>2024</div>
                    <div> Artist as a Giver, 101 Gallery, Taipei </div>
                    <div>2021</div>
                    <div> Winner of EXP__:BerlinxLosAngeles Audio-visual Collaboration </div>
                    <div>2020</div>
                    <div> re:Campus, Berlin, Germany </div>
                    <div>2020</div>
                    <div> STRANGE THINGS, Berlin, Germany </div>
                    <div>2019</div>
                    <div> Asia Now, Asian Art Fair, Paris, France </div>
                    <div>2019</div>
                    <div> Beyond Gender, Factory Berlin, Germany </div>
                    <div>2019</div>
                    <div> PANORAMA Shenzhen New Media Art Festival, Cultural Center Gallery, Shenzhen </div>
                    <div>2018</div>
                    <div> Cosmoprof Asia (for cosmetic brand VesCir), Hong Kong </div>
                    <div>2017</div>
                    <div> Diaspora, Asia contemporary art platform NON Berlin </div>
                    <div>2014</div>
                    <div> The 12th Taoyuan Creation Award </div>
                    <div>2013</div>
                    <div> Digital Art Festival Taipei </div>
                  </div>
                </p>
              </a.div>
              <br />
            </div>
          </a.div>
        </div>
      </div>
    </Html>
  );
}

export default AboutSection;
