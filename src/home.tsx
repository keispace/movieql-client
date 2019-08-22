import React from "react";
import { useQuery } from '@apollo/react-hooks';
import { HOME_PAGE } from "./query";
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

interface Movie {
    id: number
    title: string
    rating: number
    //description_intro: string
    //summary: string
    //language: string
    medium_cover_image: string
    //genres: string[]
}
interface Movies {
    movies: Movie[]
}

interface MovieVars {
    limit: number;
    rating: number;
}

const Home = () => {
    //ty...
    const { loading, data, error } = useQuery<Movies, MovieVars>(
        HOME_PAGE,
        { variables: { limit: 50, rating: 7 } }
    );
    if (error) return <div>someting wrong</div>
    else {
        return (
            <Container>
                {loading ?
                    <span>loading</span> :
                    data && data.movies && data.movies.map((movie: any) => <Movie movie={movie} />)}
            </Container>
        )
    }
}

const Movie = ({ movie }: any) => {
    const cardProps = { key: movie.id, background: movie.medium_cover_image };
    return <NavLink to={`/details/${movie.id}`}>
        <Card {...cardProps}>
            <Title>{movie.title} / {movie.rating} </Title>
        </Card>
    </NavLink>
}

const Container = styled.div`
    width:80%;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    margin: auto;
    padding: 20px;
    a{
        color:inherit;
        text-decoration:none;
        margin:0;
        margin-bottom:40px;

        padding:0;
    }
`

const Card = styled.div`
    display: flex;
    flex-direction:column;
    background-image: ${(props: any) => `url(${props.background})`};
    background-size: center;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);

    width:200px;
    height:300px;

    border-radius:15px;
    padding: 10px;
    position:relative;

`
const Title = styled.h2`
    position:absolute;
    white-space: normal;
    width:auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    margin:auto;
    padding:10px;
    background-color:#ffffff9a;
    bottom:25px;
    left:5px;
    right:5px;
`




export default Home;