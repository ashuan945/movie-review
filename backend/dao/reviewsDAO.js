import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId  // to convert id string to a MongoDB Object id

let reviews  // reference to 'comments' collection

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }

        // if reviews not filled, access database comments collection
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('comments')
        } catch (e) {
            console.error(`Unable to establish connection handle in ReviewsDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review, date) {
        try {
            const commentDoc = {
                name: user.name,       // poster name
                email: user.email,     // poster email
                date: date,            // current timestamp
                text: review,          // review content
                movie_id: new ObjectId(movieId)  // reference to movie
            }

            // insert into the comments collection
            return await reviews.insertOne(commentDoc)
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, email, review, date) {
        try {
            // update comment by _id and email
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId), email: email },  // filter by ObjectId and poster email
                { $set: { text: review, date: date } }      // update content and date
            )

            // debug log
            console.log("UpdateResponse:", updateResponse)

            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, email) {
        try {
            // delete comment by _id and email
            const deleteResponse = await reviews.deleteOne(
                { _id: new ObjectId(reviewId), email: email }
            )

            // debug log
            console.log("DeleteResponse:", deleteResponse)

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }
}