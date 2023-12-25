import { useState, useRef, FormEvent } from 'react';
import { ChangeEvent } from 'react';
import { Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { sentReview } from '../store/api-actions';

type ReviewsFormProps = {
  id: string | undefined;
};
const ratingStarsTitles = ['awfully', 'so bad', 'normally', 'good', 'perfect'];

function ReviewsForm({ id }: ReviewsFormProps) {
  const sentReviewStatus = useAppSelector((state) => state.sentReviewStatus);
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);
  const ratingErrorRef = useRef<HTMLHeadingElement | null>(null);
  const reviewTextAmountRef = useRef<HTMLBaseElement | null>(null);

  const [rating, setRating] = useState(0);
  const [, setCommentText] = useState('');

  const onRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.target.value));
  };

  const onCommentInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(evt.target.value);
    if (evt.target.value.length > 49 && reviewTextAmountRef.current) {
      reviewTextAmountRef.current.style.color = '#4481c3';
      reviewTextAmountRef.current.textContent = '50 characters';
    }
  };

  const showInputError = () => {
    if (
      commentInputRef.current?.value.length &&
      commentInputRef.current.value.length < 50 &&
      reviewTextAmountRef.current
    ) {
      reviewTextAmountRef.current.style.color = 'red';
      reviewTextAmountRef.current.textContent = '! 50 ! characters';
    } else if (reviewTextAmountRef.current) {
      reviewTextAmountRef.current.style.color = '#4481c3';
      reviewTextAmountRef.current.textContent = '50 characters';
    }
  };

  const dispatch = useAppDispatch();

  const clearForm = (): void => {
    if (commentInputRef.current) {
      commentInputRef.current.value = '';
      setRating(0);
    }
  };

  const getReviewFormData = (
    evt: FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    evt.preventDefault();

    if (
      commentInputRef.current?.value.length &&
      commentInputRef.current.value.length > 49
    ) {
      dispatch(
        sentReview({
          offerId: id,
          rating: rating,
          comment: commentInputRef.current?.value,
          clearForm: clearForm,
        })
      );
    }
  };
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={getReviewFormData}
    >
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
              checked={rating === i}
            />
            <label
              htmlFor={`${i}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingStarsTitles[i - 1]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use href="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      {sentReviewStatus === 'error' && rating === 0 && (
        <>
          <h3
            style={{ color: '#4481c3', fontSize: '22px' }}
            ref={ratingErrorRef}
          >
            select a rating from 1 to 5!
          </h3>
          {setTimeout(() => {
            if (ratingErrorRef.current) {
              ratingErrorRef.current.style.color = '#000000';
              ratingErrorRef.current.style.fontSize = 'inherit';
            }
          }, 1000)}
        </>
      )}

      <textarea
        ref={commentInputRef}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onCommentInput}
        onKeyDown={(evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
          if (evt.key === 'Enter') {
            evt.preventDefault();
            showInputError();
            getReviewFormData(evt);
          }
        }}
      />
      <div className="reviews__button-wrapper">
        <p
          className="reviews__help"
          style={{ fontSize: '15px', fontWeight: 'bold' }}
        >
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b
            className="reviews__text-amount"
            style={{ color: '#4481c3' }}
            ref={reviewTextAmountRef}
          >
            50 characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            !(
              commentInputRef.current?.value.length &&
              commentInputRef.current.value.length > 0
            )
          }
          onClick={showInputError}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
