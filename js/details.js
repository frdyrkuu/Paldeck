document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main';
    const url = `${baseUrl}/src/pals.json`;

    const palImage = document.getElementById('palImage');
    const palDesc = document.getElementById('palDesc');

    const sustainability = document.getElementById('susContainer');
    const typeContent = document.getElementById('typeContent');

    const melee = document.getElementById('melee');
    const range = document.getElementById('range');
    const defense = document.getElementById('defense');
    const food = document.getElementById('food');
    const hp = document.getElementById('hp');
    const stamina = document.getElementById('stamina');

    displayDetails();

    function displayDetails() {
        // Retrieve parameters from the URL
        const params = new URLSearchParams(window.location.search);
        // const name = params.get('name');
        const id = params.get('id');
        const paramName = params.get('name');
        
        const palID = document.getElementById('palID');
        const palname = document.getElementById('palname');
        const title = document.querySelector('title');
        const palLink = document.querySelector('link');

        palID.textContent = `#${id}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const allPals = data;

                const selectedPal = allPals.find(pal => pal.id === parseInt(id, 10));

                if (selectedPal) {
                    // console.log(selectedPal);
                
                    palLink.href = `${baseUrl}/${selectedPal.image}`;

                    title.textContent = `${selectedPal.name}` ;

                    palname.textContent = selectedPal.name;

                    palImage.src = `${baseUrl}/${selectedPal.image}`;
                    palDesc.textContent = selectedPal.description;


                    // STATS
                    melee.textContent = selectedPal.stats.attack.melee;
                    range.textContent = selectedPal.stats.attack.ranged;
                    food.textContent = selectedPal.stats.food;
                    hp.textContent = selectedPal.stats.hp;
                    stamina.textContent = selectedPal.stats.stamina;

                    const suitabilityData = selectedPal.suitability;

                    if (Array.isArray(suitabilityData) && suitabilityData.length > 0) {
                        const content = suitabilityData.map((item, index) => {
                            const cleanedType = item.type.replace(/_/g, ' '); // Replace underscores with spaces
                            return `
                              <div class="flex flex-row flex-wrap items-center">
                                <img src="${baseUrl}${item.image}" alt="sustainability" id="sus${index}">
                                <h1 class="font-semibold capitalize">${cleanedType}</h1>
                              </div>`;
                        }).join('\n');

                        sustainability.innerHTML = content;
                    } else {
                        console.error(`Pal with id ${desiredId} has no suitability data.`);
                    }

                    // TYPE
                    const typeData = selectedPal.types;

                    if (Array.isArray(typeData) && typeData.length > 0) {
                        const contentType = typeData.map((item, index) => {
                            return `
                              <div class="flex flex-wrap items-center gap-1">
                                <img src="${baseUrl}${item.image}" alt="sustainability" id="sus${index}">
                                <h1 class="font-[700] capitalize">${item.name}</h1>
                              </div>`;
                        }).join('\n');

                        typeContent.innerHTML = contentType;



                    } else {
                        console.error(`Pal with id ${desiredId} has no type data.`);
                    }


                    // skills
                    const skills = selectedPal.skills;

                    if (Array.isArray(skills) && skills.length > 0) {
                        const contentSkill = skills.map((item, index) => {
                            // const cleanedType = item.name.replace(/_/g, ' ');
                            return `
                                <div class="flex gap-7 mt-3 font-[800] text-white">
                                <h1>Level : ${item.level}</h1>
                                <h2 class="tracking-widest capitalize">${item.name.replace(/_/g, ' ')}</h2>
                                <h3 class="capitalize">Type : ${item.type}</h3>
                                <h4>Power : ${item.power}</h4>
                                </div>`;
                        }).join('\n');

                        // typeContent.innerHTML = contentSkill;
                        const skillContent = document.getElementById('skillContent');
                        skillContent.innerHTML = contentSkill;
                        console.log(contentSkill);


                    } else {
                        console.error(`Pal with id ${desiredId} has no type data.`);
                    }


                } else {
                    console.error('Pal not found with the given ID.');
                }
            })
            .catch(error => {
                console.error('Error fetching the JSON file:', error);
            });
    }

});
