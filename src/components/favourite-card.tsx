import { useAppDispatch } from '../store';
import { OfferModel } from '../types';
import { changeStatusFavoriteOffers } from '../store/api-actions';
import { Link } from 'react-router-dom';
import { AppRoute } from './consts';

type FavouriteCardProps = {
  card: OfferModel;
};

function FavouriteCard(props: FavouriteCardProps) {
  const dispatch = useAppDispatch();

  const { previewImage, title, isPremium, isFavorite, type, price, id, rating } =
    props.card;

  return (
    isFavorite && (
      <article className="favorites__card place-card">
        {isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="favorites__image-wrapper place-card__image-wrapper">
          <Link to={`${AppRoute.Offer}${id}`}>
            <img
              className="place-card__image"
              src={previewImage}
              width="150"
              height="110"
              alt="Place image"
            />
          </Link>
        </div>
        <div className="favorites__card-info place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{`€${price}`}</b>
              <span className="place-card__price-text">/night</span>
            </div>
            <button
              onClick={() => {
                dispatch(
                  changeStatusFavoriteOffers({ offerId: id, isFavorite })
                );
              }}
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
              <span
                style={{
                  width: `${rating ? rating * 20 : 80}%`,
                }}
              />
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
          </h2>
          <p className="place-card__type">{type}</p>
        </div>
      </article>
    )
  );
}

export default FavouriteCard;
