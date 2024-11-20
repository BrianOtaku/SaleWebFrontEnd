import React from 'react';

interface Review {
    reviewId: number;
    productId: number;
    userId: number;
    reviewComment: string;
    reviewStar: number;
    userName?: string;
}

interface ReviewListProps {
    reviews: Review[];
    userNames: Map<number, string>;
    renderStars: (rating: number) => JSX.Element;
    userId: string;
    handleUpdateReview: (review: Review) => void;
    handleDeleteReview: (reviewId: number) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
    reviews,
    userNames,
    renderStars,
    userId,
    handleUpdateReview,
    handleDeleteReview
}) => {
    return (
        <div>
            <h3
                style={{
                    fontSize: '18px',
                    marginBottom: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}
            >
                ĐÁNH GIÁ CỦA MỌI NGƯỜI
            </h3>
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <div key={review.reviewId} className="review-card">
                            <li>
                                <strong>User:</strong> {review.userName || userNames.get(review.userId) || 'Unknown User'}
                            </li>
                            <li>
                                <strong>Rating:</strong> {renderStars(review.reviewStar)}
                            </li>
                            <li>
                                <strong>Comment:</strong>
                                <p
                                    style={{
                                        border: '1px solid rgb(213, 213, 213)',
                                        borderRadius: '8px',
                                        height: 'auto',
                                        padding: '10px',
                                    }}
                                >
                                    {review.reviewComment}
                                </p>
                            </li>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>No reviews available for this product.</p>
            )}
        </div>
    );
};

export default ReviewList;
