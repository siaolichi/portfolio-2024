import "./WorkCarousel.scss";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/pages";

import content from "../../content/works";
import WorkCard from "./WorkCard";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import WorkDetail from "./WorkDetail";

function WorkCarousel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.pages.currentPage);
  const [showDetail, setShowDetail] = useState(undefined);

  const closeWorksPage = (e) => {
    e.stopPropagation(e);
    if (showDetail) return;
    if (e.target.type === "button") return;
    if (e.target.className === "works-carousel") dispatch(setPage("home"));
  };

  const onOpenDetail = (e, content) => {
    if (currentPage !== "works") return;
    e.stopPropagation();
    if (content.id === "202401") return navigate("/works/corner-whispers");
    setShowDetail(content);
  };

  const onCloseButton = (e) => {
    e.stopPropagation();
    if (showDetail) setShowDetail(undefined);
    else dispatch(setPage("home"));
  };
  const onCloseDatail = (e) => {
    e.stopPropagation();
    if (e.target.className === "work-content") setShowDetail(undefined);
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div className='works-carousel' onClick={closeWorksPage}>
      <div className='works-carousel__detail-close-button' onClick={onCloseButton}>
        ✖
      </div>
      <Carousel
        swipeable={true}
        draggable={false}
        showDots={false}
        responsive={responsive}
        infinite={true}
        arrows={!showDetail}
        transitionDuration={500}
        containerClass='carousel-container'
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={deviceType}
        itemClass='carousel-item'
      >
        {content.map((item) => (
          <div className='works-carousel__card'>
            <WorkCard content={item} key={item.id} onOpenDetail={onOpenDetail} />
          </div>
        ))}
      </Carousel>
      {showDetail && (
        <div className='works-carousel__detail-wrapper' onClick={onCloseDatail}>
          <WorkDetail work={showDetail} />
        </div>
      )}
    </div>
  );
}

export default WorkCarousel;
