
        document.addEventListener('DOMContentLoaded', () => {
            const addTaskForm = document.querySelector('.add-task-form');
            const taskInput = document.querySelector('.task-input');
            const taskList = document.querySelector('.task-list');

            let tasks = [];

            function addTask(task) {
                const taskItem = document.createElement('li');
                taskItem.classList.add('task-item');
                taskItem.innerHTML = `<div class="task-text">${task}</div>
                                      <button class="edit-button">Edit</button>
                                      <button class="save-button" style="display: none;">Save</button>
                                      <button class="delete-button">Delete</button>`;
                taskList.appendChild(taskItem);
                tasks.push(taskItem);
            }

            function deleteTask(taskItem) {
                taskItem.remove();
                tasks = tasks.filter(item => item !== taskItem);
            }

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

            addTaskForm.addEventListener('submit', e => {
                e.preventDefault();
                const newTask = taskInput.value.trim();
                if (newTask !== '') {
                    addTask(newTask);
                    taskInput.value = '';
                }
            });

            taskList.addEventListener('click', e => {
                if (e.target.classList.contains('delete-button')) {
                    const taskItem = e.target.closest('.task-item');
                    deleteTask(taskItem);
                } else if (e.target.classList.contains('edit-button')) {
                    const taskItem = e.target.closest('.task-item');
                    editTask(taskItem);
                }
            });
        });
    
