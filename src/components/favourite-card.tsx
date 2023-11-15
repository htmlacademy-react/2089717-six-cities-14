import { OfferType } from '../types';

type FavouriteCardProps = {
  card: OfferType;
};

function FavouriteCard(props: FavouriteCardProps) {
  const {
    smalllImage,
    header,
    isPrime,
    isFavourite,
    housingType,
    costPerNight,
  } = props.card;
  return isFavourite && (
    <article className="favorites__card place-card">
      {isPrime && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={smalllImage}
            width="150"
            height="110"
            alt="Place image"
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">{`€${costPerNight}`}</b>
            <span className="place-card__price-text">/night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '100%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{header}</a>
        </h2>
        <p className="place-card__type">{housingType}</p>
      </div>
    </article>
  );
}

export default FavouriteCard;
