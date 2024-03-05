document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://raw.githubusercontent.com/mlg404/palworld-paldex-api/main';
    const url = `${baseUrl}/src/pals.json`;

    const palContainer = document.getElementById('palCard');

    let allPals = [];
    let numPals = 0;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            allPals = data;

            // Get the total number of items in the array
            numPals = data.length;
            console.log(allPals);
            console.log(numPals);

            displayPals();

            displayPals();
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
        });

    function displayPals() {
        palContainer.innerHTML = "";

        const content = allPals.map((pal, index) => {
            return `
                    <div class="flex flex-col bg-white px-4 p-2 h-auto py-4 hover:-translate-y-2 delay-50 duration-100 shadow-sm rounded-xl">
                        <div class="flex items-center justify-center mx-auto pt-5">
                            <img src="${baseUrl}/${pal.image}" alt="Pal Image" class="h-36 w-36 rounded-full">
                        </div>
                        <div class="mt-10">
                            <h2 class="text-gray-500 font-semibold text-base">#${pal.id || ''}</h2>
                            <h1 class="text-3xl font-semibold">${pal.name || ''}</h1>
                        </div>
                        <!-- types -->
                        <div class="mt-3 flex items-center gap-2 capitalize">
                            <!-- TYPES -->
                            <img src="${baseUrl}/${pal.types[0].image}" alt="" class="h-10 w-10 rounded-full">
                            <h1 class="">${pal.types[0].name || ''}</h1>
                        </div>
                        <div>
                            <div class="grid grid-cols-2 gap-2">
                                <div class="flex flex-col">
                                    <!-- Add more elements for sustainability based on your data -->
                                </div>
                            </div>
                        </div>
                    </div>`;
        }).join('\n');

        palContainer.innerHTML = content;

        // Add event listener to each generated div
        const palDivs = document.querySelectorAll('.rounded-xl');
        palDivs.forEach((div, index) => {
            div.addEventListener('click', () => openPalDetailsTab(index));
        });
    }

    function openPalDetailsTab(index) {
        const selectedPal = allPals[index];
        const url = `_details.html?name=${encodeURIComponent(selectedPal.name || '')}&id=${selectedPal.id || ''}`;
        
        // Navigate to the new URL without opening a new tab
        window.location.href = url;
        
    }

});
