//display
var blogContainer = $("#table_body");

//getPosts
var placesObj = {};
var list = []
var id

 



$(function datePicker() {
    $(".datepicker").datepicker({
      dateFormat: 'mm-dd-yy',
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
                    map[obj.place].push(obj.begin_date);
                    newArr.push(obj);
                }
                else if (!map[obj.place].includes(obj.begin_date)) {
                    map[obj.place].push(obj.begin_date);
                    newArr.push(obj);
                }
            }
            console.log(newArr)
            table_creator(newArr);
        });
    } // Function ends-------------------------------------------------------------------------------------------

    function table_creator(newArr) {

        newArr.map(function (item, index, array) {

            // var r = $("<a>").text(item.place + "  " + item.begin_date).attr("id", index).css("font-size", "20px").on("click", holler);
            var row8 = $("<tr>").attr("id", index).click({param: item.begin_date}, holler)
            var row9 = $("<td>").text(item.id);
            var row10 = $("<td>").text(item.place);
            var row11 = $("<td>").text(item.begin_date);
            blogContainer.append(row8)
            $("#" + index).append(row9, row10, row11)

        })


    }

    function holler(e) {
        blogContainer.hide();
       console.log(e.data.param) // this grabs the id in the object
        console.log(this.id);  // this grabs the id of the html
        var id=e.data.param;
        // JSON.stringify(id);
        // var id=this.id
        //x=e.target.id;
        blogContainer.empty();
        $.get("/api/posts3/"+id, function(data) {
            console.log(data)
            $("#place1").text(data[0].place)
            $("#begin").text(data[0].begin_date)
            $("#end").text(data[0].end_date)
        })
     }

});