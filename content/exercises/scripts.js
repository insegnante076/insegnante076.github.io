document.addEventListener('DOMContentLoaded', function () {
  const url = 'https://docs.google.com/spreadsheets/d/157eLTqGU9tLEsZ9Z0eA2Vw4RhYBW1Vu_xoU_LyVJvys/export?format=csv';

  // Fetch the CSV from Google Sheets
  fetch(url)
    .then(response => response.text())
    .then(data => {
      // Parse the CSV data using PapaParse
      Papa.parse(data, {
        header: true,
        dynamicTyping: true,
        complete: function (results) {
          // Once parsing is complete, display the data
          const exercises = results.data;

          // Find the container where the exercises will be displayed
          const exercisesContainer = document.querySelector('#exercises-container');

          // Loop through each row (exercise) and create a card
          exercises.forEach(exercise => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Check if there is an image and add it to the card first
            if (exercise.image_address) {
              const image = document.createElement('img');
              image.src = exercise.image_address;  // Assuming 'image_address' contains a valid image URL
              image.alt = exercise.Titolo;
              card.appendChild(image);
            }

            const title = document.createElement('h3');
            title.textContent = exercise.Titolo;  // Assuming the column is called 'Titolo'
            card.appendChild(title);

            const subtitle = document.createElement('p');
            subtitle.textContent = exercise.Sottotitolo;  // Assuming the column is called 'Sottotitolo'
            card.appendChild(subtitle);

            const link = document.createElement('a');
            link.href = exercise.Link;  // Assuming 'Link' contains a URL
            link.textContent = 'Vai al contenuto';
            card.appendChild(link);

            exercisesContainer.appendChild(card);
          });
        }
      });
    })
    .catch(error => {
      console.error('Error fetching or parsing the data:', error);
    });
});
