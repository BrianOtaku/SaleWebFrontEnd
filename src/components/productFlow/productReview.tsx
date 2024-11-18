import React, { useEffect, useState } from 'react';
import { getReviewByProductId, getUserProfileById } from '../../API/apiGetInfomations';
import { createEntity, updateEntity, deleteEntity } from '../../API/apiCRUD';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan, faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import '../../styles/productReview.css';
import { Button } from 'react-bootstrap';

interface Review {
    reviewId: number;
    productId: number;
    userId: number;
    reviewComment: string;
    reviewStar: number;
}

const ProductReview: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [userNames, setUserNames] = useState<Map<number, string>>(new Map());

    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const userId = localStorage.getItem('userId');

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={i <= rating ? solidStar : regularStar}
                    style={{ color: '#FFD700', marginRight: '5px' }}
                    onClick={() => setRating(i)}
                />
            );
        }
        return stars;
    };

    useEffect(() => {
        const fetchReviews = async () => {
            const token = localStorage.getItem('token') || '';
            const fetchUserName = async (userId: number) => {
                if (!userNames.has(userId)) {
                    try {
                        const userProfile = await getUserProfileById(userId, token);
                        const newUserName = userProfile.userName;
                        setUserNames((prev) => new Map(prev).set(userId, newUserName));
                    } catch (err) {
                        console.error(`Failed to fetch userName for userId: ${userId}`, err);
                    }
                }
            };

            try {
                if (productId) {
                    const response = await getReviewByProductId(Number(productId), token);
                    const sortedReviews = response.sort((a: any, b: any) => b.reviewId - a.reviewId);
                    setReviews(sortedReviews);

                    const uniqueUserIds = Array.from(new Set(response.map((review: Review) => review.userId)));
                    uniqueUserIds.forEach((userId) => fetchUserName(Number(userId)));
                }
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };

        fetchReviews();
    }, [productId, userNames]);

    const handleReviewSubmit = async () => {

        if (rating === 0 && comment.trim() === '') {
            alert('Please provide both a rating and a comment!');
            return;
        }

        const newReview = {
            userId: userId,
            productId: Number(productId),
            reviewComment: comment,
            reviewStar: rating,
        };

        setIsSubmitting(true);

        try {
            const createdReview = await createEntity('reviews', newReview);

            setReviews((prevReviews) => {
                const updatedReviews = [createdReview, ...prevReviews];
                return updatedReviews.sort((a, b) => b.reviewId - a.reviewId);
            });

            setComment('');
            setRating(0);
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error submitting review:', error);
            setIsSubmitting(false);
            alert('Failed to submit review');
        }
    };

    const handleUpdateReview = async (reviewId: number) => {
        const updatedData = { reviewComment: 'Updated comment', reviewStar: 4 };
        try {
            const updatedReview = await updateEntity('reviews', reviewId, updatedData);
            setReviews((prev) =>
                prev.map((review) => (review.reviewId === reviewId ? updatedReview : review))
            );
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const handleDeleteReview = async (reviewId: number) => {
        try {
            await deleteEntity('reviews', reviewId);
            setReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div>
            <div className="review">
                <h3 style={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}>
                    ĐÁNH GIÁ SẢN PHẨM
                </h3>
                <div className="product-rating">
                    <div className="users-review">
                        <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                            ĐÁNH GIÁ CỦA MỌI NGƯỜI
                        </h3>
                        {reviews.length > 0 ? (
                            <ul>
                                {reviews.map((review) => (
                                    <div key={review.reviewId} className="review-card">
                                        <li>
                                            <strong>User:</strong>{' '}
                                            {userNames.get(review.userId) || 'Unknown_User'}
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
                                        <div className="review-button">
                                            {review.userId === Number(userId) && (
                                                <>
                                                    <Button
                                                        variant="outline-dark"
                                                        onClick={() => handleUpdateReview(review.reviewId)}
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
                            </ul>
                        ) : (
                            <p>No reviews available for this product.</p>
                        )}
                    </div>
                    <div className="rating">
                        <h3 style={{ fontSize: '18px', marginBottom: '10px', fontWeight: 'bold', textAlign: 'center' }}>
                            ĐÁNH GIÁ CỦA BẠN
                        </h3>
                        <div className="stars">{renderStars(rating)}</div>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            placeholder="Enter your comment"
                            style={{ width: '100%', marginBottom: '10px' }}
                        />
                        <button onClick={handleReviewSubmit} disabled={isSubmitting} style={{ width: '100%' }}>
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
