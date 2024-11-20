import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { ReviewData } from '../../API/apiCRUD';

interface ReviewModalProps {
    show: boolean;
    handleClose: () => void;
    onCreate?: (reviewData: ReviewData) => void;
    onUpdate?: (reviewData: ReviewData) => void;
    isEditMode: boolean;
    existingReviewData?: ReviewData;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
    show,
    handleClose,
    onCreate,
    onUpdate,
    isEditMode,
    existingReviewData
}) => {
    const [reviewData, setReviewData] = useState<ReviewData>({
        reviewId: 0,
        userId: 0,
        userName: '',
        productId: 0,
        reviewComment: '',
        reviewStar: 0
    });

    useEffect(() => {
        if (isEditMode && existingReviewData) {
            setReviewData(existingReviewData);
        }
    }, [isEditMode, existingReviewData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setReviewData({ ...reviewData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (isEditMode && onUpdate) {
                console.log('Updating category with data:', reviewData);
                onUpdate(reviewData);
            } else if (onCreate) {
                console.log('Creating category with data:', reviewData);
                onCreate(reviewData);
            }
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditMode ? 'Update Review' : 'Create Review'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formReviewComment">
                        <Form.Label>Review Comment</Form.Label>
                        <Form.Select
                            name="reviewComment"
                            value={reviewData.reviewComment}
                            onChange={(e) => setReviewData({ ...reviewData, reviewComment: e.target.value })}
                            required
                        >
                            <option value={reviewData.reviewComment}>{reviewData.reviewComment}</option>
                            <option value="/* This comment has been removed */">Ẩn Bình Luận</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="formReviewStar">
                        <Form.Label>Review Star (from 0 to 5)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter review star"
                            name="reviewStar"
                            value={reviewData.reviewStar}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className='CRUDBtn'>
                        {isEditMode ? (
                            <>
                                Update Review
                                <FontAwesomeIcon icon={faPen} className='iconPen' />
                            </>
                        ) : (
                            <>
                                Create Review
                                <FontAwesomeIcon icon={faPlus} className='iconPlus' />
                            </>
                        )}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewModal;
