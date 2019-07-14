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
                res += `<button class="button">${answ}</button>`;
            }
            );
            res += `</div></div>`;
            cont.innerHTML += res;
        });
    }
}

//example data
let quiz = new Quiz("Title of quiz", "Description of quiz");

function init() {
    quiz.addQuestion(new Question("First question", ['A. X', 'B. X', 'C. X', 'D. X'], 2));
    quiz.addQuestion(new Question("Second question", ['A. X', 'B. X', 'C. X', 'D. X'], 1));
    quiz.addQuestion(new Question("Third question", ['A. X', 'B. X', 'C. X', 'D. X'], 0));
    quiz.displayQuestions();

}