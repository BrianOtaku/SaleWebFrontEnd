import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

interface UpdateReviewModalProps {
    show: boolean;
    onClose: () => void;
    onSubmit: () => void;
    updateComment: string;
    setUpdateComment: (comment: string) => void;
    updateRating: number;
    setUpdateRating: (rating: number) => void;
}

const UpdateReviewModal: React.FC<UpdateReviewModalProps> = ({
    show,
    onClose,
    onSubmit,
    updateComment,
    setUpdateComment,
    updateRating,
    setUpdateRating,
}) => {
    const renderStars = (rating: number, onClick: (rating: number) => void) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={i <= rating ? solidStar : regularStar}
                    style={{ color: '#FFD700', marginRight: '5px', cursor: 'pointer' }}
                    onClick={() => onClick(i)}
                />
            );
        }
        return stars;
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Group controlId="updateRating" style={{ marginTop: '10px' }}>
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: 'xx-large',
                            padding: '10px'
                        }}
                    >
                        {renderStars(updateRating, setUpdateRating)}
                    </div>
                </Form.Group>

                <Form.Group controlId="updateComment">
                    <h5>Comment</h5>
                    <Form.Control
                        as="textarea"
                        placeholder="Enter Comment"
                        style={{
                            minHeight: '100px',
                            resize: 'none',
                            overflowY: 'auto',
                        }}
                        value={updateComment}
                        onChange={(e) => setUpdateComment(e.target.value)}
                    />
                </Form.Group>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateReviewModal;
