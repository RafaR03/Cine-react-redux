import React from "react";
import { Link } from "react-router-dom";

const Favoritos = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-4">
      {favorites.map((favorite) => (
        <div key={favorite.id} className="relative">
          <Link to={`/film/${favorite.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original${favorite.posterPath}`}
              alt="Favorite Poster"
              className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Favoritos;
