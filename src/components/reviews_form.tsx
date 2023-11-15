import { useState } from 'react';
import { ChangeEvent } from 'react';
import { Fragment } from 'react';

const a = 2;

function ReviewsForm() {
  const [, setRating] = useState(0);
  const [, setCommentText] = useState('');

  const onRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const onCommentInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(evt.target.value);
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((i) => (
          <Fragment key={i}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={i}
              id={`${i}-stars`}
              type="radio"
              onChange={onRatingChange}
            />
            <label
              htmlFor={`${i}-stars`}
              className="reviews__rating-label form__rating-label"
              title="perfect"
            >
              <svg className="form__star-image" width="37" height="33">
                <use href="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onCommentInput}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
