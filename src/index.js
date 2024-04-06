document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const dogImageContainer = document.getElementById('dog-image-container');
    const dogBreedsList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    // Function to fetch and display dog images
    function fetchAndDisplayImages() {
        fetch(imgUrl)
            .then(response => response.json())
            .then(data => {
                data.message.forEach(imageUrl => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    dogImageContainer.appendChild(imgElement);
                });
            });
    }

    // Function to fetch and display breeds
    function fetchAndDisplayBreeds() {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = Object.keys(data.message);
                breeds.forEach(breed => {
                    const liElement = document.createElement('li');
                    liElement.textContent = breed;
                    dogBreedsList.appendChild(liElement);
                });
            });
    }

    // Fetch and display images and breeds on page load
    fetchAndDisplayImages();
    fetchAndDisplayBreeds();

    // Function to filter breeds by the selected letter
    function filterBreeds(letter) {
        const breedListItems = dogBreedsList.getElementsByTagName('li');
        Array.from(breedListItems).forEach(item => {
            const breedName = item.textContent.toLowerCase();
            if (breedName.startsWith(letter)) {
                item.style.display = 'block'; // Show breeds starting with the selected letter
            } else {
                item.style.display = 'none'; // Hide other breeds
            }
        });
    }

    // Add event listener to breed dropdown
    for (let i = 97; i <= 122; i++) {
        const option = document.createElement('option');
        option.value = String.fromCharCode(i);
        option.textContent = String.fromCharCode(i);
        breedDropdown.appendChild(option);
    }

    breedDropdown.addEventListener('change', function(event) {
        const selectedLetter = event.target.value;
        filterBreeds(selectedLetter);
    });
});


