//display
var blogContainer = $("#table_body");

//getPosts
var placesObj = {};
var list = []
var id
var current
$(function datePicker() {
    $(".datepicker").datepicker({
        dateFormat: 'mm-dd-yy',
        showButtonPanel: true
    });
});

$(document).ready(function () {

//addmore is the new entry space

    $("#addMore").hide();

    getPosts();

    // 1. Grab all the saved itineraries from the database

    function getPosts() {

        $("#title").text("Select a City:")

        $.get("/api/posts/", function (all) {
            // all = all posts in database

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
            // console.log(newArr) == 
            // contains representative objects - begin_date represented only once

            // creates the table header - 

            var row5 = $("<th>").text("#")
            var row6 = $("<th>").text("Main Destination")
            var row7 = $("<th>").text("Begin Date")
            $("#header_row").append(row5, row6, row7)
            table_creator(newArr);
        });
    } 
//--------------------------
//  2.  Set up the table and populate with data
//      if user choses one, the 'begin date' param is passed
//      to holler function
 

    function table_creator(newArr) {

        //loop through the representative objects

        newArr.map(function (item, index, array) {

            // body for table 1

            row8 = $("<tr>").attr("id", index).click({ param: item.begin_date }, holler)
            row9 = $("<td>").text(item.id);
            row10 = $("<td>").text(item.place);
            row11 = $("<td>").text(item.begin_date);
            blogContainer.append(row8)
            $("#" + index).append(row9, row10, row11)
        })
    }

//----------------------------
//   3.  This queries the users selection
//      displays the itinerary --  
//      e is the 'begin-date' chosen
 
 
    function holler(e) {
        event.stopPropagation()
        // e.stopImmediatePropagation()
        // blogContainer.hide();
        blogContainer.empty();
        // console.log(this.id);  // this grabs the id of the html
     
            console.log(e.data.param) // this grabs the id in the object
        id = e.data.param;
       next(id);
    }

    /////////////////////////////////////
     function next(id) {
        // this call grabs the specific data for final itinerary
console.log("yay")
        $.get("/api/posts3/" + id, function (data) {

            // title for table 2 
            current=data[0].begin_date;
            $("#place1").text(data[0].place)
            $("#begin").text(data[0].begin_date)
            $("#to").text(" to ")
            $("#end").text(data[0].end_date)
            blogContainer.empty();

            // header for table 2

            $("#header_row").empty()

            var row5 = $("<th>").text("#")
            var row6 = $("<th>").text("Date")
            var row7 = $("<th>").text("Local Attraction")
            var row8 = $("<th>").text("Notes")
            $("#header_row").append(row5, row6, row7, row8)
            // table_creator(newArr);

            // body for table 2

            data.map(function (item, index) {
// event.stopPropagation()
                row8 = $("<tr>").attr("id", index)
                // .click({ param: item.begin_date }, holler)
                var row9 = $("<td>").text(item.id);
                var row10 = $("<td>").text(item.event_date);
                var row11 = $("<td>").text(item.event_name);
                var row12 = $("<td>").text(item.event_note);
                var row13 = $("<button>").text("delete").click({ param: item.id }, rid)
                blogContainer.append(row8)
                $("#" + index).append(row9, row10, row11, row12, row13)
            })

            //this displays the user input - 

            $("#addMore").show()
            
            // if the user submits, then the data sent to handleForm...
            // cms is teh spot on view-update.html where new info is submitted
            
            $("#cms").on("submit", handleFormSubmit);


            // 4 This function does an API call to delete posts
            function rid(e) {
                console.log(e.data.param)
                $.ajax({
                    method: "DELETE",
                    url: "/api/posts2/" + e.data.param
                }).then(function () {
                    console.log("We delete");
                    // getPosts(postCategorySelect.val());
                    //   window.location.href = "/add";
                    holler(e)
                });
            }

                // 5. This will submit post to database

            function handleFormSubmit() {
                event.preventDefault();
                event.stopPropagation();
                // event.stopImmediatePropagation()
                // Constructing a newPost object to hand to the database
                newPost = {

                    place: data[0].place,
                    begin_date: data[0].begin_date,
                    end_date: data[0].end_date,
                    event_note: $("#event_note").val(),
                    event_date: $("#event_date").val(),
                    event_name: $("#event_name").val()
                }
            //     poster(newPost, e);
            // }
            // function poster(newPost, e) {

                $.post("/api/posts", newPost, function () {
                    //   window.location.href = "javascript:window.location.reload();";
                    // createNewRow(post);
                    event.stopPropagation()
                    // holler goes back to display the itineray with addition
                    newPost={};
                    // console.log(e)
                    // counter++;
                    // holler(e.data.param)
                    // if (e.data.param) {
                    //     id=e.data.param }
console.log(current)
                   next(current)
                })
            }
            
        })
    }
});