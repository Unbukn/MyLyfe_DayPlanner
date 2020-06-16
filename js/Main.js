$(document).ready(function () {
    console.log(moment())
    // moment object
    var m = moment()
    var today = m.format("hh:mm")
    var workHours = [m.startOf('day').add(9, 'hours').format("hh:mm"),m.startOf('day').add(10, 'hours').format("hh:mm"),m.startOf('day').add(11, 'hours').format("hh:mm"),m.startOf('day').add(12, 'hours').format("hh:mm"),m.startOf('day').add(13, 'hours').format("hh:mm"),m.startOf('day').add(14, 'hours').format("hh:mm"),m.startOf('day').add(15, 'hours').format("hh:mm"),m.startOf('day').add(16, 'hours').format("hh:mm"),m.startOf('day').add(17, 'hours').format("hh:mm")]
     // var for today display
     var todayDisplay = $("#today")
    todayDisplay.text(today)
    // placeholder for task lists
    console.log(today)
    // ident task list 
    var taskList = $("#taskList")

    // initialize check for existing tasks
    init();
    
    function renderWorkHours() {
        // clear out the taskLisk
        taskList.empty()
            // loop through for each hour of the work day
            for (i = 0; i < workHours.length-1; i++) {
            // console.log(workHours[i])
            //  create new div 
            var newDiv = $("<div>")
            // add class to the new div
            newDiv.addClass("row time-block")
            // next add a label for the time block
            var label = $("<label>")
            // add class to the label
            // label.addClass("description")
            // now add text to the label
            label.text(workHours[i] + " - " + workHours[i+1])
            // now we add a textarea
            var textArea = $("<textarea>")
            // add attr to the textarea

            // if text-block date value you is less than current time add the past class to the textarea
            if (workHours[i+1] > today == true) {
                textArea.addClass("past")
            }
            // if current text-block value is greater than today add future class to the textarea
            else if (today > workHours[i] == true) {

                textArea.addClass("future")
            }
            // if the the current text-block value is between the current time add the present class to the textarea
            else if (workHours[i+1] > today && today > workHours[i] == true) {
                textArea.addClass("present")
            } 
            textArea.attr("cols", 50)
            // now we add the button
            var button = $("<button>")
            button.addClass("saveBtn")
            button.text("Save")
            button.attr("type", "submit")
            // append the created elements to the new div
            label.appendTo(newDiv);
            textArea.appendTo(newDiv);
            button.appendTo(newDiv);
            // append the div to the taskList
            newDiv.appendTo(taskList)
            }

    }

    // Check for existing entires
    function init() {
        // Get stored tasks from localStorage
        // Parsing the JSON string to an object
        var storedTasks = JSON.parse(localStorage.getItem("tasks"));
      
        // If tasks are retrieved from localStorage, update the task array
        if (storedTasks !== "") {
          tasks = storedTasks;
        }
      
        // Render tasks to the DOM
        renderWorkHours()
        storeTask()
    }
    function storeTask() {
            // Stringify and set "todos" key in localStorage to todos array
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    // when a timeblock is selected
    $("textarea").on("click", function () {
        // console.log(this.value)
    });

    // // when the save button is clicked
    // $(selector).submit(function (e) { 
    //     e.preventDefault();

    //     var TaskText = TaskInput.value.trim();
      
    //     // Return from function early if submitted task is blank
    //     if (TaskText === "") {
    //       return;
    //     }
      
    //     // Add new TaskText to Tasks array, clear the input
    //     Tasks.push(TaskText);
    //     TaskInput.value = "";
      
    //     // Store updated Tasks in localStorage, re-render the list
    //     storeTasks();
    //     renderTasks();
        
    // });
  


});