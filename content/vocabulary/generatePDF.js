import { generatePDF } from '/content/utils/pdfGenerator.js';

document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Scarica PDF';
    downloadButton.classList.add('download-pdf-btn');

    const paginationBottom = document.getElementById('list-bottom');
    paginationBottom.insertAdjacentElement('afterend', downloadButton);

    downloadButton.addEventListener('click', () => {
        Papa.parse('vocabulary.csv', {
            download: true,
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                const vocabularyData = results.data;

                generatePDF(
                    vocabularyData,
                    'Vocabolario - PC e smartphone per tutti',
                    'Un elenco di termini utili con le loro definizioni.',
                    'vocabolario.pdf',
                    ['Parola', 'Significato'], // Headers
                    item => [item.word, item.meaning] // Data mapping
                );
            }
        });
    });
});