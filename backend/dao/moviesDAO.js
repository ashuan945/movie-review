// for getMovieById
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId


let movies  // movies stores the reference to db

export default class MoviesDAO{

    static async injectDB(conn){    // injectDB is calledd as soon as server starts & provide dn reference to 'movies'
        if(movies){
            return  // id ref already exists, return
        }
        try{
            // else, go ahead to connect db name
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies')
        }
        // if fail to get ref, send error message
        catch(e){
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    
    static async getMovies({
        filters = null,  // // getMovies method accept a filter object as 1st arg, by default has no filters
        // retrieve at page 0 and retrieves 20 movies per page
        page = 0,
        moviesPerPage = 20,
    } = {}){
        // construct query
        let query
        if(filters){
            // check if filters contain property title
            if("title" in filters){
                // search for movie title containing uer specifies search terms
                query = { $text: { $search: filters['title']}}
            }
            else if("rated" in filters){
                query = { "rated": { $eq: filters['rated']}}
            }
        }

        // find all movies that fit query & assign it to a cursor
        // query can match very large sets of documents, a cursor fetches these documents in batches to reduce both memory consumption and network bandwidth usage
        let cursor
        try{
            cursor = await movies.find(query)
            .limit(moviesPerPage)   // cursor ’ s limit method to cap the number of documents returned
            .skip(moviesPerPage * page)  //  skip applies first and the limit only applies to the documents left over after the skip

            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)  // get total num movies by counting num of documents in query & return movieList & totalNumMovies in object
            return { moviesList, totalNumMovies}
        }
        catch(e){
            console.error(`Unable to issue find command, ${e}`)
            return { moviesList: [], totalNumMovies: 0}
        } 
    }




    static async getRatings(){
        let ratings = []
        try{
            ratings = await movies.distinct("rated") // get all distinct rated values from movies collection
            return ratings
        }
        catch(e){
            console.error(`Unable to get ratings, ${e}`)
            return ratings
        }
    }


    static async getMovieById(id){
        if(!ObjectId.isValid(id)){
            console.error(`Invalid ObjectId: ${id}`);
            return null;
        }
        try{
            return await movies.aggregate([
                {
                    $match:{
                        _id: new ObjectId(id),
                    }
                },
                {$lookup:
                    {
                        from:'comments',    // collection to join
                        localField:'_id',   // field from the input document (above)
                        foreignField:'movie_id',    // field from the document of the "from" collection
                        as: 'reviews', // output array field
                    }
                }
            ]).next()
        }
        catch(e){
            console.error(`something went wrong in getMovieById: ${e}`)
            throw e
        }
    }
}