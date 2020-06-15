$(document).ready(function () {
    console.log(moment())
    // moment object
    var m = moment()
    var today = m.format("LL")
    var workHours = [m.startOf('day').add(9, 'hours').format("LT"),m.startOf('day').add(10, 'hours').format("LT"),m.startOf('day').add(11, 'hours').format("LT"),m.startOf('day').add(12, 'hours').format("LT"),m.startOf('day').add(13, 'hours').format("LT"),m.startOf('day').add(14, 'hours').format("LT"),m.startOf('day').add(15, 'hours').format("LT"),m.startOf('day').add(16, 'hours').format("LT"),m.startOf('day').add(17, 'hours').format("LT")]
    
    // placeholder for task lists
    var tasks = [["task1","task2","some other task "],["wow a task","omg another"],[],[],[],[],[]]
    
    console.log(tasks[0][0])
    // var for today display
    var todayDisplay = $("#today")
    // ident task list (ul)
    var taskList = $("#task-list")

    //initialize check for existing tasks
    // init();

    
    function renderWorkHours() {
            // loop through for each hour of the work day
    for (i = 0; i < workHours.length-1; i++) {
        console.log(workHours[i])
     //  create a new link 
     var a = $("<a>")
     // add classes to the anchor tag.
     a.addClass("list-group-item list-group-item-action");
     
     // create a new div to go inside the new anchor tag
     var newDiv = $("<div>")
     // add classes to the div
     newDiv.addClass("d-flex w-100 justify-content-between")
 
     // create List group item heading to append to the div
     h5 = $("<h5>")
     // add classes to the heading
     h5.addClass("mb-1")
     //add text to the list item
     h5.text("")
     
     // create new small
     small = $("<small>")
     // add text to the list item
     small.text(workHours[i] + " - " + workHours[i+1] )
 
     // append the header and small to the the div and then the div to the anchor
     h5.appendTo(newDiv)
     small.appendTo(newDiv);
     newDiv.appendTo(a)
 
     // lastly append the div to the work hour container
     a.appendTo("#workHourContainer")
     
    
     // create a new ul as placeholder for tasks
     var ul = $("<ul>")
     // add class
     ul.addClass("mb-1")
     // add some text
     ul.attr("time-block", + i);
     ul.appendTo(a)
 
            // Clear task list
            taskList.html("")
            // Render a new li for each task in each time block
            for (var j = 0; j < tasks[i].length; j++) {
            var task = tasks[i][j];
            // Create a new list item for each work hour
            var li = $("<li>");
            li.text(tasks[i][j]);
            li.attr("data-index", j)
            // create a delete button for the item
            var button = $("<button>")
            // add text to the button
            button.text("Delete")
            // append the button to the current task
            button.appendTo(li)
            // append the task li to the time-block
            li.appendTo(ul);
            }
    }
    }
    renderWorkHours()
    
    todayDisplay.text(today)
    
    // check for existing tasks
        // if they exist load them
        // else if they don't - do nothing
    
        
    // populate each task (if saved)


    // Check for existing entires
    function init() {
        // Get stored tasks from localStorage
        // Parsing the JSON string to an object
        var storedTasks = JSON.parse(localStorage.getItem("tasks"));
      
        // If tasks are retrieved from localStorage, update the task array
        if (storedTodos !== null) {
          tasks = storedtasks;
        }
      
        // Render tasks to the DOM
        renderWorkHours()
    }

    // when a timeblock is selected
    $("a").on("click", function () {
        console.log(this)
    });

    function storeTask() {
        // Stringify and set "todos" key in localStorage to todos array
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }


});