let question = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.answer')
let statistics = document.querySelector(".statistics")
let container_start = document.querySelector(".container_start")
let container_main = document.querySelector('.container_main')
let btn = document.querySelector('.start_btn')

let musicControl = document.getElementById('music-control');
let musicIcon = document.getElementById('music-icon');
let audio = document.querySelector('.backgroundMusic');



function randint(min,max){
    return Math.round(Math.random()*(max-min)+min)
}

let signs = ['+','-','*', '/']

function getRandomSign(){
    return signs[randint(0,3)]
}

class Question{
    constructor(){
        let a = randint(1,20)
        let b = randint(1,20)
        let sign = getRandomSign()    
        this.question = `${a} ${sign} ${b}`
        if (sign == '+') {this.answer_correct = a+b}
        else if (sign == '-'){this.answer_correct = a-b}
        else if (sign == '*') {this.answer_correct = a*b}
        else if (sign == '/'){this.answer_correct = a/b} 
this.answers = [
            this.answer_correct,
            randint(this.answer_correct - 5, this.answer_correct +10),
            randint(this.answer_correct - 7, this.answer_correct +5),
            randint(this.answer_correct + 2, this.answer_correct -3),
            randint(this.answer_correct + 5, this.answer_correct -3 ),
        ];
         shuffleArray(this.answers);
    }
    display(){
        question.innerHTML =  this.question
        for(let i=0; i<5; i+=1){
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}


let correct_answers_given
let total_answers_given 
let current_question
btn.addEventListener('click', function(){
    container_main.style.display="flex"
    container_start.style.display="none"
    current_question= new Question()
    current_question.display()
    correct_answers_given=0
    total_answers_given=0
    setTimeout(function(){
    statistics.innerHTML = `Ви дали ${correct_answers_given} правильних відповідей із ${total_answers_given}`
    container_main.style.display="none"
    container_start.style.display="flex"
}, 6000)
})


for (let i = 0; i < 5; i += 1){
    answer_buttons[i].addEventListener("click", function(){
        if ( answer_buttons[i].innerHTML == current_question.answer_correct){
          correct_answers_given +=1
          total_answers_given+=1
          answer_buttons[i].style.background = "#11FD58"
          anime({
            targets:answer_buttons[i],
            background: "#ffffff",
            duration:500,
            easing: "linear"
          })
        }else{
            total_answers_given+=1
            answer_buttons[i].style.background = "#EE0D0D"
            anime({
            targets:answer_buttons[i],
            background: "#ffffff",
            duration:500,
            easing: "linear"
          })
        }
        current_question= new Question()
        current_question.display()
    })
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
}


musicControl.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();
        musicIcon.src = 'volume_up.png';
    } else {
        audio.pause();
        musicIcon.src = 'volume_off.png';
    }
});
