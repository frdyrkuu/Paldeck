document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main';
    const url = `${baseUrl}/src/pals.json`;

    const palImage = document.getElementById('palImage');
    const palDesc = document.getElementById('palDesc');

    const sustainability = document.getElementById('susContainer')

    displayDetails();

    function displayDetails() {
        // Retrieve parameters from the URL
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const id = params.get('id');

        const palname = document.getElementById('palname');
        palname.textContent = name;

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
                    console.log(selectedPal);
                    palImage.src = `${baseUrl}/${selectedPal.image}`
                    palDesc.textContent = selectedPal.description;


                    const suitabilityData = selectedPal.suitability;

                    if (Array.isArray(suitabilityData) && suitabilityData.length > 0) {
                        const content = suitabilityData.map((item, index) => {
                            return `
                              <div class="flex flex-row flex-wrap items-center">
                                <img src="${baseUrl}${item.image}" alt="sustainability" id="sus${index}">
                                <h1 class="font-semibold capitalize">${item.type}</h1>
                              </div>`;
                        }).join('\n');

                        sustainability.innerHTML = content;
                    } else {
                        console.error(`Pal with id ${desiredId} has no suitability data.`);
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
