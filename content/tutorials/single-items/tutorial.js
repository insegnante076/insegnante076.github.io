// Funzione per ottenere il parametro 'tutorial' dall'URL
function getTutorialParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tutorial');
}

// Funzione per caricare il tutorial corrispondente
function loadTutorial(tutorialId) {
    // Creiamo un percorso relativo per il tutorial in base al suo ID
    const tutorialPath = `${tutorialId}.html`;

    // Se il tutorial esiste, carichiamo il contenuto nel div #tutorial-description
    const tutorialContentDiv = document.getElementById('tutorial-description');
    tutorialContentDiv.innerHTML = "<p>Caricamento in corso...</p>";

    fetch(tutorialPath)
        .then(response => {
            if (!response.ok) {
                throw new Error("Tutorial non trovato");
            }
            return response.text();
        })
        .then(content => {
            tutorialContentDiv.innerHTML = content;
        })
        .catch(error => {
            tutorialContentDiv.innerHTML = "<p>Errore nel caricamento del tutorial. " + error.message + "</p>";
        });
}

// Esegui il caricamento del tutorial quando la pagina è pronta
window.onload = function() {
    const tutorialId = getTutorialParam();
    if (tutorialId) {
        loadTutorial(tutorialId);
    } else {
        document.getElementById('tutorial-title').textContent = "Errore";
        document.getElementById('tutorial-description').textContent = "Nessun tutorial selezionato.";
    }
};
