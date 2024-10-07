document.addEventListener("DOMContentLoaded", () => {
  // your code here
  document.getElementById('todo-input').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    let taskTitle = document.getElementById('taskTitle').value
    console.log(taskTitle)
    let userName = document.getElementById('userName').value
    console.log(userName)
    let duration = document.getElementById('duration').value
    console.log(duration)
    let dueDate = document.getElementById('dueDate').value
    console.log(dueDate)
    let priority = document.getElementById('priority').value
    console.log(priority)

    // Create a new div for each task
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('taskItem'); 
    taskDiv.priority = priority;

    // Create a checkbox to mark task as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('taskCompleteCheckbox');

    // Display only the task title
    const taskTitleElement = document.createElement('p');
    taskTitleElement.textContent = taskTitle;
    taskTitleElement.classList.add('taskTitle');

    // Create a delete button (deletes all tasks)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete All';
    deleteBtn.classList.add('deleteBtn');

    // Create an update button (only updates task title)
    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update Title';
    updateBtn.classList.add('updateBtn');

    // Append the checkbox, task title, update button, delete button to the task div
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskTitleElement);
    taskDiv.appendChild(updateBtn);
    taskDiv.appendChild(deleteBtn);

    // get the taskList in the html and append the taskDiv we create dynamically to it
    const taskList = document.getElementById('taskList');
    taskList.appendChild(taskDiv);

    // Sort tasks by priority - we need to sort before making any update or delete modifications
    sortTasksByPriority();

    // Delete all tasks functionality by reseting the div section
    deleteBtn.addEventListener('click', function() {
        taskList.innerHTML = ''; // Remove all tasks
    });

    // Update task title functionality
    updateBtn.addEventListener('click', function() {
        const newTitle = prompt('Enter new task title:', taskTitleElement.textContent);
        if (newTitle) {
            taskTitleElement.textContent = newTitle; 
        }
    });

    document.getElementById('todo-input').reset();
  });

  // Function to sort tasks by priority
  function sortTasksByPriority() {
    const taskList = document.getElementById('taskList');
    //we create an array of all elements within taskList that have the classname taskItem
    const tasks = Array.from(taskList.getElementsByClassName('taskItem'));
  
    // Sort based on data-priority (High -> Medium -> Low)
    tasks.sort((a, b) => {
      const priorities = { 'high': 1, 'medium': 2, 'low': 3 };
      return priorities[a.priority] - priorities[b.priority];
    });
  
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
      // Change text color based on priority
      const taskTitleElement = task.querySelector('.taskTitle');
      if (task.priority === 'high') {
        taskTitleElement.style.color = 'red';    
      } else if (task.priority === 'medium') {
        taskTitleElement.style.color = 'yellow'; 
      } else if (task.priority === 'low') {
        taskTitleElement.style.color = 'green';  
      }
  
      taskList.appendChild(task);
    });
  }
});




