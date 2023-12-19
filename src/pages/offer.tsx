import { Helmet } from 'react-helmet-async';
import MainHeader from '../components/main-header';
import { useParams } from 'react-router-dom';
import ReviewsForm from '../components/reviews_form';
import { useAppDispatch, useAppSelector } from '../store';
import { useEffect } from 'react';
import {
  changeStatusFavoriteOffers,
  fetchOfferDetailedAction,
  fetchOffersNearby,
  fetchReview,
} from '../store/api-actions';
import {
  checkIsFavoriteOffer,
  renderDependingFetchStatus,
} from '../utils/utils';
import NotConnectionPage from '../components/loading-error/loading-error';
import Spinner from '../components/spinner/spinner';
import CardListNearby from '../components/cities-nearby';
import ReviewsList from '../components/reviews-list';
import { AuthenticationStatus } from '../components/consts';

function Offer() {
  const dispatch = useAppDispatch();

  const params = useParams();
  const current = params.id;

  const offer = useAppSelector((state) => state.offer);

  const authStatus = useAppSelector((state) => state.authStatus);

  const fetchStatus = useAppSelector((state) => state.fetchDetailedOfferStatus);

  const {
    id,
    title,
    description,
    isPremium,
    type,
    rating,
    bedrooms,
    maxAdults,
    price,
    images,
    host,
    goods,
    reviews,
  } = offer || {};

  const isFavorite = useAppSelector(checkIsFavoriteOffer(id));

  useEffect(() => {
    if (current) {
      dispatch(fetchOfferDetailedAction(current));
    }
    if (id) {
      dispatch(fetchOffersNearby(id));
      dispatch(fetchReview(id));
    }
  }, [id, current]);

  return (
    <div className="page">
      <Helmet>
        <title>{'6 cities - Offer'}</title>
      </Helmet>
      <MainHeader />

      {renderDependingFetchStatus(
        fetchStatus,
        <Spinner />,
        <NotConnectionPage />,
        <main className="page__main page__main--offer">
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images?.map((image: string) => (
                  <div className="offer__image-wrapper" key={image}>
                    <img
                      className="offer__image"
                      src={image}
                      alt="Photo studio"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium && (
                  <div className="offer__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">{title}</h1>
                  <button
                    onClick={() =>
                      dispatch(
                        changeStatusFavoriteOffers({ isFavorite, offerId: id })
                      )
                    }
                    className={`offer__bookmark-button ${
                      isFavorite && 'offer__bookmark-button--active'
                    } button ${
                      authStatus !== AuthenticationStatus.auth
                        ? 'visually-hidden'
                        : ''
                    }`}
                    type="button"
                  >
                    <svg
                      className="offer__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use href="#icon-bookmark" />
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span
                      style={{
                        width: `${rating ? rating * 20 : 80}%`,
                      }}
                    />
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">
                    {rating}
                  </span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {type}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {`${bedrooms} Bedrooms`}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    {`Max ${maxAdults} adults`}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">{`€${price}`}</b>
                  <span className="offer__price-text">night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What`&aposs inside</h2>
                  <ul className="offer__inside-list">
                    {goods?.map((good) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img
                        className="offer__avatar user__avatar"
                        src={`${host?.avatarUrl}`}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="offer__user-name">{host?.name}</span>
                    <span className="offer__user-status">{host?.isPro}</span>
                  </div>
                  <div className="offer__description">
                    <p className="offer__text">{description}</p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">
                    Reviews · <span className="reviews__amount">{reviews}</span>
                  </h2>
                  {<ReviewsList />}
                  {<ReviewsForm />}
                </section>
              </div>
            </div>
            <section className="offer__map map" />
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                <CardListNearby />
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default Offer;
