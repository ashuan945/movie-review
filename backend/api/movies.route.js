import express from 'express'
import MoviesController from './movies.controller.js'
import ReviewsController from './reviews.controller.js'

const router = express.Router()  // get access to express router
// router.route('/').get((req, res) => res.send('hello world'))

// Get movie list
router.route('/').get(MoviesController.apiGetMovies) 

// Get a single movie & all reviews
router.route('/id/:id').get(MoviesController.apiGetMovieById)

// Get a list of ratings ('G','PG,'R')
router.route('/ratings').get(MoviesController.apiGetRatings)

// Create/Edit/Delete Reviews
router
.route("/review")
.post(ReviewsController.apiPostReview)
.put(ReviewsController.apiUpdateReview)
.delete(ReviewsController.apiDeleteReview)

export default router

