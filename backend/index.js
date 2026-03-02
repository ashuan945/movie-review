import app from './server.js'  //  import app that previously created and exported in server.js
import mongodb from 'mongodb'   // to access db
import dotenv from 'dotenv'     // to access env variables
import MoviesDAO from './dao/moviesDAO.js'
import ReviewsDAO from './dao/reviewsDAO.js'

async function main(){
    dotenv.config()     // load env variables
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000

    try{
        // Connect to mongodb cluster, await block further execution until operation completd
        await client.connect()

        // Get initial ref to movies collection in db (Initiating MoviewDAO)
        await MoviesDAO.injectDB(client)

        // Initiating ReviewsDAO
        await ReviewsDAO.injectDB(client)

        // After connecting & no error, start web server; 2nd arg (callback function) executed when server start listening
        app.listen(port, ()=>{
            console.log('server is running on port: ' + port);
        })
    }
    catch(e){
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error)