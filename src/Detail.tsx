import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { MOVIE_DETAILS } from "./query";
import styled from 'styled-components';
import { NavLink } from "react-router-dom";


interface Movie {
    id: number
    title: string
    rating: number
    description_intro: string
    summary: string
    language: string
    medium_cover_image: string
    genres: string[]
}

interface Suggestions {
    id:number
    title: string
    rating: number
    medium_cover_image: string
}

interface Movies {
    movie: Movie
    suggestions: Suggestions[]

}
interface MovieVars {
    movieId: number
}

const Detail = ({ match: { params: { movieId } } }: any) => {
    const { loading, data, error } = useQuery<Movies, MovieVars>(
        MOVIE_DETAILS,
        { variables: { movieId: Number(movieId) } }
    );
    if (error) return <div>someting wrong</div>

    return (<>
        {loading ? <span>loading</span> :
            data && data.movie && <DetailContainer movie={data.movie} suggestions={data.suggestions} />
        }
    </>
    );
}

const DetailContainer = ({ movie, suggestions }: any) => {
    return (<DetailCard>
        <Poster src={movie.medium_cover_image} />
        <h2>{movie.title}</h2>
        <h4>Rating: {movie.rating}</h4>
        <h4>Genres: {movie.genres.join(', ')}</h4>
        <div>{movie.description_intro}</div>
        <h3>Suggested</h3>
        <Suggestions>
            {suggestions.map((suggestion: any) => <NavLink to={`/details/${suggestion.id}`}>
                    <Suggestion src={suggestion.medium_cover_image} />
                </NavLink>
                )}
        </Suggestions>
    </DetailCard>
    );
}

const DetailCard = styled.div`
    width:50%;
    display:flex;
    flex-direction:column;
`
const Poster = styled.img`
    padding: 10px;
    width:200px;
    margin:auto;
`
const Suggestions = styled.div`
    display:flex;
    overflow-x:scroll;
`

const Suggestion = styled.img`
    width:100px;
    margin:10px;
`

export default Detail;