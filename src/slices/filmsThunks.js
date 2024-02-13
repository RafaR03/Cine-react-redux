import { setFilms } from "./filmsSlice"
import { buscarPelis, buscarPelisFiltered, buscarPelisIndividual } from "../Services/buscarPeli"

//El thunk es una funcion que devuelve una accion asincrona
export const  getFilms = () => {
    return async (dispatch, getState) => {

        try {
            const res = await buscarPelis();

            if (res.ok) {
                 const data = await res.json();
                dispatch(setFilms(data.results))
            }
           


        } catch (error) {
            //Notificar error con dispatch
        }



    }
}
export const  getFilmsFiltered = (filter) => {
    return async (dispatch, getState) => {

        try {
            const res = await buscarPelisFiltered(filter);

            if (!res.ok) {
                //Notificar error con dispatch
            }
            const data = await res.json();


            dispatch(setFilms(data.results))

        } catch (error) {
            //Notificar error con dispatch
        }

    }
}
export const  getFilmsIndividual = (id) => {
    return async (dispatch, getState) => {

        try {
            const res = await buscarPelisIndividual(id);

            if (!res.ok) {
                //Notificar error con dispatch
            }
            const data = await res.json();


            dispatch(setFilms(data))

        } catch (error) {
            //Notificar error con dispatch
        }

    }
}