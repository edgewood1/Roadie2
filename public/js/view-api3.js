// this is the new version - 

//display

var table_body = $("#table_body");
var input_form =$("#cms")

//getPosts
var placesObj = {};
var list = []
var choice
var counter=0
var newArr=[]


$(function datePicker() {
    $(".datepicker").datepicker({
        dateFormat: 'mm-dd-yy',
        showButtonPanel: true
    });
});

// $(document).ready(function () {

    input_form.hide();
    getPosts();

    // 1. Grab all the saved itineraries from the database
    // stick in newArr, which will become a table

    function getPosts() {
 
        $("#title").text("Select a City:")

        $.get("/api/posts/", function (all) {
            // all = all posts in database

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
            // console.log(newArr) == 
            // contains a city with a unique begin_data 
            // this will be displayed in the table below

            // creates the table header - 

            var row5 = $("<th>").text("#")
            var row6 = $("<th>").text("Main Destination")
            var row7 = $("<th>").text("Begin Date")
            $("#header_row").append(row5, row6, row7)
            // table_creator(newArr);
        // }); just removed this

    // }
    //--------------------------
    //  2.  newArr is displayed in the body of the table - 
    //  a list of cities and begin-dates 
    //      if user choses one, the 'begin date' param is passed
    //      to holler function


    // function table_creator(newArr) {



        //loop through the representative objects

        newArr.map(function (item, index, array) {

            // body for table 1

            row8 = $("<tr>").attr("id", index).on("click", { param: item.begin_date }, holler)
            row9 = $("<td>").text(item.id);
            row10 = $("<td>").text(item.place);
            row11 = $("<td>").text(item.begin_date);
            table_body.append(row8)
            $("#" + index).append(row9, row10, row11)
        })

    })
}

    //  here, we take the user's choice begin_date

    function holler(e) {
       
        choice = e.data.param
        console.log(choice)
   
 
        // next(choice)

    // }
    ////////////////-----------------------------------------------


    // function next(choice) {

        //clear the screen

        table_body.empty();
        console.log(choice)
 

        $.get("/api/posts3/" + choice, function (data) {
          
            console.log(data)
        
            next2(data);
        })

 
 
    // }

    function next2(data) {

        console.log(data)


        $("#header_row").empty()
            // title for table 2 
            $("#place1").text(data[0].place)
            $("#begin").text(data[0].begin_date)
            $("#to").text(" to ")
            $("#end").text(data[0].end_date)

            // blogContainer.empty();

           
            // headers for table 2
            var row5 = $("<th>").text("#")
            var row6 = $("<th>").text("Date")
            var row7 = $("<th>").text("Local Attraction")
            var row8 = $("<th>").text("Notes")
            $("#header_row").append(row5, row6, row7, row8)
            // body for table 2



            data.map(function (item, index) {
                // event.stopPropagation()
                row8 = $("<tr>").attr("id", index)
                // .click({ param: item.begin_date }, holler)
                var row9 = $("<td>").text(item.id);
                var row10 = $("<td>").text(item.event_date);
                var row11 = $("<td>").text(item.event_name);
                var row12 = $("<td>").text(item.event_note);
                // var row13 = $("<button>").text("delete").on("click", { param: item.id }, rid)
                table_body.append(row8)
                $("#" + index).append(row9, row10, row11, row12) //row13
            })
            input_form.show()
           
         // })end of get / data
        }
        // input_form=addEventListener("submit", out(choice))
        // input_form.click({ param: choice }, out);
        // input_form.on("on", { param: choice }, out);
        input_form.on("submit", {param: data[0].begin_date}, out)
        // input_form.on("submit", out);
        console.log(choice);
        // if the user submits, then the data sent to handleForm...
        // cms is teh spot on view-update.html where new info is submitted

    
        // $("#cms").on("submit", out);
    // } // end of next
 
    // function rid() {

    // }
    function out(e) {
        choice1 = e.data.param;

        
        console.log("here ", choice1)
        // next2(choice1)
        holler()
    }

    }
// }) // document end