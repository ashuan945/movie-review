import React, {useState} from 'react'
import MovieDataService from '../services/movies'
import {Link, useLocation, useParams} from 'react-router-dom'
import { Form, Button, Container, Card, Alert } from 'react-bootstrap'

const AddReview = props => {
    const { id } = useParams()  // get movie ID from URL
    const location = useLocation();  // Access state passed from previous page

    // Check if editing an existing review
    let editing = false
    let initialReviewState = ""
    if(location.state && location.state.currentReview){
        editing = true
        initialReviewState = location.state.currentReview.text
    }

    // State to hold review text
    const [review, setReview] = useState(initialReviewState)
    // State to track if the review has been submitted
    const [submitted, setSubmitted] = useState(false)

    // Handler to update state when user types
    const onChangeReview = e => {
        const review = e.target.value
        setReview(review);
    }

    // Function to save the review (create or update)
    const saveReview = () => {
        // Build review data object
        var data = {
            text: review,
            name: props.user.name,
            email: props.user.email,
            movie_id: id  // get movie id direct from url
        }

        // Edit review
        if(editing){
            // get existing review id
            data._id = location.state.currentReview._id
            MovieDataService.updateReview(data)
            .then(response => {
                setSubmitted(true);
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            })
        }
        // // Creating new review
        else{
            MovieDataService.createReview(data)
            .then(response => {
                setSubmitted(true)
            })
            .catch(e => {
                console.log(e);
            })
        }

        
    }


    return(
        <Container className="my-5">
            {/* Display success message after submission */}
            {submitted ? (
                <Card className="text-center shadow-sm p-4">
                    <h4 className="text-success mb-3">Review submitted successfully!</h4>
                    <Link to={"/movies/id/" + id} className="btn btn-primary">
                        Back to Movie
                    </Link>
                </Card>
            ) : (
                // Review form
                <Card className="shadow-sm p-4">
                    <h4 className="mb-3">{editing ? "Edit" : "Create"} Review</h4>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Your Review</Form.Label>
                            <Form.Control
                                as="textarea" // make input larger for multiple lines
                                rows={5} // 5 lines height
                                placeholder="Write your review here..."
                                required
                                value={review}
                                onChange={onChangeReview}
                            />
                        </Form.Group>

                        {/* Submit Button */}
                        <Button variant="primary" onClick={saveReview}>
                            {editing ? "Update Review" : "Submit Review"}
                        </Button>
                    </Form>
                </Card>
            )}
        </Container>
    )
}

export default AddReview;