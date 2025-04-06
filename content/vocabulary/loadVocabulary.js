document.addEventListener('DOMContentLoaded', () => {
    const vocabularyList = document.getElementById('vocabulary-list');
    const paginationContainers = document.querySelectorAll('.pagination');
    const perPage = 10;
    let currentPage = 1;
    let vocabularyData = [];
    let totalPages = 0;

    // Load and parse CSV
    Papa.parse('vocabulary.csv', {
        download: true,
        header: true,
        dynamicTyping: true,
        complete: function (results) {
            vocabularyData = results.data.map(row => ({
                word: row.word,
                meaning: row.meaning,
                skill_level: row.skill_level,
                image_path: row.image_path
            }));
            totalPages = Math.ceil(vocabularyData.length / perPage);
            renderPage(currentPage);
            renderPagination();
        }
    });

    // Render vocabulary terms for the current page
    function renderPage(page) {
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const pageData = vocabularyData.slice(startIndex, endIndex);

        vocabularyList.innerHTML = '';
        pageData.forEach(term => {
            const termCard = document.createElement('li');
            termCard.classList.add('vocabulary-card');
            termCard.innerHTML = `
                <div class="card-content">
                    <h2>${term.word}</h2>
                    <img src="${term.image_path}" alt="${term.word}" class="vocabulary-image">
                    <p>${term.meaning}</p>
                </div>
            `;
            termCard.addEventListener('click', () => openModal(term));
            vocabularyList.appendChild(termCard);
        });
    }

    // Render pagination controls for all pagination containers
    function renderPagination() {
        paginationContainers.forEach(paginationContainer => {
            paginationContainer.innerHTML = '';

            const prevButton = createButton('Precedente', currentPage - 1, currentPage === 1);
            const nextButton = createButton('Successiva', currentPage + 1, currentPage === totalPages);

            const pageInfo = document.createElement('span');
            pageInfo.textContent = `Pagina ${currentPage} di ${totalPages}`;

            paginationContainer.appendChild(prevButton);
            paginationContainer.appendChild(pageInfo);
            paginationContainer.appendChild(nextButton);
        });
    }

    // Create pagination buttons with proper attributes
    function createButton(label, targetPage, isDisabled) {
        const button = document.createElement('button');
        button.textContent = label;
        button.classList.add('pagination-btn');
        button.disabled = isDisabled;

        if (!isDisabled) {
            button.addEventListener('click', () => {
                currentPage = targetPage;
                renderPage(currentPage);
                renderPagination();

                // Scroll to the vocabulary list
                document.getElementById('list-top').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }

        return button;
    }

    // Open modal with selected term details
    function openModal(term) {
        const modal = document.getElementById('vocabulary-modal');
        document.getElementById('modal-word').textContent = term.word;
        document.getElementById('modal-image').src = term.image_path;
        document.getElementById('modal-image').alt = term.word;
        document.getElementById('modal-meaning').textContent = term.meaning;

        modal.style.display = 'block';
    }

    // Close modal
    document.querySelector('.close-btn').addEventListener('click', () => {
        document.getElementById('vocabulary-modal').style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('vocabulary-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initial render
    renderPage(currentPage);
    renderPagination();
});