// Wait for dom to be loaded before fetching elements
document.addEventListener('DOMContentLoaded', function () {

    //Define variables
    let category;
    let hint;
    let alphabet = "abcdefghijklmnopqrstuvwxyz";

    //Define categories and hints
    let categories = {
        "Video Games": ["Minecraft", "Fortnite", "Overwatch"],
        "Countries": ["Australia", "Japan", "Egypt"],
        "Social Media Sites": ["Instagram", "Twitter", "Tiktok"]
    };

    let hints = {
        "Minecraft": "A popular sandbox game where you build with blocks",
        "Fortnite": "A popular battle royale from Epic Games",
        "Overwatch": "A competitive team hero shooter from Blizzard",
        "Australia": "Country known for their Kangaroos",
        "Japan": "Country known for their sushi",
        "Egypt": "Country known for their ancient pyramids",
        "Instagram": "Social media site known for photography",
        "Twitter": "Social media site known for microblogging and tight character limits",
        "Tiktok": "Social media site known for sharing short video clips"
    };

    //Make category buttons
    let categoriesDiv = document.getElementById("categories");
    for (let category in categories) {
        let categoryButton = document.createElement("LI");
        categoryButton.innerHTML = category;
        categoryButton.addEventListener("click", function(){
            selectWord(category);
        });
        categoriesDiv.appendChild(categoryButton);
    };

    //Pick a random word from the chosen category, make hint button and generate blank word
    function selectWord(selectedCategory) {
    // Generate a random floating point number between 0-1, multiply it by the number of
    // words in the category and then use floor to round down to the nearest integer. Then choose a word from the 
    // chosenCategory using the integer as an index value
    let randomWord = categories[selectedCategory][Math.floor(Math.random() * categories[selectedCategory].length)];
    word = randomWord;
    hint = hints[randomWord];
    let hintButton = document.getElementById("hint-button");
    hintButton.addEventListener("click", function(){
        revealHint(hint);
    });
    let wordToGuess = document.getElementById("word-to-guess");
    wordToGuess.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        wordToGuess.innerHTML += "_";
    }
    }

    //Show hint on click
    function revealHint(currentHint){
        let hintDisplay = document.getElementById("hint");
        hintDisplay.innerHTML = currentHint;
    };

    //Make alphabet buttons for guessing letters
    let lettersDiv = document.getElementById("letters");
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        let letterButton = document.createElement("LI")
        letterButton.innerHTML = letter;
        letterButton.addEventListener("click", function(){
            if (!letterButton.classList.contains("guessed")) {
            makeGuess(letter);
            letterButton.classList.add("guessed");
            letterButton.style.backgroundColor = "gray";
            }
        });
        lettersDiv.appendChild(letterButton);
    }

    //Check letter against word by rebuilding the word through comparison

    //Make restart feature and button

});