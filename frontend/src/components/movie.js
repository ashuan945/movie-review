import React, { useState, useEffect } from 'react'
import MovieDataService from '../services/movies'
import { Link, useParams } from 'react-router-dom'

// Display movie
import { Card, Container, Image, Col, Row, Button, ListGroup } from 'react-bootstrap'
import defaultPoster from "../assets/default-poster.png"
// date formatting
import moment from 'moment'

const Movie = props => {

    const { id } = useParams()  // Get movie ID from the URL

    // movie state variable hold the specific movie
    const [movie, setMovie] = useState({
        _id: null,
        title: "",
        rated: "",
        reviews: []
    })
    // Fetch the movie data from backend using MovieDataService
    const getMovie = id => {
        MovieDataService.get(id)
            .then(response => {
                setMovie(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    // useEffect runs on component mount and whenever the movie id changes
    useEffect(() => {
        getMovie(id)
    }, [id])

    // Function to delete a review
    const deleteReview = (reviewId, index) => {
        MovieDataService.deleteReview(reviewId, props.user.email)
            .then(() => {
                // Remove the review from local state without refreshing page
                setMovie(prev => {
                    const newReviews = [...prev.reviews] // clone current reviews
                    newReviews.splice(index, 1)  // remove the deleted review
                    return { ...prev, reviews: newReviews } // update state
                })
            })
            .catch(e => {
                console.log(e)
            })
    }


    return (
        <div>
            <Container className="my-4">
                {/* Row for poster and movie details */}
                <Row className="mb-4">
                    {/* Movie Poster */}
                    <Col md={4} className="text-center mb-3">
                        <Image
                            src={movie.poster ? movie.poster + "/200px300" : defaultPoster}
                            rounded
                            fluid
                            onError={e => e.target.src = defaultPoster}
                        />
                    </Col>

                    {/* Movie Details */}
                    <Col md={8}>
                        <Card className="shadow-sm rounded">
                            <Card.Header as="h3">{movie.title}</Card.Header>
                            <Card.Body>
                                <Card.Text><strong>Rating:</strong> {movie.rated ? movie.rated : "N/A"} </Card.Text>
                                <Card.Text>{movie.plot}</Card.Text>

                                {/* If user is logged in, show Add Review button */}
                                {props.user && (
                                    <Link to={`/movies/id/${id}/review`} className="btn btn-primary">
                                        Add Review
                                    </Link>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <h2 className="mb-3">Reviews</h2>

                {/* Reviews List */}
                <ListGroup>
                    {/* Show message if no reviews */}
                    {movie.reviews.length === 0 && (
                        <ListGroup.Item>No reviews yet.</ListGroup.Item>
                    )}

                    {/* Map through each review */}
                    {[...movie.reviews]
                        .sort((a, b) => {
                            // put current user's review first
                            if (props.user && a.email === props.user.email) return -1;
                            if (props.user && b.email === props.user.email) return 1;
                            return 0; // keep others in the same order
                        })
                        .map((review, index) => (
                            <ListGroup.Item key={index} className="mb-2 shadow-sm rounded">

                                {/* Review content */}
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                    <strong>{review.name}</strong>
                                    <small className="text-muted">{moment(review.date).format("DD/MM/YYYY")}</small>
                                </div>

                                <p>{review.text}</p>

                                 {/* Edit/Delete buttons for review owner */}
                                {props.user && props.user.email === review.email && (
                                    <div className="d-flex gap-2">
                                        {/* Edit buttons if review belongs to current user */}
                                        <Link
                                            to={`/movies/id/${id}/review`}
                                            state={{ currentReview: review }}
                                            className="btn btn-outline-secondary btn-sm">
                                            Edit
                                        </Link>

                                        {/* Delete button calls deleteReview */}
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => deleteReview(review._id, index)}>
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </Container>
        </div>
    )
}

export default Movie;