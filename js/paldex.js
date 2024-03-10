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
            // console.log(allPals);
            // console.log(numPals);

            displayPals();

            displayPals();
        })
        .catch(error => {
            console.error('Error fetching the JSON file:', error);
        });

    function displayPals() {
        palContainer.innerHTML = "";

        const content = allPals.map((pal, index) => {
            // Iterate over the "types" array and create HTML for each type
            const typesContent = pal.types.map(type => `
                <div class="flex items-center capitalize gap-1">
                    <img src="${baseUrl}/${type.image}" alt="" class="sm:h-10 sm:w-10 w-5 h-5 rounded-full">
                    <h1 class="sm:text-base font-semibold text-sm text-slate-500">${type.name || ''}</h1>
                </div>
            `).join('\n');

            return `
                <div class="flex flex-col bg-white px-4 p-2 h-auto py-4 hover:-translate-y-2 delay-50 duration-100 shadow-sm rounded-xl">
                    <div class="flex items-center justify-center mx-auto pt-5">
                        <img src="${baseUrl}/${pal.image}" alt="Pal Image" class="sm:h-36 sm:w-36 w-24 h-24 rounded-full">
                    </div>
                    <div class="mt-10">
                        <h2 class="text-gray-500 font-semibold text-base">#${pal.id || ''}</h2>
                        <h1 class="sm:text-2xl text-xl font-[900] text-slate-600">${pal.name || ''}</h1>
                    </div>
                    <!-- types -->
                    <div class="mt-3 flex flex-wrap items-center gap-6 capitalize">
                        <!-- TYPES -->
                        ${typesContent}
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

