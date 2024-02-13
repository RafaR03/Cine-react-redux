import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FilmDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [genres, setGenres] = useState([]);
  const [productionCountries, setProductionCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [icon, setIcon] = useState(() => {
    // Obtener el estado del ícono del almacenamiento local
    const storedIcon = localStorage.getItem(`icon-${id}`);
    return storedIcon ? parseInt(storedIcon) : 0;
  });

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c42022d4ec4fbb999f74a6ff8f367c18`
        );
        const data = await response.json();
        setMovieDetails(data);
        setGenres(data.genres);
        setProductionCountries(data.production_countries);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    // Guardar el estado del ícono en el almacenamiento local cuando cambie
    localStorage.setItem(`icon-${id}`, icon);
    if (icon === 1) {
      const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const isAlreadyFavorite = storedFavorites.some((favorite) => favorite.id === id);
      if (!isAlreadyFavorite) {
        storedFavorites.push({ id, posterPath: movieDetails.poster_path });
        localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      }
    }
  }, [id, icon, movieDetails]);

  const handleBuyTicket = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  const handleCloseReservation = () => {
    setShowConfirmationModal(false);
    setShowModal(false);
  };
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asiento, setAsiento] = useState("");

  const handleConfirmReservation = () => {
    const reservationData = {
      nombre: nombre,
      email: email,
      asiento: asiento,
      tituloPelicula: movieDetails.title
    };
  
    // Recuperar las reservas existentes del almacenamiento local
    const existingReservations = JSON.parse(localStorage.getItem("reservations")) || [];
    
    // Agregar la nueva reserva al array existente
    localStorage.setItem("reservations", JSON.stringify([...existingReservations, reservationData]));
  
    setShowConfirmationModal(true);
    setShowModal(false);
  };
  


  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleIconClick = (e) => {
    // Evitar la propagación del evento para evitar que el componente se desmonte
    e.stopPropagation();

    // Cambiar el estado del ícono cuando se hace clic en él
    console.log("Icon clicked");
    setIcon((prevIcon) => (prevIcon === 0 ? 1 : 0));
  };

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:gap-6 items-start max-w-6xl px-2 mx-auto py-4 text-white relative">
      <>
        <div className="grid md:grid-cols-4 gap-4 items-start">
          <div className="md:col-span-4">
            <img
              alt="Film Poster"
              className="aspect-[2/3] object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              height={900}
              src={`https://image.tmdb.org/t/p/original${movieDetails.poster_path}`}
              width={600}
            />
          </div>
        </div>
        <div className="grid md:gap-2 items-start bg-gray-700 p-6 rounded-lg">
          <div className="absolute top-8 right-8 cursor-pointer" onClick={handleIconClick}>
            {icon === 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="30" height="30">
                <path fill="#FFD43B" d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="30" height="30">
                <path fill="#FFD43B" d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
              </svg>
            )}
          </div>
          <div className="hidden md:flex items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-5xl leading-0">
                {movieDetails.title}
              </h1>
              <div className="text-gray-900 dark:text-gray-500">
                <label className="text-base font-bold text-white" htmlFor="Overview">
                  Overview
                </label>
                <p className="mt-2 mb-4 text-white">{movieDetails.overview}</p>
              </div>
            </div>
          </div>
          <form className="grid gap-2 md:gap-8">
            <div className="grid">
              <label className="text-base font-bold" htmlFor="Production Countries">
                Production Countries
              </label>
              <ul>
                {productionCountries.map((country, index) => (
                  <li className="mt-2" key={index}>
                    {country.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid">
              <label className="text-base font-bold" htmlFor="popularity">
                Popularity
              </label>
              <p className="mt-2">{movieDetails.popularity || "N/A"}</p>
            </div>
            <div className="grid">
              <h3 className="font-bold mb-2">Genres:</h3>
              <div>
                {genres.map((genre) => (
                  <button key={genre.id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 mt-2 rounded">
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid">
              <label className="text-base font-bold" htmlFor="release">
                Release Date
              </label>
              <p className="mt-2">{movieDetails.release_date || "N/A"}</p>
            </div>
            <div className="grid">
              <label className="text-base font-bold" htmlFor="language">
                Original Language
              </label>
              <p className="uppercase mb-2 mt-2">
                {movieDetails.original_language || "N/A"}
              </p>
            </div>
            <div className="grid">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-4 rounded" onClick={handleBuyTicket}>
                Comprar
              </button>
            </div>
          </form>
        </div>
      </>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center" onClick={() => handleCloseReservation()}>
          <div className="bg-white p-8 rounded-lg w-96" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4 text-black">Compra de Entrada</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Nombre:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name" type="text" placeholder="Nombre" value={nombre}
                  onChange={(e) => setNombre(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Asiento:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Asiento" value={asiento}
                  onChange={(e) => setAsiento(e.target.value)} />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                  Telefono:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" type="number" placeholder="Telefono" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
                  Direccion:
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Direccion" />
              </div>
              <div>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full" type="button" onClick={handleConfirmReservation} >
                  Reservar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirmationModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-xl font-bold m-4 text-black">Reserva Confirmada</h2>
            <p className="text-lg font-semibold m-4 text-black">Su reserva ha sido confirmada.</p>
            <div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full" type="button" onClick={handleCloseConfirmationModal} >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilmDetails;
