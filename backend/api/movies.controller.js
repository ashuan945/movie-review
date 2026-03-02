import MoviesDAO from '../dao/moviesDAO.js'
export default class MoviesController{
    
    // handle request to your api, decide what data to fetch & how to respond
    static async apiGetMovies(req, res, next){

        // Read query parameters
        // When someone calls the API, they can send parameters in the URL (query string)
        // req.query turns this into a JavaScript object
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page ? parseInt(req.query.page) : 0

        // Create filters
        let filters = {}
        if(req.query.rated){
            filters.rated = req.query.rated
        }
        else if(req.query.title){
            filters.title = req.query.title
        }

        // Get movies from DAO
        const{ moviesList, totalNumMovies } = await MoviesDAO.getMovies({filters, page, moviesPerPage}) // call getMovie & pass arguments, DAO returns moviesList & totalNumMovies

        // Prepare response
        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }
        // send as JSON back to whoever called the API
        res.json(response)
    }




    static async apiGetMovieById(req, res, next){
        try{
            let id = req.params.id || {}    // value after '/'
            let movie = await MoviesDAO.getMovieById(id)
            // if not found the movie, return error
            if(!movie){
                res.status(404).json({error: "not found"})
                return
            }
            res.json(movie)
        }
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }


    static async apiGetRatings(req, res, next){
        try{
            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)
        }
        catch(e){
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }
}