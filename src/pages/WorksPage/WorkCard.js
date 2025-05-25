import "./WorkCard.scss";

function WordCard({ content, onOpenDetail }) {
  return (
    <div className='work-card'>
      <h1 className='work-card__title'>{content.title}</h1>
      <p className='work-card__year'>{content.year}</p>
      <div
        className='work-card__image'
        onClick={(e) => onOpenDetail(e, content)}
        style={{
          backgroundImage: `url('/assets/images/${content.id}/${content.photos[0]}')`,
        }}
      ></div>
    </div>
  );
}

export default WordCard;
