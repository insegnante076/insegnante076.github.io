document.addEventListener('DOMContentLoaded', () => {
    const vocabularyTable = document.getElementById('vocabulary-table');

    // Load and parse CSV
    Papa.parse('vocabulary.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            const vocabularyData = results.data.map(row => ({
                word: row.word,
                meaning: row.meaning,
                image_path: row.image_path
            }));
            renderTable(vocabularyData);
        }
    });

    // Render vocabulary terms in a table format
    function renderTable(data) {
        vocabularyTable.innerHTML = `
            <thead>
                <tr>
                    <th>Parola</th>
                    <th>Significato</th>
                    <th>Immagine</th>
                </tr>
            </thead>
            <tbody>
                ${data.map(term => `
                    <tr>
                        <td>${term.word}</td>
                        <td>${term.meaning}</td>
                        <td><img src="${term.image_path}" alt="${term.word}" class="table-image"></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
    }
});