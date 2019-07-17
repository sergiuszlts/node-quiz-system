function initial() {
    fetch("/load-json-all")
        .then(function (response) {
            return response.json();
        })
        .then(function (res) {
            display(res);
        }).catch(function (error) {
            document.getElementById("content").innerHTML = "<h4>An error occured :(</h4>";
        });
}

function display(res) {
    let cont = document.getElementById("content");
    res.forEach(quiz => {
        cont.innerHTML += `<div class="quizlink"><button class="button buttonfull" onclick="window.location.href='/quiz/${quiz.id}'"><h4>${quiz.title}</h4> ${quiz.description}</button></div>`;
    });
}