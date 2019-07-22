class Quiz {
    constructor(title = null, description = null) {
        this.questions = [];
        this.correctAnswers = 0;
        this.howManyAnswered = 0;
        this.title = title;
        this.description = description;
    }
    addQuestion(question) {
        this.questions.push(question);
    }
}
class Question {
    constructor(text, answers, correctAnswer) {
        this.text = text;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }
}
let quiz = new Quiz();

let edition = false;
let numberOfQuestions = 0;
let numberOfAnswers = 2;

let questionsDiv;
function init() {
    questionsDiv = document.getElementById("questions");
    addQuestion();
}
function addQuestion() {
    if (!edition) {
        edition = true;
        questionsDiv.innerHTML = "";
        questionsDiv.innerHTML += `<input type="button" onclick="addAnswer()" value="Add next possible answer"><br>`;
        questionsDiv.innerHTML += `Question:<br><input type="text" style="min-width: 40%" id="questionText">`;
        questionsDiv.innerHTML += `<br>The correct answer number: (eg 1):<br> <input type="text" style="width:20%" id="correct">`;
        questionsDiv.innerHTML += `<br>Answer 1: <input type="text" id="answer0">`;
        questionsDiv.innerHTML += `<br>Answer 2: <input type="text" id="answer1">`;

        numberOfQuestions++;
    }
    else alert("Complete the current question!");
}

function addAnswer() {
    questionsDiv.insertAdjacentHTML('beforeend', `<br>Answer ${numberOfAnswers + 1}: <input type="text" id="answer${numberOfAnswers}">`);
    numberOfAnswers++;
}


function isInt(value) {
    let x;
    if (isNaN(value)) {
        return false;
    }
    else {
        return (x = parseFloat(value), (0 | x) === x);
    }
}

function acceptQuestion() {
    if (edition) {
        if (document.getElementById("questionText").value == "") alert("The content of question can not be empty");
        else if (!isInt(document.getElementById("correct").value)) alert("Incorrect value of correct answer");
        else if (document.getElementById("correct").value > numberOfAnswers || document.getElementById("correct").value <= 0) alert("Incorrect number of correct answer");
        else {
            let error = false;
            for (let i = 0; i < numberOfAnswers; i++) if (document.getElementById("answer" + i).value == "") error = true;
            if (error) alert("All answers must be completed");
            else {
                let arr = [];
                for (let i = 0; i < numberOfAnswers; i++)
                    arr.push(document.getElementById("answer" + i).value);
                quiz.addQuestion(new Question(document.getElementById("questionText").value, arr, Number.parseInt(document.getElementById("correct").value) - 1));
                numberOfAnswers = 2;
                edition = false;
                questionsDiv.innerHTML = "";
            }

        }

    }
}