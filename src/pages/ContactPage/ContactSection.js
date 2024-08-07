import { Html } from "@react-three/drei";
import "./ContactSection.scss";

import { useSprings, a, useSpringRef } from "@react-spring/web";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPage } from "../../features/pages";

function ContactSection() {
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
      <div className='contact-section' onClick={closeAboutPage}>
        <div className='contact-section__wrapper'>
          <a.div style={{ overflow: "hidden", ...spring[1] }}>
            <div className='contact-section__box contact-section__flicker-lite contact-section__glowbox'>
              <div className='contact-section__form'>
                <a.p style={{ ...spring[2] }}>
                  <a href='https://www.instagram.com/hsiao.li.chi/'>Instagram: hsiao.li.chi</a> <br />
                  <div>
                    E-mail:
                    &#115;&#105;&#097;&#111;&#046;&#108;&#105;&#099;&#104;&#105;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;
                  </div>
                </a.p>
              </div>
            </div>
          </a.div>
        </div>
      </div>
    </Html>
  );
}

export default ContactSection;
