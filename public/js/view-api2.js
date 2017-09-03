//display
var blogContainer = $("#container");
//getPosts
var placesObj = {};
var list = []
var id



$(function datePicker() {
    $(".datepicker").datepicker({
        showButtonPanel: true

    });
});


$(document).ready(function () {



    $("#addMore").hide();

    // 
    // 

    getPosts();

    // VIEW-UPDATE.HTML

    // 1. GET LIST OF ALL CITIES AND THEIR BEGIN_DATE
    // Display a list of cities; user will pick one which will move user to function 2

    function getPosts() {

        $("#title").text("Select a City:")

        $.get("/api/posts/", function (all) {
            console.log(all)

            var map = new Map();
            var len = all.length;
            var newArr = [];

            for (i = 0; i < len; i++) {
                var obj = all[i];

                if (map[obj.place] === undefined || map[obj.place] === null) {
                    map[obj.place] = [];
                    map[obj.place].push(obj.begin);
                    newArr.push(obj);
                }

                else if (!map[obj.place].includes(obj.begin)) {
                    map[obj.place].push(obj.begin);
                    newArr.push(obj);
                }
            }
            console.log(newArr)
            table_creator(newArr);


        });

        // test shows chapel hill: 4/17, 4/20
        //  console.log(placesObj);

    } // Function ends-------------------------------------------------------------------------------------------

    function table_creator(newArr) {
        // var row0 = $("<container>").addClass("col-md-offset-1").addClass("col-sm-1");

        var row1 = $("<table>").addClass("col-md-offset-1").addClass("col-sm-2").addClass("table table-hover");
        // var line = $("<a>").text(item).attr("id", i).css("font-size", "20px").on("click", holler);
        // row.append(line);
        // row0.append(row1)
        var row2 = $("<thead>");
        row1.append(row2);
        var row3 = $("<tr>")
        row2.append(row3);
        var row4 = $("<th>").text("#");
        row3.append(row4);
        var row5 = $("<th>").text("Site");
        row3.append(row5);
        var row6 = $("<th>").text("Date");
        row3.append(row6);
        var row7 = $("<tbody>");
        var row8 = $("<tr>")
        row2.append(row7);
        row7.append(row8)
        newArr.map(function (item, index, array) {

            // var row8 = $("<div>").addClass("col-md-offset-1").addClass("col-sm-2");
            // var r = $("<a>").text(item.place + "  " + item.begin_date).attr("id", index).css("font-size", "20px").on("click", holler);

            var row9 = $("<th>")
            var row10 = $("<td>").text(item.place);
            var row11 = $("<td>").text(item.begin_date);
            var row12 = $("<tr>")
            row9.append(row10);
            row9.append(row11)
            row9.append(row12)
            blogContainer.append(row9);

        })
        blogContainer.append(row3)

    }

    function holler() { }

});