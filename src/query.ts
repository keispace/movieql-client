import { gql } from "apollo-boost";

export const HOME_PAGE = gql`
  {
    movies(limit:50, rating:7) {
        id
        title
        rating
        medium_cover_image
    }
  }
`
export const MOVIE_DETAILS = gql`
    query getMovieDetail($movieId:Int!) {
        movie(id: $movieId) {
            id
            title
            rating
            genres
            description_intro
            medium_cover_image
        }
        suggestions(id:$movieId) {
            id
            title
            rating
            medium_cover_image
        }
    }  
`