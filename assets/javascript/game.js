
var game = {
    alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    word: ["ruby", "mongodb", "javascript", "python", "html", "css"],
    answer: "",
    guessesLeft: 9,
    chosenWordArray: [],
    alreadyGuessed: [],
    correctlyGuessed: [],
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
        for (i = 0; i < this.answer.length; i++) {

        }
        this.randomWord();
        console.log(this.chosenWordArray);
    },

    reset: function () {
        this.answer = "",
        this.guessesLeft = 9,
        this.chosenWordArray = [],
        this.correctlyGuessed = [],
        this.alreadyGuessed = [],
        this.gameStart();
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
                for(i = game.chosenWordArray.length - 1; i >= 0; i--) {
                    if(game.chosenWordArray[i] === guessedLetter) {
                        game.chosenWordArray.splice(i, 1);
                    }
                }
                
                console.log(game.correctlyGuessed)
                console.log(game.chosenWordArray)

            }
            else if (guessedLetter === game.alphabet[i] && game.correctlyGuessed.indexOf(guessedLetter) === -1) {
                game.alreadyGuessed.push(guessedLetter);
                game.guessesLeft--;
                console.log(game.guessesLeft)
                console.log("Here are the guessed letters " + game.alreadyGuessed);
            }
        }

        if (game.chosenWordArray.length === 0 && guessesLeft >= 1) {
            alert("You Win!")
            game.wins++;
            console.log(game.wins);
            game.reset();
        }
        else if(game.guessesLeft === 1 && game.chosenWordArray.length != 0) {
            console.log("You Lose")
        } 
    }
}

