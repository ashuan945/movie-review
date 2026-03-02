import React, { useState, useEffect } from 'react'
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import defaultPoster from "../assets/default-poster.png";

// Form JSX Markup
import { Form, Button, Col, Row, Container, Card, InputGroup, Pagination, } from "react-bootstrap";

const MoviesList = (props) => {
    const [movies, setMovies] = useState([])
    const [searchTitle, setSearchTitle] = useState("")
    const [searchRating, setSearchRating] = useState("")
    const [ratings, setRatings] = useState(["All Ratings"])

    // pagination state
    const [currentPage, setCurrentPage] = useState(0)
    const [entriesPerPage, setEntriesPerPage] = useState(10) // default fallback
    const [totalResults, setTotalResults] = useState(0) // Total number of movies from backend
    const [currentSearchMode, setCurrentSearchMode] = useState("")

    // Reset page when search mode changes
    useEffect(() => {
        setCurrentPage(0) // reset page to 0 when search mode changes
    }, [currentSearchMode])

    // initial load
    useEffect(() => {
        retrieveMovies(0)
        retrieveRatings()
    }, [])

    // Fetch movies when page changes
    useEffect(() => {
        retrieveNextPage(currentPage)
    }, [currentPage])

    // function to retrieve next page based on current search mode
    const retrieveNextPage = (page) => {
        if (currentSearchMode === "findByTitle")
            findByTitle(page)
        else if (currentSearchMode === "findByRating")
            findByRating(page)
        else
            retrieveMovies(page)
    }

    // getAll returns a promise with movies retrieved & set it to movies state variable
    const retrieveMovies = (page = 0) => {
        setCurrentSearchMode("") // default search mode
        MovieDataService.getAll(page)
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)
                setEntriesPerPage(response.data.entries || 10) // fallback
                setTotalResults(response.data.total_results || response.data.movies.length || 0) // fallback
            })
            .catch(e => {
                console.log(e)
            })
    }

    const retrieveRatings = () => {
        MovieDataService.getRatings()
            .then(response => {
                console.log(response.data)
                setRatings(["All Ratings"].concat(response.data))
            })
            .catch(e => {
                console.log(e)
            })
    }

    // Creating search form
    const onChangeSearchTitle = e => {
        setSearchTitle(e.target.value);
    }
    const onChangeSearchRating = e => {
        setSearchRating(e.target.value);
    }

    // findByTitle & findByRating
    // call the backend api
    const find = (query, by, page = 0) => {
        MovieDataService.find(query, by, page)
            .then(response => {
                console.log(response.data)
                setMovies(response.data.movies)
                setEntriesPerPage(response.data.entries_per_page || 10) // fallback
                setTotalResults(response.data.total_results || response.data.movies.length || 0)
            })
            .catch(e => {
                console.log(e)
            })
    }
    // called by 'search by title' button, call find() function
    const findByTitle = (page = 0) => {
        setCurrentSearchMode("findByTitle")
        find(searchTitle, "title", page)
    }
    // called by 'search by rating' button, call find() function
    const findByRating = (page = 0) => {
        setCurrentSearchMode("findByRating")
        if (searchRating === "All Ratings") {
            retrieveMovies(page)
        }
        else {
            find(searchRating, "rated", page)
        }
    }

    // Pagination
    const totalPages = Math.max(1, Math.ceil(totalResults / entriesPerPage)) // always at least 1 page

    // Helper function to generate compact page numbers
    const getPaginationItems = () => {
        const items = [];
        const maxPagesToShow = 5; // show 5 pages at a time
        let startPage = Math.max(0, currentPage - 2); // start 2 before current
        let endPage = Math.min(totalPages - 1, currentPage + 2); // end 2 after current

        // Adjust if near start or end
        if (currentPage <= 2) {
            endPage = Math.min(totalPages - 1, maxPagesToShow - 1);
        } else if (currentPage >= totalPages - 3) {
            startPage = Math.max(0, totalPages - maxPagesToShow);
        }

        // First page
        if (startPage > 0) {
            items.push(
                <Pagination.Item key={0} onClick={() => setCurrentPage(0)}>
                    1
                </Pagination.Item>
            );
            if (startPage > 1) items.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
        }

        // Pages in the middle
        for (let number = startPage; number <= endPage; number++) {
            items.push(
                <Pagination.Item
                    key={number}
                    active={number === currentPage}
                    onClick={() => setCurrentPage(number)}
                >
                    {number + 1}
                </Pagination.Item>
            );
        }

        // Last page
        if (endPage < totalPages - 1) {
            if (endPage < totalPages - 2) items.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
            items.push(
                <Pagination.Item key={totalPages - 1} onClick={() => setCurrentPage(totalPages - 1)}>
                    {totalPages}
                </Pagination.Item>
            );
        }

        return items;
    };

    // JSX Markup
    return (
        <div className="App">
            <Container className="my-4">
                {/* Search Form */}
                <Form className="mb-4">
                    <Row className="align-items-end g-3">
                        <Col md={6}>
                            <Form.Label>Search by Title</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter movie title"
                                    value={searchTitle}
                                    onChange={onChangeSearchTitle}
                                />
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setCurrentPage(0);
                                        findByTitle(0);
                                    }}>
                                    Search
                                </Button>
                            </InputGroup>
                        </Col>

                        <Col md={6}>
                            <Form.Label>Filter by Rating</Form.Label>
                            <InputGroup>
                                <Form.Control as="select" onChange={onChangeSearchRating}>
                                    {ratings.map((rating, idx) => (
                                        <option key={idx} value={rating}>
                                            {rating}
                                        </option>
                                    ))}
                                </Form.Control>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setCurrentPage(0);
                                        findByRating(0);
                                    }}>
                                    Search
                                </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>

                {/* Movies Grid */}
                <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                    {movies.map((movie) => {
                        return (
                            <Col key={movie._id}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Img
                                        src={movie.poster ? movie.poster + "/100px180" : defaultPoster}
                                        alt={movie.title}
                                        style={{
                                            height: "340px", 
                                            objectFit: "cover"
                                        }}
                                        onError={(e) => e.target.src = defaultPoster}
                                    />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Text>Rating: {movie.rated ? movie.rated : "N/A"}</Card.Text>
                                        <Card.Text>{movie.plot}</Card.Text>
                                        <Link to={"/movies/id/" + movie._id}>View Reviews</Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>


                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination className="justify-content-center mt-4">
                        <Pagination.First
                            onClick={() => setCurrentPage(0)}
                            disabled={currentPage === 0}
                        />
                        <Pagination.Prev
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 0}
                        />
                        {getPaginationItems()}
                        <Pagination.Next
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages - 1}
                        />
                        <Pagination.Last
                            onClick={() => setCurrentPage(totalPages - 1)}
                            disabled={currentPage === totalPages - 1}
                        />
                    </Pagination>
                )}

            </Container>
        </div>
    )
}

export default MoviesList