export const renderPokemon = (pokemon:any, discovered:boolean, description:string) => {

    const card = document.createElement("div");

    card.classList.add("pokemon");

    if(!discovered){
        card.classList.add("locked");
    }

    card.innerHTML = `
    
    <h3>${pokemon.name}</h3>
    <img src="${pokemon.image}">
    <p>${discovered ? description : "No descubierto"}</p>
    
    `;

    return card;
};