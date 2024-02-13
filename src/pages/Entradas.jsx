import React, { useState, useEffect } from "react";

const Entradas = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const storedReservations = JSON.parse(localStorage.getItem("reservations")) || [];
        setReservations(storedReservations);
    }, []);

    if (!reservations || reservations.length === 0) {
        return <div>No hay reservas realizadas.</div>;
    }

    return (
        <div>
            <h1 className="text-6xl font-semibold mb-4 text-white text-center m-8">Detalles de las reservas:</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-8">
                {reservations.map((reservation, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md m-8">
                        <h3 className="text-lg font-semibold mb-2">Reserva {index + 1}</h3>
                        <p className="mb-2">Nombre: {reservation.nombre}</p>
                        <p className="mb-2">Email: {reservation.email}</p>
                        <p className="mb-2">Asiento: {reservation.asiento}</p>
                        <p className="mb-2">Título de la película: {reservation.tituloPelicula}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Entradas;
