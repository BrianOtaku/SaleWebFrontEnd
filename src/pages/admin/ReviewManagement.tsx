import React, { useEffect, useState } from 'react';
import { getAllReviews } from '../../API/apiGetInfomations';
import { useSelect } from '../hooks/useSelect';
import CRUD from '../hooks/useCRUD';
import { ReviewData } from '../../API/apiCRUD';

interface Review {
    reviewId: number,
    userId: number,
    userName: string,
    productId: number,
    reviewComment: string,
    reviewStar: number
}

function ReviewManagement() {
    const [reviews, setReviews] = useState<Review[]>([]);

    const { selectedItems, selectAll, handleSelectItem, handleSelectAll } = useSelect(
        reviews.map(review => review.reviewId)
    );

    useEffect(() => {
        const fetchReviews = async () => {
            const token = localStorage.getItem('token')
            try {
                const reviewsData = await getAllReviews(String(token));
                console.log(reviewsData);
                setReviews(reviewsData);
            } catch (error) {
                console.error('Error fetching category:', error);
            }

        };

        fetchReviews();
    }, []);

    const handleCreate = async (reviewsData: ReviewData) => {
        try {
            setReviews([...reviews, reviewsData]);
            window.location.reload();
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    const handleUpdate = async (updatedData: ReviewData) => {
        window.location.reload();
        setReviews(reviews.map(review => review.reviewId === updatedData.reviewId ? updatedData : review));
    };

    const handleDelete = async () => {
        if (selectedItems.length > 0) {
            try {
                window.location.reload();
                setReviews(reviews.filter(review => !selectedItems.includes(review.reviewId)));
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        } else {
            console.warn('No users selected for deletion.');
        }
    };

    return (
        <div>
            <h2>Reviews Management</h2>
            <CRUD
                pageType="reviews"
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                selectedItems={selectedItems}
                selectedReviewData={
                    selectedItems.length === 1
                        ? reviews.find(review => review.reviewId === selectedItems[0])
                        : undefined
                }
                reviews={reviews}
            />
            <table>
                <thead>
                    <tr>
                        <th>Review ID</th>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>Product ID</th>
                        <th>Review Comment</th>
                        <th>Review Star</th>
                        <th className='checkBox'>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.reviewId}>
                            <td>{review.reviewId}</td>
                            <td>{review.userId}</td>
                            <td>{review.userName}</td>
                            <td>{review.productId}</td>
                            <td>{review.reviewComment}</td>
                            <td>{review.reviewStar}</td>
                            <td className='checkBox'>
                                <input
                                    type="checkbox"
                                    checked={selectedItems.includes(review.reviewId)}
                                    onChange={() => handleSelectItem(review.reviewId)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReviewManagement;
