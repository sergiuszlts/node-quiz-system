Quiz system
========
This is a simple system for creating and solving quizzes.
-----------
Database structure:
* **_id** - standard id (unused in the project)
* **title** - title of the quiz
* **description** - a brief description of what the quiz is about
* **questions** - array
* **id** - int used to distinguish quizzes

Structure of **questions** array:
* **text** - the content of the question
* **answers** - array of possible answers (array of strings)
* **correctAnswer** - number of correct answer