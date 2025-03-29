document.addEventListener('DOMContentLoaded', () => {
    const vocabularyList = document.getElementById('vocabulary-list');
    const paginationContainers = document.querySelectorAll('.pagination');
    const perPage = 6;
    let currentPage = 1;
    let vocabularyData = [];
    let totalPages = 0;

    // Create modal structure
    const modal = document.createElement('div');
    modal.id = 'image-modal';
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span id="close-modal" class="close-btn">&times;</span>
            <img id="modal-image" src="" alt="Large view of image" />
        </div>
    `;
    document.body.appendChild(modal);

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
            vocabularyList.appendChild(termCard);
        });

        // Add image click listener for lightbox functionality
        const images = document.querySelectorAll('.vocabulary-image');
        images.forEach(img => {
            img.addEventListener('click', function () {
                const modalImage = document.getElementById('modal-image');
                modalImage.src = this.src;
                modal.style.display = 'block';
            });
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

    // Close the modal when the close button is clicked
    const closeModal = document.getElementById('close-modal');
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close the modal when clicked outside the image
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Initial render
    renderPage(currentPage);
    renderPagination();
});
