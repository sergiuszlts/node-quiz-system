function isInt(value) {
    let x;
    if (isNaN(value)) {
        return false;
    }
    else {
        return (x = parseFloat(value), (0 | x) === x);
    }
}

class Validator {
    constructor(obj) {
        this.obj = obj;
        this.correct = true;
        this.err = "";
    }
    start() {
        if (this.obj.title == "" || this.obj.description == "") {
            this.err = "Empty title or description";
            this.correct = false;
        }
        else if (this.obj.correctAnswers != 0 || this.obj.howManyAnswered != 0) {
            this.err = "Incorrect object structure";
            this.correct = false;
        }
        else if (this.obj.questions.length < 1) {
            this.err = "Empty questions array";
            this.correct = false;
        }
        else {
            this.obj.questions.forEach(question => {
                if (question.text == "" || !isInt(question.correctAnswer)) {
                    this.err = "Incorrect question";
                    this.correct = false;
                }
                else if (question.correctAnswer > question.answers.length - 1 || question.correctAnswer < 0) {
                    this.err = "Incorrect number of correct answer";
                    this.correct = false;
                }
                else {
                    question.answers.forEach(ans => {
                        if (ans == "") {
                            this.err == "One of answers is empty";
                            this.correct = false;
                        }
                    });
                }
            });
        }
    }
}


module.exports = Validator;