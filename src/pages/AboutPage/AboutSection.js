import { Html } from "@react-three/drei";
import "./AboutSection.scss";
import { useSprings, a, useSpringRef } from "@react-spring/web";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";

function AboutSection() {
  // const title = useSpringRef();
  const border = useSpringRef();
  const content = useSpringRef();
  const dispatch = useDispatch();

  const spring = useSprings(3, [
    // {
    //   ref: title,
    //   from: {
    //     color: "transparent",
    //     textShadow: "0px 0px 0px transparent",
    //   },
    // },
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

    // title.start({
    //   to: {
    //     color: "#11dbab",
    //     textShadow: "0px 0px 4px #11dbab",
    //   },
    //   config: {
    //     duration: 500,
    //   },
    //   delay: 300,
    // });
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
          {/* <a.h2
            className='about-section__title about-section__glowtext about-section__flicker-lite'
            style={{ ...spring[0] }}
          >
            ABOUT ME
          </a.h2> */}
          <a.div style={{ overflow: "hidden", ...spring[1] }}>
            <div className='about-section__box about-section__flicker-lite about-section__glowbox'>
              <div className='about-section__form'>
                <a.p style={{ ...spring[2] }}>
                  Hsiao Li-Chi,
                  <br />
                  Frontend developer / Digital Artist
                  <br />
                  based in Berlin and Taipei.
                  <br />
                  蕭力綺
                  <br />
                  前端工程師 / 數位藝術家
                  <br />
                  定居於柏林與台北
                  <br />
                </a.p>
              </div>
            </div>
          </a.div>
        </div>
      </div>
    </Html>
  );
}

export default AboutSection;
