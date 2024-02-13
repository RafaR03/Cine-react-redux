const url= "https://api.themoviedb.org/3/movie/now_playing?api_key=c42022d4ec4fbb999f74a6ff8f367c18";

export const buscarPelis=()=>{

    return fetch(url)
}

const urlfiltered= "https://api.themoviedb.org/3/search/movie?api_key=c42022d4ec4fbb999f74a6ff8f367c18";

export const buscarPelisFiltered=(filter)=>{
    return fetch(`${urlfiltered}&query=${filter}`)
}



export const buscarPelisIndividual=(id)=>{
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c42022d4ec4fbb999f74a6ff8f367c18`)
}