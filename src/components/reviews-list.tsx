import { useAppSelector } from '../store';
import { ReviewModel, ReviewModelDate } from '../types';

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function ReviewsList() {
  const reviews: ReviewModel[] = useAppSelector((state) => state.reviews);

  const formattedReviews: ReviewModelDate[] = reviews.map((item) => ({
    ...item,
    date: {
      month: new Date(item.date).getUTCMonth(),
      year: new Date(item.date).getFullYear(),
      time: new Date(item.date).getTime(),
    },
  }));
  formattedReviews
    .sort((a, b) => a.date.year - b.date.year)
    .sort((a, b) => a.date.month - b.date.month)
    .sort((a, b) => a.date.time - b.date.time);

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
            <time
              className="reviews__time"
              dateTime={`${review.date.month}${review.date.year}`}
            >
              {`${month[review.date.month]} ${review.date.year}`}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;
