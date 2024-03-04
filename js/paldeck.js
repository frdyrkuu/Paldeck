document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main';
    const url = `${baseUrl}/src/pals.json`;
    const palNameElement = document.getElementById('palName');
    const palsubNameElement = document.getElementById('palsubName');
    const palImageElement = document.getElementById('palImage');
    const palDescription = document.getElementById('description');
    const palType = document.getElementById('palType');
    const palTypeImg = document.getElementById('typeImage');
    const containerElement = document.getElementById('sustainability');
    const searchForm = document.getElementById('searchForm');

    const randomButton = document.getElementById('randomButton');
    randomButton.addEventListener('click', function () {
        const randomId = getRandomInt(1, 137);
        document.getElementById('search').value = randomId;

        // Use the randomId for further processing
        fetchPalData(randomId);
    });

    // Generate a random ID when the page loads
    const initialRandomId = getRandomInt(1, 137);
    fetchPalData(initialRandomId);

    // Define fetchPalData function
    function fetchPalData(desiredId) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const desiredPal = data.find(pal => pal.id === desiredId);

                console.log(data);
                if (desiredPal && desiredPal.name) {
                    palNameElement.textContent = desiredPal.name;
                    palsubNameElement.textContent = desiredPal.name;
                    palDescription.textContent = desiredPal.description;
                    palType.textContent = desiredPal.types[0].name;
                    palTypeImg.src = `${baseUrl}/${desiredPal.types[0].image}`;
                    console.log(palType.textContent);
                } else {
                    console.error(`Pal with id ${desiredId} not found or missing "name" property.`);
                }

                if (desiredPal && desiredPal.image) {
                    palImageElement.src = `${baseUrl}/${desiredPal.image}`;
                    palImageElement.alt = desiredPal.name; // Set alt attribute to the pal's name for accessibility
                } else {
                    console.error(`Pal with id ${desiredId} not found or missing "image" property.`);
                }

                if (desiredPal && desiredPal.suitability) {
                    const suitabilityData = desiredPal.suitability;

                    if (Array.isArray(suitabilityData) && suitabilityData.length > 0) {
                        const content = suitabilityData.map((item, index) => {
                            return `
                              <div class="flex flex-row flex-wrap items-center">
                                <img src="${baseUrl}${item.image}" alt="sustainability" id="sus${index}">
                                <h1 class="font-semibold">${item.type}</h1>
                              </div>`;
                        }).join('\n');

                        containerElement.innerHTML = content;
                    } else {
                        console.error(`Pal with id ${desiredId} has no suitability data.`);
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching the JSON file:', error);
            });
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Add event listener to the form
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Extract the entered number from the input
        const desiredId = parseInt(document.getElementById('search').value, 10);

        // Use the desiredId for further processing
        fetchPalData(desiredId);
    });
});
