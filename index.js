const possibleMoves = ["green", "red", "yellow", "blue"];
let gameInProgress = false;
let targetMoves = [];
let playerMoves = [];

function animatePress(element) {
    $(element).addClass("pressed");
    setTimeout(() => {
        $(element).removeClass("pressed");
    }, 300);
}

function playSound(sound) {
    sound = new Audio(`sounds/${sound}.mp3`);
    sound.play();
}

function startGame() {
    if (gameInProgress) return;

    gameInProgress = true;
    targetMoves = [];
    playerMoves = [];
    setTimeout(nextMove, 1000);
}

function nextMove() {
    if (!gameInProgress) return;

    // Randomly select the next target move
    const num = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves[num];
    targetMoves.push(move);

    // Update the title to indicate what level the player is on
    $("#level-title").text(`Level ${targetMoves.length}`);

    // Indicate the next move on the UI
    animatePress($(`#${move}`));
    playSound(move);

    // Clear the player moves ready for their input
    playerMoves = [];
}

function evaluatePlayerMove(move) {
    if (!gameInProgress) return;

    // Record the player's latest move
    playerMoves.push(move);

    // If the player's move doesn't match the corresponding target move end the game
    if (
        playerMoves[playerMoves.length - 1] !==
        targetMoves[playerMoves.length - 1]
    ) {
        gameOver();
        return;
    }

    // If the player's move was for the latest target move generate a the next target move
    if (playerMoves.length === targetMoves.length) setTimeout(nextMove, 1000);
}

function gameOver() {
    $("#level-title").text("Gameover! Press here to play again!");

    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");
    }, 300);

    playSound("wrong");

    gameInProgress = false;
}

$("h1").on("click", function () {
    animatePress(this);
    startGame();
});

$(".btn").on("click", function () {
    animatePress(this);
    playSound($(this).prop("id"));

    evaluatePlayerMove($(this).prop("id"));
});
