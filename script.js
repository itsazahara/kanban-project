document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('taskForm').addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;

        if (title.trim() && description.trim()) {
            addTask(title, description);
            document.getElementById('taskForm').reset();
        }
    });

    function addTask(title, description) {
        const task = document.createElement('div');
        task.className = 'task';
        task.draggable = true;
        task.id = 'task-' + new Date().getTime();
        task.ondragstart = drag;
        task.style.backgroundColor = getRandomColor();

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        const icon = document.createElement('i');
        icon.className = 'fas fa-trash-alt';
        deleteBtn.appendChild(icon);
        deleteBtn.onclick = () => task.remove();

        task.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
        task.appendChild(deleteBtn);

        document.getElementById('todo').appendChild(task);
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData('text', ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('text');
        const task = document.getElementById(data);
        const column = ev.target.closest('.column');

        if (column && !column.contains(task) && column.classList.contains('column')) {
            column.appendChild(task);  // Mover la tarea a la nueva columna
        }
    }

    // Función para dar un color aleatorio a las tareas
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Implementación del logo con un mensaje al ser pulsado
    const logo = document.querySelector('.logo');
    const promoDiv = document.createElement('div');

    logo.addEventListener('click', function () {
        const promoMessage = '<div class="promo">MI KANBAN PERSONAL</div>';

        if (!document.querySelector('.promo')) {
            document.body.insertAdjacentHTML('afterbegin', promoMessage);
        }
    });

    // Añadir los eventos de arrastre y suelta a las columnas
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
        column.addEventListener('dragover', allowDrop);
        column.addEventListener('drop', drop);
    });


    // Menú desplegable del menú hamburguesa
    const menuIcon = document.querySelector('.menu-icon');
    const menu = document.querySelector('.menu');
    menuIcon.addEventListener('click', function () {
        menu.classList.toggle('menu-active');
    });

});
