// Global variables
let currentSura = null;
let currentAyat = null;

// DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown options
    const startSuraSelect = document.getElementById('startSura');
    const endSuraSelect = document.getElementById('endSura');
    
    // Populate dropdowns with sura numbers
    suraNumbers.forEach(number => {
        const startOption = document.createElement('option');
        startOption.value = number;
        startOption.textContent = number;
        startSuraSelect.appendChild(startOption);
        
        const endOption = document.createElement('option');
        endOption.value = number;
        endOption.textContent = number;
        endSuraSelect.appendChild(endOption);
    });
    
    // Set default values
    startSuraSelect.value = 78;
    endSuraSelect.value = 114;
    
    // Add event listeners to buttons
    document.getElementById('nextAyatBtn').addEventListener('click', getNextAyat);
    document.getElementById('translateBtn').addEventListener('click', translateAyat);
    document.getElementById('answerBtn').addEventListener('click', showSuraInfo);
    document.getElementById('quitBtn').addEventListener('click', function() {
        if (confirm('Are you sure you want to quit?')) {
            window.close();
        }
    });
    
    // Initialize with a random ayat
    getNextAyat();
});

/**
 * Get a random ayat from the selected sura range
 */
function getNextAyat() {
    const startSura = parseInt(document.getElementById('startSura').value);
    const endSura = parseInt(document.getElementById('endSura').value);
    
    // Validate selection
    if (isNaN(startSura) || isNaN(endSura)) {
        alert('Please select both start and end sura numbers');
        return;
    }
    
    if (startSura > endSura) {
        alert('Start sura number must be less than or equal to end sura number');
        return;
    }
    
    // Get a random sura number within the selected range
    const randomSuraNumber = getRandomInt(startSura, endSura);
    
    // Check if the sura exists in our data
    if (!tridcatiydjys[randomSuraNumber]) {
        alert(`Sura ${randomSuraNumber} is not available in the dataset`);
        return;
    }
    
    // Get a random ayat from the selected sura
    const sura = tridcatiydjys[randomSuraNumber];
    const randomAyatIndex = getRandomInt(0, sura.ayat.length - 1);
    const randomAyat = sura.ayat[randomAyatIndex];
    
    // Update global variables
    currentSura = randomSuraNumber;
    currentAyat = randomAyat;
    
    // Display the ayat
    document.getElementById('ayatDisplay').textContent = randomAyat;
    
    // Clear previous translation and sura info
    document.getElementById('translationDisplay').textContent = '';
    document.getElementById('suraInfoDisplay').textContent = '';
}

/**
 * Display the translation of the current ayat
 */
function translateAyat() {
    if (!currentSura || !currentAyat) {
        alert('Please select an ayat first');
        return;
    }
    
    // Check if translation exists
    if (!translatesura[currentSura]) {
        alert(`Translation for sura ${currentSura} is not available`);
        return;
    }
    
    // Find the index of the current ayat in the sura
    const ayatIndex = tridcatiydjys[currentSura].ayat.indexOf(currentAyat);
    
    // Get the translation
    const translation = translatesura[currentSura].translations[ayatIndex];
    
    // Format long translations with line breaks
    let formattedTranslation = translation;
    if (translation && translation.length > 70) {
        formattedTranslation = translation.substring(0, 65) + '<br>' + translation.substring(65);
    }
    
    // Display the translation
    document.getElementById('translationDisplay').innerHTML = formattedTranslation;
}

/**
 * Show information about the current sura and ayat
 */
function showSuraInfo() {
    if (!currentSura || !currentAyat) {
        alert('Please select an ayat first');
        return;
    }
    
    // Get sura name and ayat index
    const suraName = tridcatiydjys[currentSura].name;
    const ayatIndex = tridcatiydjys[currentSura].ayat.indexOf(currentAyat) + 1;
    
    // Display sura information
    document.getElementById('suraInfoDisplay').textContent = `${currentSura}, ${suraName}, ${ayatIndex}`;
}

/**
 * Helper function to get a random integer between min and max (inclusive)
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}