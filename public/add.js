let edition = false;
let numberOfQuestions = 0;
let numberOfAnswers = 2;

let questionsDiv;
function init(){
    questionsDiv = document.getElementById("questions");
    addQuestion();
}
function addQuestion()
{
    if(!edition){
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