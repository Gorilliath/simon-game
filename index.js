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

$("h1").on("click", function () {
    animatePress(this);
});

$(".btn").on("click", function () {
    animatePress(this);
    playSound($(this).prop("id"));
});
