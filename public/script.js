class Question {
    constructor(text, answers, correctAnswer) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}

class Quiz {
    questions = [];
    constructor(title, description = null) {
        this.correctAnswers = 0;
        this.howManyAnswered = 0;
        this.title = title;
        this.description = description;
    }
    addQuestion(question) {
        this.questions.push(question);
    }
    displayQuestions() {
        let cont = document.getElementById("content");
        cont.innerHTML += `<h2>${this.title}</h2>`;
        if (this.description != null) cont.innerHTML += `<a>${this.description}</a>`;
        this.questions.forEach(function (quest, numberOfQuest) {
            let res = "";
            res += `
            <div class="question" id="quest${numberOfQuest}"><h3>${quest.text}</h3><div class="answers">`;
            quest.answers.forEach(function (answ, i) {
                res += `<button class="button" onclick="tryAnswer(${numberOfQuest}, ${i})">${answ}</button>`;
            }
            );
            res += `</div></div>`;
            cont.innerHTML += res;
        });
    }
}

//example data
let quiz = new Quiz("Programming quiz", "Do you know programming languages?");

function init() {
    quiz.addQuestion(new Question("Which one is an object-oriented language?", ['A. Prolog', 'B. F#', 'C. C#'], 2));
    quiz.addQuestion(new Question("Kotlin is designed to interoperate fully with Java", ['A. True', 'B. False'], 0));
    quiz.addQuestion(new Question("Third question", ['A. X', 'B. X', 'C. X', 'D. X'], 0));
    quiz.displayQuestions();
}


//on click an answer
function tryAnswer(numberOfQuest, numberOfAnswer) {
    if(numberOfAnswer == quiz.questions[numberOfQuest].correctAnswer)
    {
        let res = "";
        quiz.questions[numberOfQuest].answers.forEach(function (answ, i) {
            if(numberOfAnswer == i) res += `<button class="button disabled correctAnswer" disabled>${answ}</button>`;
            else res += `<button class="button disabled" disabled>${answ}</button>`;
        });
        document.getElementById(`quest${numberOfQuest}`).getElementsByClassName("answers")[0].innerHTML = res;
        quiz.correctAnswers++;
    }
    else
    {
        let res = "";
        quiz.questions[numberOfQuest].answers.forEach(function (answ, i) {
            if(numberOfAnswer == i) res += `<button class="button disabled badAnswer" disabled>${answ}</button>`;
            else if(i == quiz.questions[numberOfQuest].correctAnswer) res += `<button class="button disabled correctAnswer" disabled>${answ}</button>`;
            else res += `<button class="button disabled" disabled>${answ}</button>`;
        });
        document.getElementById(`quest${numberOfQuest}`).getElementsByClassName("answers")[0].innerHTML = res;
    }
    quiz.howManyAnswered++;
    if(quiz.howManyAnswered == quiz.questions.length) endOfQuiz();
}
//generate results of quiz
function endOfQuiz()
{
    let percent = Math.round(quiz.correctAnswers/quiz.questions.length*100);
    document.getElementById("content").innerHTML+= `<div class="result">Your Score: ${quiz.correctAnswers}/${quiz.questions.length}<br>${percent}%</div>`;
    window.scrollTo(0,document.body.scrollHeight);
}