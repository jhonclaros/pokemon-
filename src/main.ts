import "./style.css";
import { getPokemons } from "./api/pokemonApi";
import { discoverPokemon } from "./services/pokemonService";
import { renderPokemon } from "./ui/renderPokemon";

const container = document.getElementById("pokemonList") as HTMLDivElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const searchBtn = document.getElementById("searchBtn") as HTMLButtonElement;

let discovered = new Set<string>();
const discoveredDescriptions = new Map<string, string>();

let pokemonList:any[] = [];

const loadPokemons = async () => {

    const data = await getPokemons();

    pokemonList = data;

    renderList();
};

const renderList = () => {

    container.innerHTML = "";

    pokemonList.forEach((pokemon) => {

        const isDiscovered = discovered.has(pokemon.name);
        const description = discoveredDescriptions.get(pokemon.name) || "";

        const card = renderPokemon(
        {
            name: pokemon.name,
            image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`
        },
        isDiscovered,
        description
        );

        container.appendChild(card);
    });
};

searchBtn.addEventListener("click", async ()=>{

    const name = searchInput.value.toLowerCase();

    try{

        const pokemon = await discoverPokemon(name);

        discovered.add(name);
        discoveredDescriptions.set(name, pokemon.description);

        renderList();

    }catch(error){

        alert("Pokemon no encontrado");

    }

});

loadPokemons();