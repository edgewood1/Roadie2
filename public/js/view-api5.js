// this is the new version - 

//display

var table_body = $("#table_body");
var input_form = $("#input_form")

//getPosts
var placesObj = {};
var list = []
var choice
var counter = 0
var newArr = []


$(function datePicker() {
    $(".datepicker").datepicker({
        dateFormat: 'mm-dd-yy',
        showButtonPanel: true
    });
});

// $(document).ready(function () {

input_form.hide();
getPosts();


function getPosts() {

    $("#title").text("Select a City:")

    $.get("/api/posts/", function (all) {


        var map = new Map();
        var len = all.length;

        newArr = [];

        for (i = 0; i < len; i++) {
            var obj = all[i];

            if (map[obj.place] === undefined || map[obj.place] === null) {
                map[obj.place] = [];
                map[obj.place].push(obj.begin_date);
                newArr.push(obj);
            }
            else if (!map[obj.place].includes(obj.begin_date)) {
                map[obj.place].push(obj.begin_date);
                newArr.push(obj);
            }
        }


        // var row5 = $("<th>").text("#")
        var row6 = $("<th>").text("Main Destination")
        var row7 = $("<th>").text("Begin Date")
        $("#header_row").append(row6, row7)


        newArr.map(function (item, index, array) {

            // body for table 1

            row8 = $("<tr>").attr("id", index).on("click", { param: item.begin_date }, holler)
            // row9 = $("<td>").text(item.id);
            row10 = $("<td>").text(item.place);
            row11 = $("<td>").text(item.begin_date);
            table_body.append(row8)
            $("#" + index).append(row10, row11)
        })

    })
}

/////////////////////////////////////////////////////////

// this is for the first time round
function holler(e) {
    // e.preventDefault();
    e.stopPropagation();
    choice = e.data.param
    console.log(choice)
    next(choice);


}
//this if we already know choice
function next(choice) {

  

    table_body.empty();
    console.log(choice)

    $.get("/api/posts3/" + choice, function (data) {
    

        console.log(data, choice)

        next2(choice, data);




    })
}

function next2(choice, data) {
    
    console.log(data)
    console.log(choice)

    $("#header_row").empty()
    // title for table 2 
    $("#place1").text(data[0].place)
    $("#begin").text(data[0].begin_date)
    $("#to").text(" to ")
    $("#end").text(data[0].end_date)

    // blogContainer.empty();


    // headers for table 2
    // var row5 = $("<th>").text("#")
    var row6 = $("<th>").text("Date")
    var row7 = $("<th>").text("Local Attraction")
    var row8 = $("<th>").text("Notes")
    $("#header_row").append(row6, row7, row8)
    // body for table 2



    data.map(function (item, index) {
        // event.stopPropagation()
        row8 = $("<tr>").attr("id", index)
        // .click({ param: item.begin_date }, holler)
        // var row9 = $("<td>").text(item.id);
        var row10 = $("<td>").text(item.event_date);
        var row11 = $("<td>").text(item.event_name);
        var row12 = $("<td>").text(item.event_note);
        // var row13 = $("<button>").text("delete").on("click", { param: item.id }, rid)
        var row13 = $("<button>").text("delete").on("click", 
            function() {
                $.ajax({
                    method:"DELETE", 
                    url: "/api/posts2/"+ item.id
                }).then(function(){
                    console.log(choice)
                    next(choice)
                })
            })
                
        table_body.append(row8)
        $("#" + index).append(row10, row11, row12, row13) 
    })
    input_form.show()

    // })end of get / data

    input_form.off("submit").on("submit", 
    
    function () {
        counter++
        console.log(counter)
        next(choice)
})
 
}


    // }
// }) // document end