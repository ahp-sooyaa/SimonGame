var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [], 
    userClickedPattern = [], 
    level = 0, 
    started = false;

$(document).on('keypress',function() {
    if(!started) {
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length) {
            setTimeout(() => nextSequence(), 1000);
            userClickedPattern = [];
        }
    } else {
        gameOver();
    }
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    gamePattern.push(randomChosenColor);

    level++;
    $('#level-title').html('Level ' + level);
}

$('.btn').on('click', function() {
    if(started) {
        var userChosenColor = $(this).attr('id');
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);
        playSound(userChosenColor);

        checkAnswer(userClickedPattern.length-1);
    }
})

function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

function gameOver() {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(() => $('body').removeClass('game-over'), 200);
    $('#level-title').html('Game Over, Press Any Key to Restart');
    startOver();
}

function animatePress(currentcolor) {
    $('#' + currentcolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $('#' + currentcolor).addClass('pressed');
    setTimeout(
        () => $('#' + currentcolor).removeClass('pressed')
    , 100)
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}