// Object that holds all my variables for the game
var game = {
    //holds values to make sure the player is
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    word: ["ruby", "mongodb", "javascript", "python", "html", "css", "jquery", "react", "express", "node", "java", "rust", "php", "markdown"],
    answer: "",
    guessesLeft: 9,
    chosenWordArray: [],
    alreadyGuessed: [],
    correctlyGuessed: [],
    hiddenLetters: "",
    wins: 0,
    losses: 0,

    randomWord: function () {
        //Variable that chooses a random word from the array
        this.answer = this.word[Math.floor(Math.random() * this.word.length)];
        this.wordSplitter(this.answer);
    },

    wordSplitter: function (word) {
        for (i = 0; i < this.answer.length; i++) {
            this.chosenWordArray.push(this.answer.charAt(i));
            this.correctlyGuessed.push(this.answer.charAt(i));
        }
    },

    gameStart: function () {
        this.randomWord();
        for (var i = 0; i < this.chosenWordArray.length; i++) {
            this.hiddenLetters += "_ ";
            document.getElementById("spaces").innerHTML = this.hiddenLetters;
        }

        console.log(this.hiddenLetters);
        console.log(this.chosenWordArray);
    },

    reset: function () {
        this.answer = "",
            this.guessesLeft = " " + 9,
            this.chosenWordArray = [],
            this.correctlyGuessed = [],
            this.alreadyGuessed = [],
            this.hiddenLetters = "";
        this.gameStart();

        this.wins -= 1;
        document.getElementById("guesses").innerHTML = this.guessesLeft;
        document.getElementById("guessedLetters").innerHTML = this.alreadyGuessed;
    },

    showLetter: function (z) {
        let array = game.hiddenLetters.split(" ");
        for (i = game.correctlyGuessed.length - 1; i >= 0; i--) {
            if (game.correctlyGuessed[i] === z) {
                array.splice(i, 1, z);
            }
        }
        game.hiddenLetters = array.join(" ");
        document.getElementById("spaces").innerHTML = this.hiddenLetters;
    }
}

//When the browser loads, run the gameStart function
window.onload = function () {
    game.gameStart();
}
document.onkeyup = function () {
    var playerChoice = event.key;
    var guessedLetter = playerChoice.toLowerCase();

    for (i = 0; i < game.alphabet.length; i++) {
        if (guessedLetter === game.alphabet[i]) {

            if (game.chosenWordArray.indexOf(guessedLetter) >= 0) {
                for (i = game.chosenWordArray.length - 1; i >= 0; i--) {
                    if (game.chosenWordArray[i] === guessedLetter) {
                        game.chosenWordArray.splice(i, 1);
                        game.showLetter(guessedLetter);
                    }
                }

                console.log(game.correctlyGuessed)
                console.log(game.chosenWordArray)

            }
            else if (guessedLetter === game.alphabet[i] && game.correctlyGuessed.indexOf(guessedLetter) === -1) {
                game.alreadyGuessed.push(guessedLetter);
                game.guessesLeft--;
                document.getElementById("guesses").innerHTML = " " + game.guessesLeft;
                document.getElementById("guessedLetters").innerHTML = " " + game.alreadyGuessed;
                console.log(game.guessesLeft)
                console.log("Here are the guessed letters " + game.alreadyGuessed);
            }
        }

        if (game.chosenWordArray.length === 0 && game.guessesLeft >= 1) {
            setTimeout(function () {
                alert("You Win!")
                game.wins++;
                console.log("You Have Won " + game.wins);
                document.getElementById("winsnumber").innerHTML = " " + game.wins++;
                game.reset();
                return;
            }, 200);


        }
        else if (game.guessesLeft === 0) {
            alert("You Lose!")
            game.losses++;
            document.getElementById("losses").innerHTML = " " + game.losses;
            game.reset();
        }
    }
}

