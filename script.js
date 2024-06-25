document.getElementById("card").onsubmit = (event) => {
    event.preventDefault();
    fetchData();
}

async function fetchData() {
    const pokemonName = document.getElementById("search-input").value.toLowerCase();
    const getTypes = document.getElementById("types");
    const getImage = document.getElementById("spriteResult");
    getTypes.innerHTML = "";
    getImage.innerHTML = "";
    

    try {
        const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!api.ok) {
            throw new Error(`No informations found about ${pokemonName}`);
        }

        document.getElementById("result").style.visibility = "visible";

        const data = await api.json();

        const nameDisplay = document.getElementById("pokemon-name");
        nameDisplay.textContent = data.forms[0].name.toUpperCase();

        const idDisplay = document.getElementById("pokemon-id");
        idDisplay.textContent = `#${data.id}`;
        
        const weightDisplay = document.getElementById("weight");
        weightDisplay.textContent = `Weight: ${data.weight}`;

        const heightDisplay = document.getElementById("height");
        heightDisplay.textContent = `Height: ${data.height}`;

        const pokemonSprite = document.createElement("img");
        pokemonSprite.id = "sprite";
        pokemonSprite.src = data.sprites.front_default;
        getImage.appendChild(pokemonSprite);
        
        //stats//
        const hpStat = document.getElementById("hp");
        hpStat.textContent = data.stats[0].base_stat;

        const atkStat = document.getElementById("attack");
        atkStat.textContent = data.stats[1].base_stat;

        const defStat = document.getElementById("defense");
        defStat.textContent = data.stats[2].base_stat;

        const spAtkStat = document.getElementById("special-attack");
        spAtkStat.textContent = data.stats[3].base_stat;

        const spDefStat = document.getElementById("special-defense");
        spDefStat.textContent = data.stats[4].base_stat;

        const spdStat = document.getElementById("speed");
        spdStat.textContent = data.stats[5].base_stat;

        //types
        data.types.forEach((typeName, typeID) => {
            const typeDisplay = document.createElement("span");
            typeDisplay.id = `type${typeID +1};`
            typeDisplay.className = `type ${typeName.type.name}`;
            typeDisplay.textContent = typeName.type.name.toUpperCase();
            getTypes.appendChild(typeDisplay);
        });

    }

    catch(error) {
        document.getElementById("result").style.visibility = "hidden";
        getTypes.innerHTML = "";
        getImage.innerHTML = "";
        const hpStat = document.getElementById("hp");
        hpStat.textContent = "";

        const atkStat = document.getElementById("attack");
        atkStat.textContent = "";

        const defStat = document.getElementById("defense");
        defStat.textContent = "";

        const spAtkStat = document.getElementById("special-attack");
        spAtkStat.textContent = "";

        const spDefStat = document.getElementById("special-defense");
        spDefStat.textContent = "";

        const spdStat = document.getElementById("speed");
        spdStat.textContent = "";

        window.alert("Pokémon not found");
        console.error(error);
    }
}