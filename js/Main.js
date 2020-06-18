$(document).ready(function () {
    // moment object
    var m = moment.parseZone()
    var today = moment.parseZone()
    // arrays for working hours 9-5 formatted for in LT and military time
    var workHours = [m.startOf('day').add(9, 'hours').format("hh:mm a"),m.startOf('day').add(10, 'hours').format("hh:mm a"),m.startOf('day').add(11, 'hours').format("hh:mm a"),m.startOf('day').add(12, 'hours').format("hh:mm a"),m.startOf('day').add(13, 'hours').format("hh:mm a"),m.startOf('day').add(14, 'hours').format("hh:mm a"),m.startOf('day').add(15, 'hours').format("hh:mm a"),m.startOf('day').add(16, 'hours').format("hh:mm a"),m.startOf('day').add(17, 'hours').format("hh:mm a"),m.startOf('day').add(18, 'hours').format("hh:mm a")]
    var workHoursHH = [m.startOf("day").add(9,"hours").format("HH"),m.startOf("day").add(10,"hours").format("HH"),m.startOf("day").add(11,"hours").format("HH"),m.startOf("day").add(12,"hours").format("HH"),m.startOf("day").add(13,"hours").format("HH"),m.startOf("day").add(14,"hours").format("HH"),m.startOf("day").add(15,"hours").format("HH"),m.startOf("day").add(16,"hours").format("HH"),m.startOf("day").add(17,"hours").format("HH"),m.startOf("day").add(18,"hours").format("HH")]

// var for today display
     var todayDisplay = $("#today")
    todayDisplay.text(today)
    // placeholder for task lists

    // ident task list 
    var taskList = $("#taskList")

    // array for tasks
    var tasks = {
        timeBlks : [" "," "," "," "," "," "," "," "," "],
    }
    
    // initialize check for existing tasks then check for existing entires
    function init() {
        // Get stored tasks from localStorage
        // Parsing the JSON string to an object
        var storedTasks = JSON.parse(localStorage.getItem("tasks"));
         
        // If tasks are retrieved from localStorage, update the task array
        if (storedTasks !== null) {
            tasks = storedTasks;
        } else{
            // save a placeholder for the tasks list
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        // Render tasks to the DOM
        renderWorkHours()
    }

    init();

    function renderWorkHours() {
        // first clear out the tasklist
        taskList.empty()
            // loop through for each hour of the work day
            for (i = 0; i < workHours.length-1; i++) {
            //  create new div 
            var newDiv = $("<div>")
            // add class to the new div
            newDiv.addClass("row time-block")
            // next add a label for the time block
            var label = $("<label>")
            // add class to the label
            label.addClass("description")
            // now add text to the label
            label.text(workHours[i] + " - " + workHours[i+1])
            // now we add a textarea
            var textArea = $("<textarea>")
            textArea.attr("id", "txt"+i)
            // add information to the textarea
            var thisTask = tasks.timeBlks[i]
            // if text-block date value you is less than current time add the past class to the textarea
            if ((workHoursHH[i] < today.format("HH"))) {
                // add the past style to the task
                textArea.addClass("past")
                textArea.text("Time to complete this task has passed, try again tomorrow.")
            }
            // if current text-block value is greater than today add future class to the textarea
            else if ((workHoursHH[i] > today.format("HH"))) {
                // add future class task to the time-block
                textArea.addClass("future")
                // add the task to the time-block
                textArea.text(thisTask)
            }
            // if the the current text-block value is between the current time add the present class to the textarea
            else if (workHoursHH[0] = today.format("HH")) {
                textArea.addClass("present")
                textArea.text(thisTask)
            }
            
            // now we add the button
            var button = $("<button>");
            button.addClass("saveBtn");
            button.text("Save");
            button.attr("data-value", i)
            button.attr("type", "submit");
            // append the created elements to the new div
            label.appendTo(newDiv);
            textArea.appendTo(newDiv);
            button.appendTo(newDiv);
            // append the div to the taskList
            newDiv.appendTo(taskList)


            }

    }
    
    function storeTask() {
        // Stringify and set "tasks" key in localStorage to TASKS array
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }   


 $(".time-block").submit(function (e) { 
     e.preventDefault();
     
 });

    // when the save button is clicked
    $(".saveBtn").click(function (e) { 
        e.preventDefault();
        // get the value of the current button you selected
        var timeBlock  = $(this).attr("data-value");
        console.log(timeBlock)

        // get the current val of the textarea for that
        var areaVal = $("#txt"+timeBlock).val().trim()
        console.log(areaVal)

        // first remove the current val in the time block from the stored array
        // then, store the new task value in the task array.
        tasks.timeBlks.splice((timeBlock),1,(areaVal))
        console.log(tasks.timeBlks[timeBlock])

        // store the task list
        storeTask();
        // refresh the dom so the clicking the save button event can happen multiple times
        document.reload()
    });
  


});