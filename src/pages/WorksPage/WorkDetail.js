import "./WorkDetail.scss";

function WorkDetail({ work }) {
  return (
    <div className='work-content'>
      <h1 className='title'>{work.title}</h1>
      <div className='year'>{work.year}</div>
      {work.video && (
        <div className='video-container'>
          <iframe
            src={work.video}
            title={work.title}
            className='video-frame'
            frameBorder='0'
            allow='autoplay; fullscreen'
            allowFullScreen
          ></iframe>
        </div>
      )}
      {/* {work.photos.length > 1 && (
        <AwesomeSlider style={{ marginBottom: "80px" }} animation='foldOutAnimation' allowFullScreen>
          {work.photos.map((photo, index) => (
            <Fragment key={index}>
              <img
                src={require(`../assets/images/${work.id}/${photo}`)}
                alt={work.title}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
              />
            </Fragment>
          ))}
        </AwesomeSlider>
      )} */}

      <div className='description' dangerouslySetInnerHTML={{ __html: work.description }} />
    </div>
  );
}

export default WorkDetail;
