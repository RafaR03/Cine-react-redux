import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Buscar from "./Buscar";
import {useDispatch, useSelector} from "react-redux";
import {getFilms, getFilmsFiltered} from "../slices/filmsThunks"

const Movies = () => {

  let film = useSelector(state=> state.films.films)
  const dispatch =useDispatch();


  useEffect(() => {
    dispatch(getFilms());
  }, []);


  const handleSearch = (searchTerm) => {
    if (searchTerm != "") {
      // Filtrar las películas que coincidan con el término de búsqueda
      dispatch(getFilmsFiltered(searchTerm))
    }
    else {
      dispatch(getFilms())
    }
  };

  return (
    <div>
      <Buscar onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
        {film.map((movie) => (
          <Link key={movie.id} to={`/film/${movie.id}`}>
            <div
              key={movie.id} className={`relative overflow-hidden rounded-lg`} >
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="w-full h-auto" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
