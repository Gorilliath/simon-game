function animatePress(element) {
    $(element).addClass("pressed");
    setTimeout(() => {
        $(element).removeClass("pressed");
    }, 300);
}

$(".btn").on("click", function () {
    animatePress(this);
});
