import React from 'react';
import cl from './Product.module.css';

const ReviewItem = ({ review }) => {
  return (
    <div className={cl.reviewItem}>
      <div className={cl.userImage} style={{ backgroundImage: `url(${review.userImage})` }} />
      <div className={cl.reviewContent}>
        <div className={cl.reviewHeader}>
          <span>{review?.user?.name}</span>
          <span>{review.createdAt}</span>
        </div>
        <div className={cl.reviewText}>
          {'★'.repeat(review.stars)}
          {'☆'.repeat(5 - review.stars)}
        </div>
        <div>{review.text}</div>
      </div>
    </div>
  );
};

export default ReviewItem;
