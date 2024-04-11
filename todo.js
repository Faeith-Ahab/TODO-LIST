document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.querySelector('.add-task-form');
    const taskInput = document.querySelector('.task-input');
    const taskList = document.querySelector('.task-list');


    // Add task
    function addTask(task, creationDateTime) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <img class="toggle-image" src="./image/off.png" style="width:20px; cursor:pointer;">
            <div class="task-text">${task}</div>
            <div class="task-date">${creationDateTime}</div>
            <div class="action-buttons">
                <button class="edit-button">Edit</button>
                <button class="save-button" style="display: none;">Save</button>
                <button class="delete-button">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    }


// Delete task
    function deleteTask(taskItem) {
        taskItem.remove();
    }


// Edit task
    function editTask(taskItem) {
        const taskText = taskItem.querySelector('.task-text');
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText.textContent;
        taskText.replaceWith(editInput);

        const saveButton = taskItem.querySelector('.save-button');
        const editButton = taskItem.querySelector('.edit-button');
        saveButton.style.display = 'inline'; // Show the Save button
        editButton.style.display = 'none'; // Hide the Edit button

        saveButton.addEventListener('click', () => {
            taskText.textContent = editInput.value;
            editInput.replaceWith(taskText);
            saveButton.style.display = 'none'; // Hide the Save button
            editButton.style.display = 'inline'; // Show the Edit button
        });
    }

    function toggleTaskCompletion(taskItem) {
        taskItem.classList.toggle('completed'); // Toggle the completed class
    }


//Toggle images (checkbox blank and checkbox marked)
    function toggleCheckbox(toggleImage) {
        const currentSrc = toggleImage.getAttribute('src');
        if (currentSrc.includes('off.png')) {
            toggleImage.src = './image/on.png';
        } else {
            toggleImage.src = './image/off.png';
        }
    }
    
    
//Date and time stamp
    addTaskForm.addEventListener('submit', e => {
        e.preventDefault();
        const newTask = taskInput.value.trim();
        const currentDate = new Date();
        const creationDateTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
        if (newTask !== '') {
            addTask(newTask, creationDateTime);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', e => {
        const target = e.target;
        const taskItem = target.closest('.task-item');
        if (!taskItem) return;

        if (target.classList.contains('delete-button')) {
            deleteTask(taskItem);
        } else if (target.classList.contains('edit-button')) {
            editTask(taskItem);
        } else if (target.classList.contains('task-text')) {
            toggleTaskCompletion(taskItem);
        } else if (target.classList.contains('toggle-image')) {
            const toggleImage = target;
            toggleCheckbox(toggleImage);
        }
    });
});
