import React, { useEffect, useState } from 'react';
import { getReviewByProductId } from '../../API/apiGetInfomations';
import { createEntity, updateEntity, deleteEntity } from '../../API/apiCRUD';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import '../../styles/productReview.css';
import UpdateReviewModal from './updateReviewModal';
import RatingComponent from './rating';
import ReviewList from './reviewList';

interface Review {
    reviewId: number;
    productId: number;
    userId: number;
    reviewComment: string;
    reviewStar: number;
    userName?: string;
}

const ProductReview: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [userNames, setUserNames] = useState<Map<number, string>>(new Map());
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [currentReview, setCurrentReview] = useState<Review | null>(null);
    const [updateComment, setUpdateComment] = useState<string>('');
    const [updateRating, setUpdateRating] = useState<number>(0);

    const userId = Number(localStorage.getItem('userId') || '0');

    const renderStars = (rating: number, onClick?: (rating: number) => void) => {
        return (
            <>
                {Array.from({ length: 5 }, (_, i) => (
                    <FontAwesomeIcon
                        key={i + 1}
                        icon={i + 1 <= rating ? solidStar : regularStar}
                        style={{ color: '#FFD700', marginRight: '5px', cursor: onClick ? 'pointer' : 'default' }}
                        onClick={() => onClick && onClick(i + 1)}
                    />
                ))}
            </>
        );
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (productId) {
                    const response = await getReviewByProductId(Number(productId));
                    const sortedReviews = response.sort((a: Review, b: Review) => b.reviewId - a.reviewId);
                    setReviews(sortedReviews);
                }
            } catch (err) {
                console.error('Error fetching reviews:', err);
            }
        };

        fetchReviews();
    }, [productId]);

    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        let totalRating = 0;
        reviews.forEach((review) => {
            totalRating += review.reviewStar;
        });
        return totalRating / reviews.length;
    };

    const handleReviewSubmit = async () => {
        if (rating === 0 || comment.trim() === '') {
            alert('Please provide both a rating and a comment!');
            return;
        }

        const userName = localStorage.getItem('userName') || 'Unknown_User';

        const newReview = {
            userId: userId,
            productId: Number(productId),
            reviewComment: comment,
            reviewStar: rating,
            userName: userName,
        };

        setIsSubmitting(true);

        try {
            const createdReview = await createEntity('reviews', newReview);

            setUserNames((prevUserNames) => {
                const updatedUserNames = new Map(prevUserNames);
                updatedUserNames.set(createdReview.userId, createdReview.userName || 'Unknown_User');
                return updatedUserNames;
            });

            setReviews((prevReviews) => {
                const updatedReviews = [createdReview, ...prevReviews];
                return updatedReviews.sort((a, b) => b.reviewId - a.reviewId);
            });

            window.location.reload();

            setComment('');
            setRating(0);
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error submitting review:', error);
            setIsSubmitting(false);
            alert('Failed to submit review');
        }
    };

    const handleUpdateReview = (review: Review) => {
        setCurrentReview({
            ...review,
            userName: review.userName || 'Unknown_User',
        });
        setUpdateComment(review.reviewComment);
        setUpdateRating(review.reviewStar);
        setShowUpdateModal(true);
    };

    const handleUpdateSubmit = async () => {
        if (currentReview) {
            const updatedData = { reviewComment: updateComment, reviewStar: updateRating };
            try {
                const updatedReview = await updateEntity('reviews', currentReview.reviewId, updatedData);
                setReviews((prev) =>
                    prev.map((review) => (review.reviewId === currentReview.reviewId ? updatedReview : review))
                );
                window.location.reload();
                setShowUpdateModal(false);
            } catch (error) {
                console.error('Error updating review:', error);
            }
        }
    };

    const handleDeleteReview = async (reviewId: number) => {
        try {
            await deleteEntity('reviews', reviewId);
            setReviews((prev) => prev.filter((review) => review.reviewId !== reviewId));
            window.location.reload();
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
                        <ReviewList
                            reviews={reviews as Review[]}
                            userNames={userNames}
                            renderStars={renderStars}
                            userId={String(userId)}
                            handleUpdateReview={handleUpdateReview}
                            handleDeleteReview={handleDeleteReview}
                        />
                    </div>
                    <RatingComponent
                        productId={Number(productId)}
                        calculateAverageRating={calculateAverageRating}
                        reviews={reviews}
                        renderStars={renderStars}
                        rating={rating}
                        setRating={setRating}
                        comment={comment}
                        setComment={setComment}
                        handleReviewSubmit={handleReviewSubmit}
                        isSubmitting={isSubmitting}
                        userId={String(userId)}
                        handleUpdateReview={handleUpdateReview}
                        handleDeleteReview={handleDeleteReview}
                    />
                </div>
            </div>

            <UpdateReviewModal
                show={showUpdateModal}
                onClose={() => setShowUpdateModal(false)}
                onSubmit={handleUpdateSubmit}
                updateComment={updateComment}
                setUpdateComment={setUpdateComment}
                updateRating={updateRating}
                setUpdateRating={setUpdateRating}
            />
        </div>
    );
};

export default ProductReview;
