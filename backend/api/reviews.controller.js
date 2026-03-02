import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            // retrieve data from body of request
            const movieId = req.body.movie_id
            const review = req.body.text   // review content is in 'text'
            const userInfo = {
                name: req.body.name,
                email: req.body.email
            }
            const date = new Date()

            // send info to ReviewsDAO.addReview
            const ReviewResponse = await ReviewsDAO.addReview(
                movieId,
                userInfo,
                review,
                date
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            // retrieve data from body of request
            const reviewId = req.body._id    // _id of the comment
            const review = req.body.text
            const email = req.body.email
            const date = new Date()

            // send info to ReviewsDAO.updateReview
            // updateReview returns a document ReviewResponse
            const ReviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                email,
                review,
                date
            )

            // check if there was an error in DAO
            if (ReviewResponse.error) {
                return res.status(500).json({ error: ReviewResponse.error })
            }

            // check if no document was modified
            if (ReviewResponse.modifiedCount === 0) {
                throw new Error("Unable to update review. User may not be original poster.")
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteReview(req, res, next) {
        try {
            // retrieve data from body of request
            const reviewId = req.body._id
            const email = req.body.email

            // send info to ReviewsDAO.deleteReview
            const ReviewResponse = await ReviewsDAO.deleteReview(reviewId, email)

            // check if there was an error in DAO
            if (ReviewResponse.error) {
                return res.status(500).json({ error: ReviewResponse.error })
            }

            // check if no document was deleted
            if (ReviewResponse.deletedCount === 0) {
                throw new Error("Unable to delete review. User may not be original poster.")
            }

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}