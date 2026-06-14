import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import { useCreateTourReviewMutation } from '../slices/bookingsApiSlice';
import { toast } from 'react-toastify';

const ReviewModal = ({ show, onHide, bookingId, tourName, onSuccess }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    const [createReview, { isLoading }] = useCreateTourReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            toast.error('Molimo izaberite ocenu.');
            return;
        }
        try {
            await createReview({ bookingId, rating, comment }).unwrap();
            toast.success('Hvala na recenziji!');
            setRating(0);
            setComment('');
            onSuccess();
            onHide();
        } catch (err) {
            toast.error(err?.data?.message || 'Greška pri slanju recenzije.');
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Ocenite izlet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className='mb-3'>{tourName}</h5>
                <Form onSubmit={submitHandler}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Vaša ocena</Form.Label>
                        <div className='review-stars'>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className='review-star'
                                    style={{
                                        color: star <= (hoverRating || rating) ? '#f6ad55' : '#e2e8f0',
                                    }}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <Form.Label>Komentar (opciono)</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Podelite svoj utisak...'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='primary'
                        className='w-100'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Slanje...' : 'Pošalji recenziju'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewModal;