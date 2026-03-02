import axios from "axios" // for sending get, post, put & delete request from frontend to backend API

class MovieDataService{  // contain functions which make API calls to backend endpoints

    getAll(page=0){
        return axios.get(`http://localhost:5000/api/v1/movies?page=${page}`)
    }
    get(id){
        return axios.get(`http://localhost:5000/api/v1/movies/id/${id}`)
    }
    find(query, by="title", page=0){
        return axios.get(`http://localhost:5000/api/v1/movies?${by}=${query}&page=${page}`)
    }

    createReview(data){
        return axios.post("http://localhost:5000/api/v1/movies/review", data)
    }

    updateReview(data){
        return axios.put("http://localhost:5000/api/v1/movies/review", {_id: data._id,        // use _id
        text: data.text,
        email: data.email})
    }

    deleteReview(id, email){
        return axios.delete("http://localhost:5000/api/v1/movies/review", {data: {_id: id, email: email}})
    }

    getRatings(){
        return axios.get("http://localhost:5000/api/v1/movies/ratings")
    }
}

export default new MovieDataService()