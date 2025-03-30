import { useEffect, useState } from 'react';
import './App.css';
import TaskCart from './components/TaskCart';
import './styles/CreateCArt.css'

function App() {
  const [tododata, setTododata] = useState(() => {
    const storedData = localStorage.getItem('todoTasks');
    return storedData ? JSON.parse(storedData) : [
        {
          id: 1,
          title: 'Math Homework - Linear Algebra',
          description: 'Complete chapter 5 exercises on matrix operations',
          startDate: '2025-03-28',
          endDate: '2025-03-31',
          priority: 'High',
          status: 'Todo'
        },
        {
          id: 2,
          title: 'Computer Science Project',
          description: 'Work on React components for final project',
          startDate: '2025-04-01',
          endDate: '2025-04-15',
          priority: 'High',
          status: 'InProgress'
        },
        {
          id: 3,
          title: 'Literature Essay',
          description: 'Write 1500-word essay on Shakespearean themes',
          startDate: '2025-04-10',
          endDate: '2025-04-30',
          priority: 'Medium',
          status: 'Completed'
        },
        {
          id: 4,
          title: 'Chemistry Lab Report',
          description: 'Analyze titration experiment results',
          startDate: '2025-04-05',
          endDate: '2025-04-12',
          priority: 'High',
          status: 'InProgress'
        },
        {
          id: 5,
          title: 'Study for Physics Midterm',
          description: 'Review chapters 1-4 on thermodynamics',
          startDate: '2025-04-15',
          endDate: '2025-04-20',
          priority: 'High',
          status: 'Todo'
        },
        {
          id: 6,
          title: 'Buy Textbooks',
          description: 'Purchase required books for next semester',
          startDate: '2025-05-01',
          endDate: '2025-05-10',
          priority: 'Low',
          status: 'Todo'
        },
        {
          id: 7,
          title: 'History Presentation',
          description: 'Prepare slides on Cold War events',
          startDate: '2025-04-08',
          endDate: '2025-04-22',
          priority: 'Medium',
          status: 'InProgress'
        },
        {
          id: 8,
          title: 'Register for Fall Classes',
          description: 'Select courses and complete registration',
          startDate: '2025-04-25',
          endDate: '2025-05-05',
          priority: 'High',
          status: 'Todo'
        },
        {
          id: 9,
          title: 'Psychology Reading',
          description: 'Read chapter 7 on cognitive development',
          startDate: '2025-04-03',
          endDate: '2025-04-10',
          priority: 'Low',
          status: 'Completed'
        },
        {
          id: 10,
          title: 'Group Meeting - CS Project',
          description: 'Weekly sync with project team members',
          startDate: '2025-04-05',
          endDate: '2025-04-05',
          priority: 'Medium',
          status: 'Completed'
        },
        {
          id: 11,
          title: 'Foreign Language Practice',
          description: 'Complete 30 mins of Spanish conversation practice',
          startDate: '2025-04-15',
          endDate: '2025-04-15',
          priority: 'Low',
          status: 'Todo'
        },
        {
          id: 12,
          title: 'Research Paper Outline',
          description: 'Create structure for economics research paper',
          startDate: '2025-04-18',
          endDate: '2025-04-25',
          priority: 'Medium',
          status: 'InProgress'
        },
        {
          id: 13,
          title: 'Update Resume',
          description: 'Add recent projects and skills',
          startDate: '2025-05-01',
          endDate: '2025-05-15',
          priority: 'Low',
          status: 'Todo'
        },
        {
          id: 14,
          title: 'Math Tutoring Session',
          description: 'Meet with tutor to review calculus concepts',
          startDate: '2025-04-09',
          endDate: '2025-04-09',
          priority: 'High',
          status: 'Completed'
        },
        {
          id: 15,
          title: 'Biology Lab Prep',
          description: 'Read protocol for next week\'s dissection lab',
          startDate: '2025-04-14',
          endDate: '2025-04-17',
          priority: 'Medium',
          status: 'Todo'
        },
        {
          id: 16,
          title: 'Programming Assignment',
          description: 'Implement Dijkstra\'s algorithm in Python',
          startDate: '2025-04-20',
          endDate: '2025-04-27',
          priority: 'High',
          status: 'InProgress'
        },
        {
          id: 17,
          title: 'Library Book Return',
          description: 'Return overdue books before fines accumulate',
          startDate: '2025-04-22',
          endDate: '2025-04-25',
          priority: 'Low',
          status: 'Todo'
        },
        {
          id: 18,
          title: 'Art History Presentation',
          description: 'Prepare analysis of Renaissance paintings',
          startDate: '2025-04-11',
          endDate: '2025-04-18',
          priority: 'Medium',
          status: 'Completed'
        },
        {
          id: 19,
          title: 'Internship Application',
          description: 'Submit application for summer internship',
          startDate: '2025-05-01',
          endDate: '2025-05-10',
          priority: 'High',
          status: 'Todo'
        },
        {
          id: 20,
          title: 'Study Group - Finals Prep',
          description: 'Organize study session for final exams',
          startDate: '2025-05-05',
          endDate: '2025-05-12',
          priority: 'Medium',
          status: 'Todo'
        }
    ];
  });
  

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'Medium',
    status: 'Todo'
  });
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState({
    status: 'All',
    priority: 'All',
    dateRange: 'All'
  });

  const [sortOption, setSortOption] = useState('date-asc');

  // Get filtered tasks
  const getFilteredTasks = () => {
    let filtered = [...tododata];

    // Status filter
    if (filter.status !== 'All') {
      filtered = filtered.filter(task => task.status === filter.status);
    }

    // Priority filter
    if (filter.priority !== 'All') {
      filtered = filtered.filter(task => task.priority === filter.priority);
    }

    // Date range filter
    const now = new Date();
    if (filter.dateRange !== 'All') {
      filtered = filtered.filter(task => {
        if (!task.startDate || !task.endDate) return false;
        const start = new Date(task.startDate);
        const end = new Date(task.endDate);

        switch(filter.dateRange) {
          case 'Today':
            return now >= start && now <= end;
          case 'This Week':
            const weekEnd = new Date();
            weekEnd.setDate(weekEnd.getDate() + 7);
            return (start <= weekEnd) && (end >= now);
          case 'Upcoming':
            return start > now;
          case 'Overdue':
            return end < now;
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  // Sort tasks
  const getSortedTasks = (tasks) => {
    const sorted = [...tasks];
    
    switch(sortOption) {
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
      case 'priority':
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case 'title-desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sorted;
    }
  };

  const filteredTasks = getFilteredTasks();
  const sortedTasks = getSortedTasks(filteredTasks);


  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tododata));
  }, [tododata]);

  const todoTasks = sortedTasks.filter(task => task.status === "Todo");
  console.log(todoTasks)
  const inProgressTasks = sortedTasks.filter(task => task.status === "InProgress");
  const completedTasks = sortedTasks.filter(task => task.status === "Completed");

  const validateForm = () => {
    const newErrors = {};
    if (!newTask.title.trim()) newErrors.title = 'Title is required';
    if (!newTask.description.trim()) newErrors.description = 'Description is required';
    if (!newTask.startDate) newErrors.startDate = 'Start date is required';
    if (!newTask.endDate) newErrors.endDate = 'End date is required';
    
    if (newTask.startDate && newTask.endDate) {
      const start = new Date(newTask.startDate);
      const end = new Date(newTask.endDate);
      if (start > end) newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTododata(prevData => 
      prevData.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTododata(prevData => prevData.filter(task => task.id !== taskId));
    }
  };

  const handleAddTask = () => {
    setShowModal(true);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };
  const updateTask = (taskId, updatedTask) => {
    setTododata((prevData) =>
      prevData.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task))
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const taskWithId = {
      ...newTask,
      id: Date.now()
    };

    

    setTododata(prev => [...prev, taskWithId]);
    setNewTask({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      priority: 'Medium',
      status: 'Todo'
    });
    setShowModal(false);
  };

  return (
    <>
      <nav className="nav">
        <p>MY TASK MANAGER</p>
      </nav>
      <div className="controls-container">
        <div className="filter-controls">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={filter.status}
              onChange={(e) => setFilter({...filter, status: e.target.value})}
            >
              <option value="All">All Status</option>
              <option value="Todo">Todo</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Priority:</label>
            <select 
              value={filter.priority}
              onChange={(e) => setFilter({...filter, priority: e.target.value})}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Date Range:</label>
            <select 
              value={filter.dateRange}
              onChange={(e) => setFilter({...filter, dateRange: e.target.value})}
            >
              <option value="All">All Dates</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="sort-controls">
          <label>Sort By:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="date-asc">Date (Oldest First)</option>
            <option value="date-desc">Date (Newest First)</option>
            <option value="priority">Priority</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>
      <div className="ul-container">
        <div className="task-list">
          <h2>TASK TODO </h2>
          <p>{todoTasks.length}</p>
        </div>
        <div className="task-list">
          <h2>IN PROGRESS TASK</h2>
          <p>{inProgressTasks.length}</p>
        </div>
        <div className="task-list">
          <h2>COMPLETED</h2>
          <p>{completedTasks.length}</p>
        </div>
        <div className="task-list" onClick={handleAddTask}>
          <h2>ADD NEW TASK</h2>
          <p>+</p>
        </div>
      </div>

      {/* Task Lists */}
      {(todoTasks.length + inProgressTasks.length + completedTasks.length === 0) && (
  <div className="no-tasks-container">
    <div className="no-tasks-illustration">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="#3f527a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12L15 15M15 15L12 18M15 15L9 15" stroke="#3f527a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 5C9 3.34315 10.3431 2 12 2C13.6569 2 15 3.34315 15 5" stroke="#3f527a" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
    <h3 className="no-tasks-title">
      {filter.status === 'All' 
        ? 'No Active Tasks' 
        : `No ${filter.status === 'InProgress' ? 'In Progress' : filter.status} Tasks`}
    </h3>
    <p className="no-tasks-message">
      {filter.status === 'Completed'
        ? 'No tasks have been completed yet.'
        : filter.status === 'All'
          ? 'You\'re all caught up! Enjoy your free time or '
          : `No ${filter.status === 'InProgress' ? 'in progress' : 'to-do'} tasks found. `}
      
      {filter.status !== 'Completed' && (
        <>
          {filter.status === 'All' ? '' : 'You can '}
          <button className="add-task-link" onClick={handleAddTask}>
            {filter.status === 'All' ? 'create a new task' : 'add one now'}
          </button>
          {filter.status === 'All' ? ' to get started.' : ''}
        </>
      )}
    </p>
  </div>
)}
      {todoTasks.length>0 &&<div className="list-container">
        <h2 className="list-header">TODO TASK</h2>
        <div className='task-list-container'>
          {todoTasks.map((data) => (
            <TaskCart 
              key={data.id}
              id={data.id}
              title={data.title}
              description={data.description}
              startDate={data.startDate}
              endDate={data.endDate}
              priority={data.priority}
              status={data.status}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      </div>}
      
      {inProgressTasks.length>0 &&<div className="list-container">
        <h2 className="list-header">IN PROGRESS TASK</h2>
        <div className='task-list-container'>
          {inProgressTasks.map((data) => (
            <TaskCart 
              key={data.id}
              id={data.id}
              title={data.title}
              description={data.description}
              startDate={data.startDate}
              endDate={data.endDate}
              priority={data.priority}
              status={data.status}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      </div>}
      
      {completedTasks.length>0 &&<div className="list-container">
        <h2 className="list-header">COMPLETED TASK</h2>
        <div className='task-list-container'>
          {completedTasks.map((data) => (
            <TaskCart 
              key={data.id}
              id={data.id}
              title={data.title}
              description={data.description}
              startDate={data.startDate}
              endDate={data.endDate}
              priority={data.priority}
              status={data.status}
              onStatusChange={updateTaskStatus}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))}
        </div>
      </div>}

      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2>Create New Task</h2>
        <button className="close-button" onClick={() => setShowModal(false)}>
          &times;
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title*</label>
            <input
              id="title"
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              className={errors.title ? 'error' : ''}
              placeholder="Enter task title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              className={errors.description ? 'error' : ''}
              placeholder="Describe the task"
              rows="3"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
        </div>

        <div className="form-row date-row">
          <div className="form-group">
            <label htmlFor="startDate">Start Date*</label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={newTask.startDate}
              onChange={handleInputChange}
              className={errors.startDate ? 'error' : ''}
            />
            {errors.startDate && <span className="error-message">{errors.startDate}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="endDate">End Date*</label>
            <input
              id="endDate"
              type="date"
              name="endDate"
              value={newTask.endDate}
              onChange={handleInputChange}
              className={errors.endDate ? 'error' : ''}
            />
            {errors.endDate && <span className="error-message">{errors.endDate}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={newTask.priority}
              onChange={handleInputChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Task
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </>
  );
}

export default App;