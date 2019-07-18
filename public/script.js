let quiz;

function init()
{
    let toFetch = "../json/";
    let str = window.location.href;
    let pieces = str.split(/[\s/]+/);
    let id = pieces[pieces.length-1];
    if(!isNaN(parseInt(id))) toFetch += id;
    else toFetch += 1; //default quiz
    fetch(toFetch)
    .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        quiz = res;
        displayQuestions();
    })
}

//onClick an answer
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

function displayQuestions() {
    let cont = document.getElementById("content");
        cont.innerHTML += `<h2>${quiz.title}</h2>`;
        if(quiz.description != null) cont.innerHTML += `<a>${quiz.description}</a>`;
        quiz.questions.forEach(function(quest, numberOfQuest) {
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