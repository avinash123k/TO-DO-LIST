document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filters = document.querySelectorAll('.filters button');

    let tasks = [];

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskClick);
    filters.forEach(filter => filter.addEventListener('click', filterTasks));

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            tasks.push(task);
            renderTasks();
            taskInput.value = '';
        }
    }

    function handleTaskClick(e) {
        const target = e.target;
        const taskId = target.closest('li').dataset.id;

        if (target.classList.contains('delete-btn')) {
            deleteTask(taskId);
        } else if (target.classList.contains('edit-btn')) {
            editTask(taskId);
        } else {
            toggleTaskCompletion(taskId);
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== parseInt(id));
        renderTasks();
    }

    function editTask(id) {
        const task = tasks.find(task => task.id === parseInt(id));
        const newTaskText = prompt('Edit task:', task.text);
        if (newTaskText !== null) {
            task.text = newTaskText.trim();
            renderTasks();
        }
    }

    function toggleTaskCompletion(id) {
        const task = tasks.find(task => task.id === parseInt(id));
        task.completed = !task.completed;
        renderTasks();
    }

    function filterTasks(e) {
        const filter = e.target.dataset.filter;
        filters.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        renderTasks(filter);
    }

    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        tasks
            .filter(task => {
                if (filter === 'completed') return task.completed;
                if (filter === 'pending') return !task.completed;
                return true;
            })
            .forEach(task => {
                const li = document.createElement('li');
                li.className = task.completed ? 'completed' : '';
                li.dataset.id = task.id;
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
    }
});