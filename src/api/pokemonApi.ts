const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async () => {

    const response = await fetch(`${BASE_URL}/pokemon?limit=50`);
    const data = await response.json();

    return data.results;
};


export const getPokemonByName = async (name:string) => {

    const response = await fetch(`${BASE_URL}/pokemon/${name}`);

    if(!response.ok){
        throw new Error("Pokemon no encontrado");
    }

    return await response.json();
};

export const getPokemonSpeciesByName = async (name:string) => {

    const response = await fetch(`${BASE_URL}/pokemon-species/${name}`);

    if(!response.ok){
        throw new Error("Pokemon no encontrado");
    }

    return await response.json();
};