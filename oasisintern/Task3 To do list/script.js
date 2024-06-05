const taskInput = document.getElementById('taskInput');
const descriptionInput = document.getElementById('descriptionInput');
const addButton = document.getElementById('addButton');
const todoList = document.getElementById('todoList');
const generatedTasks = document.getElementById('generatedTasks')

function addTask() {

    
    const taskText = taskInput.value.trim();
    const descriptionText = descriptionInput.value.trim();
    if (taskText === '' || descriptionText === '') return;

    
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');

    
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();


    const dateTimeElement = document.createElement('div');
    dateTimeElement.classList.add('task-date-time');
    dateTimeElement.textContent = `Added: ${formattedDate} ${formattedTime}`;

    
    const checkbox = Object.assign(document.createElement('input'), { type: 'checkbox', className: 'task-checkbox' });
    const titleElement = Object.assign(document.createElement('div'), { className: 'task-title', textContent: taskText });

    
    const descriptionElement = document.createElement('div');
    descriptionElement.classList.add('task-description');
    descriptionElement.textContent = descriptionText;

    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('task-buttons');

    
    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
        const newText = prompt('Enter new task text:', titleElement.textContent);
        if (newText !== null) {
            titleElement.textContent = newText;
            const newDescription = prompt('Enter new description:', descriptionElement.textContent);
            if (newDescription !== null) {
                descriptionElement.textContent = newDescription;
            }
        }
    });

    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Del ';
    deleteButton.addEventListener('click', function () {
        taskElement.remove();
    });

    
    taskElement.appendChild(dateTimeElement);
    taskElement.appendChild(checkbox);
    taskElement.appendChild(titleElement);
    taskElement.appendChild(descriptionElement);
    taskElement.appendChild(buttonsContainer);

    
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);

    
    todoList.appendChild(taskElement);
    taskInput.value = '';
    descriptionInput.value = '';
    changeBackgroundGradient();

}


function changeBackgroundGradient() {
    const colors = ['#ff9a9e', '#fecfef', '#9afff9', '#ffecb8', '#c5f5e0']; // Array of gradient colors
    const randomColor1 = colors[Math.floor(Math.random() * colors.length)];
    const randomColor2 = colors[Math.floor(Math.random() * colors.length)];
    container.style.backgroundImage = `linear-gradient(to right, ${randomColor1}, ${randomColor2})`;
}


addButton.addEventListener('click', addTask);


taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});