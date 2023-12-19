import { useAppSelector } from '../store';
import { ReviewModel } from '../types';

const month = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

function ReviewsList() {
  const reviews: ReviewModel[] = useAppSelector((state) => state.reviews);

  const formattedReviews = reviews.map((item) => ({
    ...item,
    date: {
      month: (new Date(item.date).getMonth() + 1).toLocaleString(),
      year: new Date(item.date).getFullYear(),
    },
  }));

  if (formattedReviews.length > 0) {
    console.log(formattedReviews[0].date);
  }

  return (
    <ul className="reviews__list">
      {formattedReviews.map((review) => (
        <li className="reviews__item" key={review.id}>
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img
                className="reviews__avatar user__avatar"
                src={review.user.avatarUrl}
                width="54"
                height="54"
                alt="Reviews avatar"
              />
            </div>
            <span className="reviews__user-name">{review.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{ width: `${review.rating * 20}%` }} />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">{review.comment}</p>
            <time className="reviews__time" dateTime={review.date}>
              {`${month[review.date.month]} ${review.date.year}`}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;
