
      // JavaScript for the Todo Application
      let tasks = [];
      let today = new Date();

      // Function to add a new task to the tasks array
      function addTask(event) {
        event.preventDefault();
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let date = new Date(document.getElementById("date").value);
        let form = document.getElementById("newTaskForm");

        if(title=="" || description=="" || date==""){
          alert("Kindly input all values pls");
        }else{
           
            let task = {
              title: title,
              description: description,
              date: date,
              status: "uncompleted"
            };
            tasks.push(task);
            displayTasks();
            form.reset();
        }
      
      }

      // Function to update a task
      function updateTask(index) {
        let title = prompt("Update task title:");
        let description = prompt("Update task description:");
        let date = prompt("Update task completion date (yyyy-mm-dd):");
        date = new Date(date);
        tasks[index].title = title;
        tasks[index].description = description;
        tasks[index].date = date;
        displayTasks();
      }

      // Function to delete a task
      function deleteTask(index) {
        tasks.splice(index, 1);
        displayTasks();
      }

      // Function to mark a task as completed
      function markAsCompleted(index) {
        tasks[index].status = "completed";
        displayTasks();
      }

      // Function to display all tasks
      function displayTasks() {
        let uncompletedTasks = document.getElementById("uncompletedTasks");
        let completedTasks = document.getElementById("completedTasks");
        let lateTasks = document.getElementById("lateTasks");
        let onTimeTasks = document.getElementById("onTimeTasks");
        let message = document.getElementById("message");

        uncompletedTasks.innerHTML = "";
        completedTasks.innerHTML = "";
        lateTasks.innerHTML = "";
        onTimeTasks.innerHTML = "";
        message.innerHTML = "";

        if (tasks.length === 0) {
          message.innerHTML = "No tasks to display.";
        }

        for (let i = 0; i < tasks.length; i++) {
          let task = tasks[i];
          let row = document.createElement("tr");
          let titleCell = document.createElement("td");
          let descriptionCell = document.createElement("td");
          let dateCell = document.createElement("td");
          let actionsCell = document.createElement("td");

          titleCell.innerHTML = task.title;
          descriptionCell.innerHTML = task.description;
          dateCell.innerHTML = task.date;
          actionsCell.innerHTML =
            "<button onclick='updateTask(" +
            i +
            ")'>Update</button> " +
            "<button onclick='deleteTask(" +
            i +
            ")'>Delete</button> " +
            "<button onclick='markAsCompleted(" +
            i +
            ")'>Mark as Completed</button>";

          row.appendChild(titleCell);
          row.appendChild(descriptionCell);
          row.appendChild(dateCell);
          row.appendChild(actionsCell);

          if (task.status === "uncompleted") {
            uncompletedTasks.appendChild(row);
          } else {
            completedTasks.appendChild(row);

            if(task.date < today){
                let days = (today - task.date) /
                86400000;
              let row = document.createElement("tr");
              let titleCell = document.createElement("td");
              let descriptionCell = document.createElement("td");
              let dateCell = document.createElement("td");
              let daysLateCell = document.createElement("td");
  
              titleCell.innerHTML = task.title;
              descriptionCell.innerHTML = task.description;
              dateCell.innerHTML = task.date;
              daysLateCell.innerHTML = days + ' days late'
  
              row.appendChild(titleCell);
              row.appendChild(descriptionCell);
              row.appendChild(dateCell);
              row.appendChild(daysLateCell);
  
              lateTasks.appendChild(row);
            }else {
                let days = (task.date - today) / 86400000;
                let row = document.createElement("tr");
                let titleCell = document.createElement("td");
                let descriptionCell = document.createElement("td");
                let dateCell = document.createElement("td");
                let daysLateCell = document.createElement("td");
    
                titleCell.innerHTML = task.title;
                descriptionCell.innerHTML = task.description;
                dateCell.innerHTML = task.date;
                daysLateCell.innerHTML = days + ' days ahead'
    
                row.appendChild(titleCell);
                row.appendChild(descriptionCell);
                row.appendChild(dateCell);
                row.appendChild(daysLateCell);
    
                onTimeTasks.appendChild(row);
            }
          }
        }
      }

      // Event listener for the "Add Task" button
      let newTaskForm = document.getElementById("newTaskForm");
      newTaskForm.addEventListener("submit", addTask);
    