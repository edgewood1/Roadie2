
var input_form = $("#input_form")
var choice
var counter = 0

next("09-11-2017")

function next(choice) {
    $.get("/api/posts3/" + choice, function (data) {
        console.log(choice, data)
            next2(choice, data);
    })
}

function next2(choice, data) {
    console.log(choice, data)
    input_form.off("submit").on("submit", 
    function () {next(choice)
})
}
 