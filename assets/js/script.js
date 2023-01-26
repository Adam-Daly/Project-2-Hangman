// Wait for dom to be loaded before fetching elements
document.addEventListener('DOMContentLoaded', function () {

    //Define variables
    let word;
    let category;
    let hint;
    let guesses = 8;
    let guessedLetters = [];
    let incorrectGuesses = [];
    let alphabet = "abcdefghijklmnopqrstuvwxyz";


    //Define categories and hints
    let categories = {
        "Video Games": ["minecraft", "fortnite", "overwatch"],
        "Countries": ["australia", "japan", "egypt"],
        "Social Media Sites": ["instagram", "twitter", "tiktok"]
    };

    let hints = {
        "minecraft": "A popular sandbox game where you build with blocks",
        "fortnite": "A popular battle royale from Epic Games",
        "overwatch": "A competitive team hero shooter from Blizzard",
        "australia": "Country known for their Kangaroos",
        "japan": "Country known for their sushi",
        "egypt": "Country known for their ancient pyramids",
        "instagram": "Social media site known for photography",
        "twitter": "Social media site known for microblogging and tight character limits",
        "tiktok": "Social media site known for sharing short video clips"
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

    //Make alphabet buttons for guessing letters, using the alphabet string
    let lettersDiv = document.getElementById("letters");
    for (let i = 0; i < alphabet.length; i++) {
        let letter = alphabet[i];
        let letterButton = document.createElement("LI");
        letterButton.innerHTML = letter;
        letterButton.addEventListener("click", function(){
            //make sure the letter hasn't been guessed before checking it against the word
            //if not, check with makeGuess, add the guessed class and change the bg color to gray
            if (!letterButton.classList.contains("guessed")) {
                makeGuess(letter);
                letterButton.classList.add("guessed");
                letterButton.style.backgroundColor = "gray";
            }
        });
        lettersDiv.appendChild(letterButton);
    }

    //Check letter against word by rebuilding the word through comparison

    function makeGuess(currentLetter) {
        // check if the letter has already been guessed, add to guessedLetters if not 
        if (!guessedLetters.includes(currentLetter)) {
            guessedLetters.push(currentLetter);
            console.log(word + "one")
            console.log(currentLetter + "one")
            if (word.includes(currentLetter)) {
                console.log(currentLetter + "two")
                console.log(word + "two")
                let newWordToGuess = [];
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === currentLetter) {
                        newWordToGuess.push(currentLetter);
                    } else {
                        newWordToGuess.push(document.getElementById("word-to-guess").innerHTML[i]);
                    }
                }
                // convert the array to a string
                document.getElementById("word-to-guess").innerHTML = newWordToGuess.join('');
                if (!newWordToGuess.includes("_")) {
                    alert("You won!");
                    reset();
                }
            } 
            else {
                incorrectGuesses.push(currentLetter);
                guesses--;
                document.getElementById("hangman-image").src = "hangman-" + guesses + ".png";
                if (guesses === 0) {
                    alert("You lost. The word was " + word + ".");
                    reset();
                }
            }
        }
    }  
    
    //Make restart feature and button

});