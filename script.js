let scoreEl = document.getElementById('score');

let timeLeftEl = document.getElementById('timeLeft');

let startNewGameButton = document.getElementById('startNewGame');

let pauseGameButton = document.getElementById('pauseGame');

let squares = document.querySelectorAll('.square');

let grid =  document.getElementsByClassName('grid')[0];

let gameMusic = new Audio('./assests/gameMusic.mp3');

let hitMusic = new Audio('./assests/hitMusic.mp3');


let score=0;
let timeLeft=0;
let hitPosition= null;
let timerId = null;
let randomMoleId = null;

//randomly place mole
function randomMole(){
    squares.forEach(square => {
        square.classList.remove("mole");
    })

    let randomSqaure = squares[Math.floor(Math.random()*squares.length)];
    randomSqaure.classList.add('mole')
    hitPosition = randomSqaure.id;
}

function countDown(){
    timeLeft--;
    timeLeftEl.innerHTML = `Time Left: ${timeLeft}`;
    if(timeLeft===0)
    {
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        gameMusic.currentTime = 0;
        grid.style.display="none";
        pauseGameButton.style.display="none";   
        timeLeftEl.style.display="none";
    }
}
randomMole();

function startGame(){
    score=0;
    timeLeft=60;
    scoreEl.innerHTML = "Your score: 0";
    timeLeft.innerHTML = "Time Left: 60"; 
    pauseGameButton.style.display="inline";
    grid.style.display="grid";
    pauseGameButton.innerHTML='Pause';
    window.scrollTo(0, document.body.scrollHeight);
    gameMusic.play();
    //callback function
    //setinterval call function at regular interval
  timerId =  setInterval(randomMole,1000);
randomMoleId = setInterval(countDown,1000);
}

function pauseResumeGame(){
    if(pauseGameButton.textContent === 'Pause'){
        gameMusic.pause();
        clearInterval(timerId);
        clearInterval(randomMoleId);
        timerId= null;
        randomMoleId=null;
pauseGameButton.textContent = 'Resume';
}
else{
    gameMusic.play();
    timerId =  setInterval(randomMole,1000);
    randomMoleId = setInterval(countDown,1000);
    pauseGameButton.textContent = 'Pause';
}
}



squares.forEach(square =>{
    square.addEventListener('mousedown',()=> {
        if(timerId !== null)
        {
        if(square.id === hitPosition)
        {
            hitMusic.play();
            setTimeout(()=> {
                hitMusic.pause()
            },1000);
            score++;
            scoreEl.innerHTML = `Your score: ${score}`;
            hitPosition = null;
                }
                    }
    });
})
startNewGameButton.addEventListener('click',startGame);

pauseGameButton.addEventListener('click', pauseResumeGame);