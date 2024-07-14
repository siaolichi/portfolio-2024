import { useEffect, useState } from "react";

function PerformanceCard({ item }) {
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => {
    if (item.year === "2024") setShowDetail(true);
  }, []);
  return (
    <div className='performance-page__card' key={item.title}>
      <div className='performance-page__top' onClick={() => setShowDetail(!showDetail)}>
        <div className='performance-page__title'>{item.title}</div>
        <div className='performance-page__year'>{item.year}</div>
      </div>
      <div className={`performance-page__content ${!showDetail ? "hide" : ""}`}>
        <div className='performance-page__content-inner'>
          <div className='performance-page__desc' dangerouslySetInnerHTML={{ __html: item.description }} />
          <div className='performance-page__video'>
            <iframe
              src={`https://www.youtube.com/embed/${item.video}?si=asPFhhMNIFT4ALky`}
              title='YouTube video player'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              referrerpolicy='strict-origin-when-cross-origin'
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceCard;
