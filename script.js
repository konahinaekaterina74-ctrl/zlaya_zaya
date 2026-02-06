// Основные данные приложения
let currentRole = 'store';
let tasks = [];
let specialists = [];
let recruitmentRequests = [];
let notifications = [];
let currentTaskId = null;
let selectedSpecialists = [];

// Инициализация данных
function initData() {
    // Пример задач для разных ролей
    tasks = [
        {
            id: 1,
            name: "Инвентаризация склада",
            type: "inventory",
            store: "Магазин №15",
            startDate: "2023-10-20",
            endDate: "2023-10-22",
            specialization: "Кладовщик",
            description: "Полная инвентаризация товаров на складе",
            status: "new",
            createdBy: "store",
            createdAt: "2023-10-15",
            assignedSpecialists: []
        },
        {
            id: 2,
            name: "Генеральная уборка торгового зала",
            type: "cleaning",
            store: "Магазин №8",
            startDate: "2023-10-25",
            endDate: "2023-10-25",
            specialization: "Уборщик",
            description: "Полная уборка торгового зала после ремонта",
            status: "in-progress",
            createdBy: "store",
            createdAt: "2023-10-10",
            assignedSpecialists: []
        },
        {
            id: 3,
            name: "Ремонт холодильного оборудования",
            type: "repair",
            store: "Магазин №12",
            startDate: "2023-10-30",
            endDate: "2023-11-02",
            specialization: "Холодильщик",
            description: "Ремонт 3 холодильных витрин",
            status: "completed",
            createdBy: "store",
            createdAt: "2023-10-05",
            assignedSpecialists: [
                { id: 101, name: "Исмаилов М. А.", assignedDate: "2023-10-12" }
            ]
        },
        {
            id: 4,
            name: "Проверка противопожарного оборудования",
            type: "other",
            store: "Магазин №3",
            startDate: "2023-11-05",
            endDate: "2023-11-05",
            specialization: "Специалист по пожарной безопасности",
            description: "Ежеквартальная проверка огнетушителей и пожарных кранов",
            status: "closed",
            createdBy: "store",
            createdAt: "2023-10-01",
            assignedSpecialists: [
                { id: 102, name: "Николаева А. Р.", assignedDate: "2023-10-08" }
            ]
        }
    ];

    // Пример специалистов
    specialists = [
        {
            id: 101,
            name: "Григорьева Ангелина Денисовна",
            position: "Кладовщик",
            phone: "+7 (912) 345-67-89",
            email: "gri@example.com",
            status: "available",
            experience: "Опыт работы 5 лет. Знание систем учета товаров.",
            storePreferences: ["Магазин №15", "Магазин №8"]
        },
        {
            id: 102,
            name: "Николаева Анна Руслановна",
            position: "Специалист по пожарной безопасности",
            phone: "+7 (923) 456-78-90",
            email: "nikol@example.com",
            status: "available",
            experience: "Лицензия МЧС. Опыт 8 лет.",
            storePreferences: ["Все магазины"]
        },
        {
            id: 103,
            name: "Сариев Самат Сайдахматович",
            position: "Уборщик",
            phone: "+7 (934) 567-89-01",
            email: "sariv@example.com",
            status: "busy",
            experience: "Опыт 3 года. Работа с профессиональной химией.",
            storePreferences: ["Магазин №8", "Магазин №12"]
        },
        {
            id: 104,
            name: "Исмаилов Максим Александрович",
            position: "Холодильщик",
            phone: "+7 (945) 678-90-12",
            email: "ism@example.com",
            status: "vacation",
            experience: "Сертификат по обслуживанию холодильного оборудования. Опыт 6 лет.",
            storePreferences: ["Магазин №12", "Магазин №3"]
        },
        {
            id: 105,
            name: "Жилин Кирилл Сергеевич",
            position: "Инвентаризатор",
            phone: "+7 (956) 789-01-23",
            email: "zhil@example.com",
            status: "available",
            experience: "Бухгалтерское образование. Опыт инвентаризации 4 года.",
            storePreferences: ["Магазин №15", "Магазин №8"]
        }
    ];

    // Пример заявок на подбор
    recruitmentRequests = [
        {
            id: 1,
            taskId: 1,
            store: "Магазин №15",
            specialization: "Специалист по IT",
            deadline: "2023-11-10",
            requirements: "Опыт настройки кассового оборудования, знание 1С",
            status: "new",
            createdDate: "2023-10-16",
            createdBy: "office"
        },
        {
            id: 2,
            taskId: 2,
            store: "Магазин №8",
            specialization: "Маляр-штукатур",
            deadline: "2023-10-30",
            requirements: "Опыт отделочных работ, работа с профессиональными материалами",
            status: "in-progress",
            createdDate: "2023-10-12",
            createdBy: "office"
        }
    ];

    // Пример уведомлений для HR
    notifications = [
        {
            id: 1,
            title: "Новая заявка на подбор",
            message: "Поступила новая заявка на подбор специалиста по IT для Магазина №15",
            date: "2023-10-16 10:30",
            read: false,
            link: "#"
        },
        {
            id: 2,
            title: "Заявка принята в работу",
            message: "Заявка на подбор маляра-штукатура принята вами в работу",
            date: "2023-10-13 14:20",
            read: true,
            link: "#"
        }
    ];
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initData();
    setupEventListeners();
    updateUI();
    initNotificationStyles();
});

