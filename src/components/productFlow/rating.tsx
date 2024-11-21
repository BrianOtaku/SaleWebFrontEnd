import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { getReviewByProductId } from '../../API/apiGetInfomations';

interface Review {
    reviewId: number;
    productId: number;
    userId: number;
    reviewComment: string;
    reviewStar: number;
}

interface RatingComponentProps {
    calculateAverageRating: () => number;
    reviews: Review[];
    renderStars: (stars: number, setStars?: (value: number) => void) => JSX.Element;
    rating: number;
    setRating: (value: number) => void;
    comment: string;
    setComment: (value: string) => void;
    handleReviewSubmit: () => void;
    isSubmitting: boolean;
    userId: string;
    handleUpdateReview: (review: Review) => void;
    handleDeleteReview: (reviewId: number) => void;
    productId: number;
}

const RatingComponent: React.FC<RatingComponentProps> = ({
    calculateAverageRating,
    reviews,
    renderStars,
    rating,
    setRating,
    comment,
    setComment,
    handleReviewSubmit,
    isSubmitting,
    userId,
    handleUpdateReview,
    handleDeleteReview,
    productId,
}) => {
    const [productReviews, setProductReviews] = useState<Review[]>([]);
    const userIdLocal = localStorage.getItem('userId') || '';

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const reviewsData: Review[] = await getReviewByProductId(productId);
                console.log('Fetched reviews data:', reviewsData);

                const validReviews = reviewsData.filter((review: Review) => review.userId && review.productId);
                setProductReviews(validReviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [productId]);

    const userReviews = productReviews.filter(review => review.userId === Number(userIdLocal));

    return (
        <div className="rating">
            <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                ĐÁNH GIÁ TRUNG BÌNH
            </h3>
            <div className="avrg-container">
                <div className="avrg-rating">{calculateAverageRating().toFixed(1)}</div>
                <h2 style={{ display: 'flex', marginTop: 'auto' }}>/5</h2>
            </div>
            {userIdLocal ? (
                <>
                    {userReviews.length > 0 ? (
                        <>
                            {userReviews.map((review) => (
                                <div key={review.userId} className="review-card" style={{ listStyle: 'none' }}>
                                    <h3
                                        style={{
                                            fontSize: '18px',
                                            marginBottom: '10px',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}
                                    >
                                        ĐÁNH GIÁ CỦA BẠN
                                    </h3>
                                    <li className='stars'>
                                        {renderStars(review.reviewStar)}
                                    </li>
                                    <li>
                                        <strong>Bình luận:</strong>
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
                                    <div className="review-button">
                                        {review.userId === Number(userId) && (
                                            <>
                                                <Button
                                                    variant="outline-dark"
                                                    onClick={() => handleUpdateReview(review)}
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Button>
                                                <Button
                                                    variant="outline-dark"
                                                    onClick={() => handleDeleteReview(review.reviewId)}
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="review-card">
                            <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                                ĐÁNH GIÁ CỦA BẠN
                            </h3>
                            <div className="stars">{renderStars(rating, setRating)}</div>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                placeholder="Enter your comment"
                                style={{
                                    width: '100%',
                                    marginBottom: '10px',
                                    resize: 'none',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid rgb(213,213,213)'
                                }}
                            />
                            <button className='submit-review'
                                onClick={handleReviewSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <div className="review-card">
                    <h3 style={{ fontSize: '18px', marginBottom: '0px', fontWeight: 'bold', textAlign: 'center' }}>
                        Bạn cần đăng nhập để đánh giá Sản Phẩm!
                    </h3>
                </div>
            )}
        </div>
    );
};

export default RatingComponent;
