import { getPokemonByName, getPokemonSpeciesByName } from "../api/pokemonApi";

export const transformPokemon = (pokemon:any) => {

    const { name, sprites } = pokemon;

    const image = sprites.front_default;

    return {
        name,
        image
    };

};

export const discoverPokemon = async (name:string) => {

    const [pokemonData, speciesData] = await Promise.all([
        getPokemonByName(name),
        getPokemonSpeciesByName(name)
    ]);

    const descriptionEntry = speciesData.flavor_text_entries.find(
        (entry:any) => entry.language.name === "es"
    ) || speciesData.flavor_text_entries.find(
        (entry:any) => entry.language.name === "en"
    );

    const description = descriptionEntry
        ? descriptionEntry.flavor_text.replace(/\f|\n|\r/g, " ").trim()
        : "Sin descripción disponible";

    const pokemon = transformPokemon(pokemonData);

    return {
        ...pokemon,
        description
    };

};