// Настройка обработчиков событий
function setupEventListeners() {
    // Переключение ролей
    document.getElementById('roleSelect').addEventListener('change', function(e) {
        currentRole = e.target.value;
        updateUI();
        updateUserDisplay();
    });

    // Создание задания
    document.getElementById('createTaskForm').addEventListener('submit', function(e) {
        e.preventDefault();
        createNewTask();
    });

    // Фильтрация заданий для магазина
    document.getElementById('taskFilter').addEventListener('change', function() {
        filterStoreTasks();
    });

    // Фильтрация заданий для офиса
    document.getElementById('applyFilters').addEventListener('click', function() {
        filterOfficeTasks();
    });

    document.getElementById('clearFilters').addEventListener('click', function() {
        document.getElementById('storeFilter').value = '';
        document.getElementById('dateFilter').value = '';
        filterOfficeTasks();
    });

    // Поиск специалистов
    document.getElementById('searchSpecialists').addEventListener('click', function() {
        searchSpecialists();
    });

    // Поиск при нажатии Enter в поле поиска
    document.getElementById('specialistSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchSpecialists();
        }
    });

    // Создание заявки на подбор
    document.getElementById('createRecruitmentRequest').addEventListener('click', function() {
        openRecruitmentModal();
    });

    // Назначение специалистов
    document.getElementById('assignSpecialists').addEventListener('click', function() {
        assignSpecialists();
    });

    // Отмена назначения
    document.getElementById('cancelAssignment').addEventListener('click', function() {
        hideAssignmentSection();
    });

    // Добавление нового специалиста
    const addSpecialistForm = document.getElementById('addSpecialistForm');
    if (addSpecialistForm) {
        addSpecialistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewSpecialist();
        });
    }

    const cancelAddSpecialist = document.getElementById('cancelAddSpecialist');
    if (cancelAddSpecialist) {
        cancelAddSpecialist.addEventListener('click', function() {
            document.getElementById('addSpecialistSection').style.display = 'none';
            document.getElementById('addSpecialistForm').reset();
        });
    }

    // Закрытие модальных окон
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            closeModal();
        });
    });

    // Подтверждение отправки задания
    document.getElementById('confirmSendTask').addEventListener('click', function() {
        sendTaskToOffice();
    });

    // Подтверждение отмены задания
    document.getElementById('confirmCancelTask').addEventListener('click', function() {
        cancelTask();
    });

    // Подтверждение закрытия задания
    document.getElementById('confirmCloseTask').addEventListener('click', function() {
        closeTask();
    });

    // Подтверждение создания заявки на подбор
    document.getElementById('confirmRecruitmentRequest').addEventListener('click', function() {
        createRecruitmentRequest();
    });

    // Клик по оверлею для закрытия модального окна
    document.getElementById('modalOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Инициализация стилей для уведомлений
function initNotificationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 9999;
            opacity: 0;
        }
        
        .notification.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification-success {
            background-color: var(--success-color);
            border-left: 4px solid #1e7e34;
        }
        
        .notification-error {
            background-color: var(--danger-color);
            border-left: 4px solid #bd2130;
        }
        
        .notification-warning {
            background-color: var(--warning-color);
            border-left: 4px solid #d39e00;
            color: #212529;
        }
        
        .notification-info {
            background-color: var(--secondary-color);
            border-left: 4px solid #0062cc;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            flex: 1;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 10px;
        }
        
        .history-item {
            padding: 15px;
            border-bottom: 1px solid var(--border-color);
        }
        
        .history-item:last-child {
            border-bottom: none;
        }
        
        .history-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .history-task {
            font-weight: 600;
            color: var(--primary-color);
        }
        
        .history-details {
            display: flex;
            gap: 20px;
            font-size: 14px;
            color: var(--gray-color);
        }
        
        .history-details span {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .task-info-card {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid var(--secondary-color);
            margin: 15px 0;
        }
        
        .task-info-card h4 {
            margin-bottom: 10px;
            color: var(--primary-color);
        }
        
        .task-info-card p {
            margin-bottom: 5px;
        }
        
        .selected-list {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
        }
        
        .selected-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background: #f8f9fa;
            border-radius: 6px;
            border: 1px solid var(--border-color);
        }
        
        .action-buttons {
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
        }
        
        .btn-small {
            padding: 6px 12px;
            font-size: 14px;
        }
        
        .btn-small i {
            font-size: 12px;
        }
    `;
    document.head.appendChild(style);
}

// Обновление интерфейса в зависимости от роли
function updateUI() {
    // Скрыть все представления
    document.querySelectorAll('.role-view').forEach(view => {
        view.classList.remove('active');
    });

    // Показать активное представление
    document.getElementById(`${currentRole}ManagerView`).classList.add('active');

    // Обновить данные для активной роли
    switch(currentRole) {
        case 'store':
            updateStoreView();
            break;
        case 'office':
            updateOfficeView();
            break;
        case 'hr':
            updateHRView();
            break;
    }
}

// Обновление отображения пользователя
function updateUserDisplay() {
    const userDisplay = document.getElementById('userDisplay');
    switch(currentRole) {
        case 'store':
            userDisplay.innerHTML = '<i class="fas fa-user"></i> Самохвалова В.Д. (Магазин №15)';
            break;
        case 'office':
            userDisplay.innerHTML = '<i class="fas fa-user-tie"></i> Коняхина Е.Р. (Центральный офис)';
            break;
        case 'hr':
            userDisplay.innerHTML = '<i class="fas fa-user-tie"></i> Григорьева А.Д. (HR отдел)';
            break;
    }
}

// ОБНОВЛЕНИЕ ПРЕДСТАВЛЕНИЯ ДЛЯ УПРАВЛЯЮЩЕГО МАГАЗИНОМ
function updateStoreView() {
    renderStoreTasks();
    updateTaskHistory();
}

// Рендеринг заданий магазина
function renderStoreTasks() {
    const tableBody = document.querySelector('#storeTasksTable tbody');
    const filterValue = document.getElementById('taskFilter').value;
    
    let filteredTasks = tasks.filter(task => task.createdBy === 'store');
    
    if (filterValue !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === filterValue);
    }
    
    if (filteredTasks.length === 0) {
        document.getElementById('emptyTasks').style.display = 'block';
        tableBody.innerHTML = '';
        return;
    }
    
    document.getElementById('emptyTasks').style.display = 'none';
    
    tableBody.innerHTML = filteredTasks.map(task => `
        <tr>
            <td>${task.id}</td>
            <td>${task.name}</td>
            <td>${formatDate(task.startDate)} - ${formatDate(task.endDate)}</td>
            <td>${task.specialization}</td>
            <td><span class="status-badge status-${task.status}">${getStatusText(task.status)}</span></td>
            <td>
                <div class="action-buttons">
                    ${task.status === 'new' ? `
                        <button class="btn btn-small btn-primary" onclick="sendTaskModal(${task.id})">
                            <i class="fas fa-paper-plane"></i> Отправить
                        </button>
                        <button class="btn btn-small btn-secondary" onclick="editTask(${task.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-small btn-danger" onclick="cancelTaskModal(${task.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    ` : ''}
                    ${task.status === 'completed' ? `
                        <button class="btn btn-small btn-secondary" onclick="viewTaskDetails(${task.id})">
                            <i class="fas fa-eye"></i> Подробно
                        </button>
                    ` : ''}
                    ${task.status === 'closed' ? `
                        <button class="btn btn-small btn-outline" onclick="viewTaskDetails(${task.id})">
                            <i class="fas fa-eye"></i> Архив
                        </button>
                    ` : ''}
                    ${task.status === 'in-progress' ? `
                        <button class="btn btn-small btn-outline" onclick="viewTaskDetails(${task.id})">
                            <i class="fas fa-eye"></i> Просмотр
                        </button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

// Обновление истории заданий
function updateTaskHistory() {
    const historyList = document.getElementById('taskHistory');
    const storeTasks = tasks.filter(task => task.createdBy === 'store');
    
    if (storeTasks.length === 0) {
        historyList.innerHTML = '<div class="empty-state"><p>Нет истории заданий</p></div>';
        return;
    }
    
    historyList.innerHTML = storeTasks.map(task => `
        <div class="history-item">
            <div class="history-header">
                <span class="history-task">${task.name}</span>
                <span class="status-badge status-${task.status}">${getStatusText(task.status)}</span>
            </div>
            <div class="history-details">
                <span><i class="far fa-calendar"></i> ${formatDate(task.createdAt)}</span>
                <span><i class="fas fa-user-cog"></i> ${task.specialization}</span>
                ${task.assignedSpecialists && task.assignedSpecialists.length > 0 ? 
                    `<span><i class="fas fa-users"></i> ${task.assignedSpecialists.length} специалист(ов)</span>` : ''}
            </div>
        </div>
    `).join('');
}

// Создание нового задания
function createNewTask() {
    const taskName = document.getElementById('taskName').value;
    const taskType = document.getElementById('taskType').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const specialization = document.getElementById('specialization').value;
    const description = document.getElementById('description').value;
    
    if (!taskName || !startDate || !endDate || !specialization) {
        showNotification('Заполните обязательные поля', 'error');
        return;
    }
    
    const newTask = {
        id: tasks.length + 1,
        name: taskName,
        type: taskType,
        store: "Магазин №15",
        startDate: startDate,
        endDate: endDate,
        specialization: specialization,
        description: description,
        status: "new", // Автоматически присваивается статус "новый" (История 1)
        createdBy: "store",
        createdAt: new Date().toISOString().split('T')[0],
        assignedSpecialists: []
    };
    
    tasks.push(newTask);
    
    // Очистка формы
    document.getElementById('createTaskForm').reset();
    
    // Показать уведомление об успехе
    showNotification('Задание успешно создано! Статус: "Новый"', 'success');
    
    // Обновить интерфейс
    updateStoreView();
}

// Редактирование задания
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    // Заполняем форму данными задания
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskType').value = task.type;
    document.getElementById('startDate').value = task.startDate;
    document.getElementById('endDate').value = task.endDate;
    document.getElementById('specialization').value = task.specialization;
    document.getElementById('description').value = task.description || '';
    
    // Прокручиваем к форме
    document.getElementById('createTaskForm').scrollIntoView({ behavior: 'smooth' });
    
    // Показываем сообщение
    showNotification('Заполните форму для редактирования задания', 'info');
}

// Просмотр деталей задания
function viewTaskDetails(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    let details = `
        <div class="task-info-card">
            <h4>${task.name}</h4>
            <p><strong>Статус:</strong> ${getStatusText(task.status)}</p>
            <p><strong>Магазин:</strong> ${task.store}</p>
            <p><strong>Тип работ:</strong> ${getTaskTypeText(task.type)}</p>
            <p><strong>Специализация:</strong> ${task.specialization}</p>
            <p><strong>Период выполнения:</strong> ${formatDate(task.startDate)} - ${formatDate(task.endDate)}</p>
            ${task.description ? `<p><strong>Описание:</strong> ${task.description}</p>` : ''}
            ${task.createdAt ? `<p><strong>Дата создания:</strong> ${formatDate(task.createdAt)}</p>` : ''}
    `;
    
    if (task.assignedSpecialists && task.assignedSpecialists.length > 0) {
        details += `<p><strong>Назначенные специалисты:</strong></p><ul>`;
        task.assignedSpecialists.forEach(spec => {
            details += `<li>${spec.name} (назначен ${formatDate(spec.assignedDate)})</li>`;
        });
        details += `</ul>`;
    }
    
    if (task.actualCompletionDate) {
        details += `<p><strong>Фактическая дата выполнения:</strong> ${formatDate(task.actualCompletionDate)}</p>`;
    }
    
    if (task.cancelReason) {
        details += `<p><strong>Причина отмены:</strong> ${task.cancelReason}</p>`;
    }
    
    details += `</div>`;
    
    // Показываем в модальном окне
    alertModal('Детали задания', details);
}

// ОБНОВЛЕНИЕ ПРЕДСТАВЛЕНИЯ ДЛЯ УПРАВЛЯЮЩЕГО ОФИСОМ
function updateOfficeView() {
    renderOfficeTasks();
    // Скрываем секции подбора при переключении
    document.getElementById('specialistSection').style.display = 'none';
    document.getElementById('assignmentSection').style.display = 'none';
}

// Рендеринг заданий для офиса
function renderOfficeTasks() {
    const tableBody = document.querySelector('#officeTasksTable tbody');
    const filteredTasks = filterOfficeTasksData();
    
    if (filteredTasks.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <div class="empty-state">
                        <i class="fas fa-clipboard-list"></i>
                        <p>Нет заданий для отображения</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = filteredTasks.map(task => `
        <tr>
            <td>${task.id}</td>
            <td>${task.store}</td>
            <td>${task.name}</td>
            <td>${formatDate(task.startDate)} - ${formatDate(task.endDate)}</td>
            <td>${task.specialization}</td>
            <td><span class="status-badge status-${task.status}">${getStatusText(task.status)}</span></td>
            <td>
                <div class="action-buttons">
                    ${task.status === 'in-progress' ? `
                        <button class="btn btn-small btn-primary" onclick="selectTaskForSpecialists(${task.id})">
                            <i class="fas fa-users"></i> Подобрать
                        </button>
                    ` : ''}
                    ${task.status === 'completed' ? `
                        <button class="btn btn-small btn-secondary" onclick="closeTaskModal(${task.id})">
                            <i class="fas fa-archive"></i> Закрыть
                        </button>
                    ` : ''}
                    <button class="btn btn-small btn-outline" onclick="viewTaskDetails(${task.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Фильтрация заданий для офиса
function filterOfficeTasksData() {
    const storeFilter = document.getElementById('storeFilter').value.toLowerCase();
    const dateFilter = document.getElementById('dateFilter').value;
    
    let filteredTasks = tasks.filter(task => task.status !== 'new' && task.status !== 'cancelled');
    
    if (storeFilter) {
        filteredTasks = filteredTasks.filter(task => 
            task.store.toLowerCase().includes(storeFilter)
        );
    }
    
    if (dateFilter) {
        filteredTasks = filteredTasks.filter(task => 
            task.startDate <= dateFilter && task.endDate >= dateFilter
        );
    }
    
    return filteredTasks;
}

function filterOfficeTasks() {
    renderOfficeTasks();
}

// Выбор задания для подбора специалистов
function selectTaskForSpecialists(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    currentTaskId = taskId;
    
    // Показать информацию о задании
    document.getElementById('currentTaskInfo').innerHTML = `
        <div class="task-info-card">
            <h4>${task.name}</h4>
            <p><strong>Магазин:</strong> ${task.store}</p>
            <p><strong>Специализация:</strong> ${task.specialization}</p>
            <p><strong>Сроки:</strong> ${formatDate(task.startDate)} - ${formatDate(task.endDate)}</p>
            ${task.description ? `<p><strong>Описание:</strong> ${task.description}</p>` : ''}
        </div>
    `;
    
    // Установить поисковый запрос
    document.getElementById('specialistSearch').value = task.specialization;
    
    // Показать секцию подбора
    document.getElementById('specialistSection').style.display = 'block';
    document.getElementById('assignmentSection').style.display = 'none';
    
    // Выполнить поиск специалистов
    searchSpecialists();
}

// Поиск специалистов
function searchSpecialists() {
    const searchQuery = document.getElementById('specialistSearch').value.toLowerCase();
    const specialistsList = document.getElementById('specialistsList');
    const noSpecialists = document.getElementById('noSpecialists');
    
    let filteredSpecialists = specialists;
    
    if (searchQuery) {
        filteredSpecialists = specialists.filter(spec => 
            spec.position.toLowerCase().includes(searchQuery) ||
            spec.name.toLowerCase().includes(searchQuery)
        );
    }
    
    if (filteredSpecialists.length === 0) {
        specialistsList.style.display = 'none';
        noSpecialists.style.display = 'block';
        return;
    }
    
    noSpecialists.style.display = 'none';
    specialistsList.style.display = 'grid';
    
    specialistsList.innerHTML = filteredSpecialists.map(spec => `
        <div class="specialist-card" onclick="toggleSpecialistSelection(${spec.id})" id="specialist-${spec.id}">
            <div class="specialist-header">
                <div class="specialist-name">${spec.name}</div>
                <span class="status-badge ${getAvailabilityClass(spec.status)}">
                    ${getAvailabilityText(spec.status)}
                </span>
            </div>
            <div class="specialist-info">
                <p><i class="fas fa-briefcase"></i> ${spec.position}</p>
                <p><i class="fas fa-phone"></i> ${spec.phone}</p>
                ${spec.email ? `<p><i class="fas fa-envelope"></i> ${spec.email}</p>` : ''}
                <p><i class="fas fa-store"></i> Предпочтения: ${spec.storePreferences.join(', ')}</p>
            </div>
            <div class="specialist-experience">
                <p><strong>Опыт:</strong> ${spec.experience}</p>
            </div>
            <div class="specialist-actions">
                <button class="btn btn-small ${selectedSpecialists.find(s => s.id === spec.id) ? 'btn-success' : 'btn-primary'}" onclick="event.stopPropagation(); selectSpecialist(${spec.id})">
                    <i class="fas fa-user-check"></i> ${selectedSpecialists.find(s => s.id === spec.id) ? 'Выбран' : 'Выбрать'}
                </button>
            </div>
        </div>
    `).join('');
}

// Вспомогательные функции для статусов
function getAvailabilityClass(status) {
    switch(status) {
        case 'available': return 'status-new';
        case 'busy': return 'status-in-progress';
        case 'vacation': return 'status-cancelled';
        default: return '';
    }
}

function getAvailabilityText(status) {
    switch(status) {
        case 'available': return 'Доступен';
        case 'busy': return 'Занят';
        case 'vacation': return 'В отпуске';
        default: return status;
    }
}

function getTaskTypeText(type) {
    switch(type) {
        case 'inventory': return 'Инвентаризация';
        case 'cleaning': return 'Клининг';
        case 'repair': return 'Ремонт';
        case 'other': return 'Другие работы';
        default: return type;
    }
}

// Выбор специалиста
function selectSpecialist(specialistId) {
    const specialist = specialists.find(s => s.id === specialistId);
    if (!specialist) return;
    
    // Проверяем, не выбран ли уже специалист
    const index = selectedSpecialists.findIndex(s => s.id === specialistId);
    
    if (index === -1) {
        selectedSpecialists.push(specialist);
    } else {
        selectedSpecialists.splice(index, 1);
    }
    
    // Обновляем отображение
    updateSelectedSpecialistsDisplay();
    // Обновляем кнопки в карточках
    const button = document.querySelector(`#specialist-${specialistId} .specialist-actions button`);
    if (button) {
        if (selectedSpecialists.find(s => s.id === specialistId)) {
            button.className = 'btn btn-small btn-success';
            button.innerHTML = '<i class="fas fa-user-check"></i> Выбран';
        } else {
            button.className = 'btn btn-small btn-primary';
            button.innerHTML = '<i class="fas fa-user-check"></i> Выбрать';
        }
    }
    
    // Показываем секцию назначения, если есть выбранные специалисты
    if (selectedSpecialists.length > 0) {
        document.getElementById('assignmentSection').style.display = 'block';
    } else {
        document.getElementById('assignmentSection').style.display = 'none';
    }
}

// Переключение выбора специалиста
function toggleSpecialistSelection(specialistId) {
    selectSpecialist(specialistId);
}

// Обновление отображения выбранных специалистов
function updateSelectedSpecialistsDisplay() {
    const container = document.getElementById('selectedSpecialists');
    
    if (selectedSpecialists.length === 0) {
        container.innerHTML = '<p>Специалисты не выбраны</p>';
        return;
    }
    
    container.innerHTML = `
        <h4>Выбранные специалисты (${selectedSpecialists.length}):</h4>
        <div class="selected-list">
            ${selectedSpecialists.map(spec => `
                <div class="selected-item">
                    <span>${spec.name} - ${spec.position}</span>
                    <button class="btn btn-small btn-danger" onclick="removeSelectedSpecialist(${spec.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

// Удаление выбранного специалиста
function removeSelectedSpecialist(specialistId) {
    selectedSpecialists = selectedSpecialists.filter(s => s.id !== specialistId);
    
    // Обновляем кнопку в карточке
    const button = document.querySelector(`#specialist-${specialistId} .specialist-actions button`);
    if (button) {
        button.className = 'btn btn-small btn-primary';
        button.innerHTML = '<i class="fas fa-user-check"></i> Выбрать';
    }
    
    updateSelectedSpecialistsDisplay();
    
    if (selectedSpecialists.length === 0) {
        document.getElementById('assignmentSection').style.display = 'none';
    }
}

// Назначение специалистов на задание
function assignSpecialists() {
    if (!currentTaskId || selectedSpecialists.length === 0) {
        showNotification('Выберите хотя бы одного специалиста', 'error');
        return;
    }
    
    const taskIndex = tasks.findIndex(t => t.id === currentTaskId);
    if (taskIndex === -1) return;
    
    // Добавляем специалистов к заданию
    tasks[taskIndex].assignedSpecialists = selectedSpecialists.map(spec => ({
        id: spec.id,
        name: spec.name,
        assignedDate: new Date().toISOString().split('T')[0]
    }));
    
    // Меняем статус задания на "выполнен" (История 5)
    tasks[taskIndex].status = 'completed';
    
    // Показываем уведомление
    showNotification(`Специалисты назначены на задание #${currentTaskId}. Статус изменен на "Выполнен"`, 'success');
    
    // Сбрасываем выбранных специалистов
    selectedSpecialists = [];
    
    // Скрываем секции
    hideAssignmentSection();
    document.getElementById('specialistSection').style.display = 'none';
    
    // Обновляем интерфейс
    updateOfficeView();
}

// Скрытие секции назначения
function hideAssignmentSection() {
    document.getElementById('assignmentSection').style.display = 'none';
    selectedSpecialists = [];
    
    // Сбрасываем кнопки выбора
    document.querySelectorAll('.specialist-actions button').forEach(button => {
        button.className = 'btn btn-small btn-primary';
        button.innerHTML = '<i class="fas fa-user-check"></i> Выбрать';
    });
}

// ОБНОВЛЕНИЕ ПРЕДСТАВЛЕНИЯ ДЛЯ HR-СПЕЦИАЛИСТА
function updateHRView() {
    renderRecruitmentTable();
    renderNotifications();
    updateNotificationBadge();
}

// Рендеринг таблицы заявок на подбор
function renderRecruitmentTable() {
    const tableBody = document.querySelector('#recruitmentTable tbody');
    
    if (recruitmentRequests.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px;">
                    <div class="empty-state">
                        <i class="fas fa-clipboard-list"></i>
                        <p>Нет заявок на подбор</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = recruitmentRequests.map(request => `
        <tr>
            <td>${request.id}</td>
            <td>${request.store}</td>
            <td>${request.specialization}</td>
            <td>${formatDate(request.deadline)}</td>
            <td><span class="status-badge status-${request.status}">${getRecruitmentStatusText(request.status)}</span></td>
            <td>${formatDate(request.createdDate)}</td>
            <td>
                <div class="action-buttons">
                    ${request.status === 'new' ? `
                        <button class="btn btn-small btn-primary" onclick="acceptRecruitmentRequest(${request.id})">
                            <i class="fas fa-check"></i> Принять
                        </button>
                    ` : ''}
                    ${request.status === 'in-progress' ? `
                        <button class="btn btn-small btn-secondary" onclick="addSpecialistForRequest(${request.id})">
                            <i class="fas fa-user-plus"></i> Добавить
                        </button>
                    ` : ''}
                    <button class="btn btn-small btn-outline" onclick="viewRecruitmentDetails(${request.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Рендеринг уведомлений
function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    
    if (notifications.length === 0) {
        notificationsList.innerHTML = '<div class="empty-state"><p>Нет уведомлений</p></div>';
        return;
    }
    
    notificationsList.innerHTML = notifications.map(notif => `
        <div class="notification-item ${notif.read ? '' : 'unread'}" onclick="markNotificationAsRead(${notif.id})">
            <div class="notification-icon">
                <i class="fas fa-bell"></i>
            </div>
            <div class="notification-content">
                <h4>${notif.title}</h4>
                <p>${notif.message}</p>
                <div class="notification-time">${notif.date}</div>
            </div>
        </div>
    `).join('');
}

// Обновление бейджа уведомлений
function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => !n.read).length;
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

// Пометка уведомления как прочитанного
function markNotificationAsRead(notificationId) {
    const notificationIndex = notifications.findIndex(n => n.id === notificationId);
    if (notificationIndex !== -1) {
        notifications[notificationIndex].read = true;
        renderNotifications();
        updateNotificationBadge();
    }
}

// Просмотр деталей заявки на подбор
function viewRecruitmentDetails(requestId) {
    const request = recruitmentRequests.find(r => r.id === requestId);
    if (!request) return;
    
    let details = `
        <div class="task-info-card">
            <h4>Заявка на подбор #${request.id}</h4>
            <p><strong>Магазин:</strong> ${request.store}</p>
            <p><strong>Специализация:</strong> ${request.specialization}</p>
            <p><strong>Срок подбора:</strong> ${formatDate(request.deadline)}</p>
            <p><strong>Статус:</strong> ${getRecruitmentStatusText(request.status)}</p>
            <p><strong>Дата создания:</strong> ${formatDate(request.createdDate)}</p>
            ${request.requirements ? `<p><strong>Требования:</strong><br>${request.requirements}</p>` : ''}
        </div>
    `;
    
    alertModal('Детали заявки на подбор', details);
}

// МОДАЛЬНЫЕ ОКНА
// Открытие модального окна отправки задания
function sendTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('taskToSendName').textContent = task.name;
    document.getElementById('sendTaskModal').dataset.taskId = taskId;
    
    openModal('sendTaskModal');
}

// Отправка задания в офис
function sendTaskToOffice() {
    const taskId = parseInt(document.getElementById('sendTaskModal').dataset.taskId);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex !== -1) {
        // Меняем статус на "в работе" (История 2)
        tasks[taskIndex].status = 'in-progress';
        showNotification('Задание отправлено в центральный офис. Статус изменен на "В работе"', 'success');
        closeModal();
        updateStoreView();
    }
}

// Открытие модального окна отмены задания
function cancelTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('taskToCancelName').textContent = task.name;
    document.getElementById('cancelTaskModal').dataset.taskId = taskId;
    
    openModal('cancelTaskModal');
}

// Отмена задания
function cancelTask() {
    const taskId = parseInt(document.getElementById('cancelTaskModal').dataset.taskId);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    const reason = document.getElementById('cancelReason').value;
    
    if (taskIndex !== -1) {
        // Меняем статус на "отменен" (История 9)
        tasks[taskIndex].status = 'cancelled';
        tasks[taskIndex].cancelReason = reason || 'Причина не указана';
        
        showNotification('Задание отменено. Статус изменен на "Отменен"', 'warning');
        closeModal();
        updateStoreView();
    }
}

// Открытие модального окна закрытия задания
function closeTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('taskToCloseName').textContent = task.name;
    document.getElementById('closeTaskModal').dataset.taskId = taskId;
    
    // Устанавливаем сегодняшнюю дату по умолчанию
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('actualCompletionDate').value = today;
    
    openModal('closeTaskModal');
}

// Закрытие задания
function closeTask() {
    const taskId = parseInt(document.getElementById('closeTaskModal').dataset.taskId);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    const actualDate = document.getElementById('actualCompletionDate').value;
    
    if (!actualDate) {
        showNotification('Укажите фактическую дату выполнения', 'error');
        return;
    }
    
    if (taskIndex !== -1) {
        // Меняем статус на "закрыт" (История 10)
        tasks[taskIndex].status = 'closed';
        tasks[taskIndex].actualCompletionDate = actualDate;
        tasks[taskIndex].closureNotes = document.getElementById('closureNotes').value;
        
        showNotification('Задание закрыто. Статус изменен на "Закрыт"', 'success');
        closeModal();
        updateOfficeView();
    }
}

// Открытие модального окна создания заявки на подбор
function openRecruitmentModal() {
    const task = tasks.find(t => t.id === currentTaskId);
    if (!task) return;
    
    document.getElementById('taskForRecruitment').textContent = task.name;
    document.getElementById('recruitmentSpecialization').value = task.specialization;
    
    // Устанавливаем дедлайн через 2 недели от текущей даты
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 14);
    document.getElementById('recruitmentDeadline').value = deadline.toISOString().split('T')[0];
    
    openModal('recruitmentModal');
}

// Создание заявки на подбор
function createRecruitmentRequest() {
    const specialization = document.getElementById('recruitmentSpecialization').value;
    const deadline = document.getElementById('recruitmentDeadline').value;
    const requirements = document.getElementById('recruitmentRequirements').value;
    const task = tasks.find(t => t.id === currentTaskId);
    
    if (!specialization || !deadline || !task) return;
    
    const newRequest = {
        id: recruitmentRequests.length + 1,
        taskId: currentTaskId,
        store: task.store,
        specialization: specialization,
        deadline: deadline,
        requirements: requirements,
        status: 'new', // Автоматически присваивается статус "новая" (История 6)
        createdDate: new Date().toISOString().split('T')[0],
        createdBy: 'office'
    };
    
    recruitmentRequests.push(newRequest);
    
    // Создаем уведомление для HR (История 11)
    const newNotification = {
        id: notifications.length + 1,
        title: "Новая заявка на подбор",
        message: `Поступила новая заявка на подбор ${specialization} для ${task.store}`,
        date: new Date().toLocaleString('ru-RU'),
        read: false,
        link: "#"
    };
    
    notifications.unshift(newNotification);
    
    showNotification('Заявка на подбор создана. Уведомление отправлено HR', 'success');
    closeModal();
    
    // Скрываем секцию подбора
    document.getElementById('specialistSection').style.display = 'none';
    document.getElementById('noSpecialists').style.display = 'none';
    
    // Если HR сейчас активен, обновляем его интерфейс
    if (currentRole === 'hr') {
        updateHRView();
    }
}

// Принятие заявки на подбор в работу
function acceptRecruitmentRequest(requestId) {
    const requestIndex = recruitmentRequests.findIndex(r => r.id === requestId);
    if (requestIndex !== -1) {
        recruitmentRequests[requestIndex].status = 'in-progress';
        showNotification('Заявка принята в работу. Статус изменен на "В работе"', 'success');
        updateHRView();
    }
}

// Добавление специалиста для заявки
function addSpecialistForRequest(requestId) {
    const request = recruitmentRequests.find(r => r.id === requestId);
    if (!request) return;
    
    // Показываем форму добавления специалиста
    document.getElementById('addSpecialistSection').style.display = 'block';
    document.getElementById('specialistPosition').value = request.specialization;
    document.getElementById('relatedRequest').value = `Заявка #${request.id} для ${request.store}`;
    
    // Прокручиваем к форме
    document.getElementById('addSpecialistSection').scrollIntoView({ behavior: 'smooth' });
}

// Добавление нового специалиста
function addNewSpecialist() {
    const name = document.getElementById('specialistName').value;
    const position = document.getElementById('specialistPosition').value;
    const phone = document.getElementById('specialistPhone').value;
    const email = document.getElementById('specialistEmail').value;
    const status = document.getElementById('specialistStatus').value;
    const experience = document.getElementById('specialistExperience').value;
    
    if (!name || !position || !phone) {
        showNotification('Заполните обязательные поля (ФИО, специализация, телефон)', 'error');
        return;
    }
    
    const newSpecialist = {
        id: specialists.length + 1,
        name: name,
        position: position,
        phone: phone,
        email: email || '',
        status: status,
        experience: experience || 'Опыт не указан',
        storePreferences: ['Все магазины']
    };
    
    specialists.push(newSpecialist);
    
    showNotification('Специалист добавлен в систему "Персонал". Теперь доступен для поиска.', 'success');
    
    // Скрываем форму
    document.getElementById('addSpecialistSection').style.display = 'none';
    
    // Очищаем форму
    document.getElementById('addSpecialistForm').reset();
    
    // Обновляем интерфейс
    updateHRView();
}

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// Открытие модального окна
function openModal(modalId) {
    document.getElementById('modalOverlay').style.display = 'flex';
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.getElementById(modalId).style.display = 'block';
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Простое модальное окно для отображения информации
function alertModal(title, content) {
    const modalId = 'alertModal';
    
    // Удаляем старую модалку, если есть
    const oldModal = document.getElementById(modalId);
    if (oldModal) {
        oldModal.remove();
    }
    
    // Создаем новую модалку
    const modalHTML = `
        <div class="modal" id="${modalId}">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline modal-close" onclick="closeModal()">Закрыть</button>
            </div>
        </div>
    `;
    
    document.getElementById('modalOverlay').innerHTML += modalHTML;
    document.getElementById('modalOverlay').style.display = 'flex';
    document.getElementById(modalId).style.display = 'block';
}

// Форматирование даты
function formatDate(dateString) {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString('ru-RU');
    } catch (e) {
        return dateString;
    }
}

// Получение текста статуса
function getStatusText(status) {
    switch(status) {
        case 'new': return 'Новый';
        case 'in-progress': return 'В работе';
        case 'completed': return 'Выполнен';
        case 'closed': return 'Закрыт';
        case 'cancelled': return 'Отменен';
        default: return status;
    }
}

function getRecruitmentStatusText(status) {
    switch(status) {
        case 'new': return 'Новая';
        case 'in-progress': return 'В работе';
        case 'completed': return 'Завершена';
        default: return status;
    }
}

// Показ уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Добавляем в body
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Удаление при клике
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Функция для обновления фильтрации заданий магазина
function filterStoreTasks() {
    renderStoreTasks();
}

// Экспорт функций для использования в HTML
window.sendTaskModal = sendTaskModal;
window.cancelTaskModal = cancelTaskModal;
window.closeTaskModal = closeTaskModal;
window.editTask = editTask;
window.viewTaskDetails = viewTaskDetails;
window.selectTaskForSpecialists = selectTaskForSpecialists;
window.toggleSpecialistSelection = toggleSpecialistSelection;
window.selectSpecialist = selectSpecialist;
window.removeSelectedSpecialist = removeSelectedSpecialist;
window.acceptRecruitmentRequest = acceptRecruitmentRequest;
window.addSpecialistForRequest = addSpecialistForRequest;
window.viewRecruitmentDetails = viewRecruitmentDetails;
window.markNotificationAsRead = markNotificationAsRead;
window.closeModal = closeModal;