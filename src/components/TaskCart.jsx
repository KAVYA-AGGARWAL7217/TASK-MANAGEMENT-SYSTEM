import React, { useState } from 'react';
import '../styles/TaskCart.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
const TaskCart = ({ 
  id,
  title, 
  description, 
  startDate, 
  endDate, 
  priority, 
  status,
  onStatusChange,
  onDelete,
  onUpdate
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStartDate, setEditedStartDate] = useState(startDate);
  const [editedEndDate, setEditedEndDate] = useState(endDate);
  const [editedPriority, setEditedPriority] = useState(priority);

  let priorityClassName = '';
  switch (priority) {
    case 'High':
      priorityClassName = 'high-priority';
      break;
    case 'Medium':
      priorityClassName = 'medium-priority';
      break;
    case 'Low':
      priorityClassName = 'low-priority';
      break;
    default:
      break;
  }

  const calculateProgress = () => {
    if (!editedStartDate || !editedEndDate) return 0;
    const start = new Date(editedStartDate);
    const end = new Date(editedEndDate);
    const now = new Date();
    if (now < start) return 0;
    if (now >= end) return 100;
    const totalDuration = end - start;
    const elapsed = now - start;
    return (elapsed / totalDuration) * 100;
  };

  const getTimeLeft = () => {
    if (!editedStartDate || !editedEndDate) return '';
    const end = new Date(editedEndDate);
    const now = new Date();
    const diff = end - now;
    if (diff <= 0) {
        switch(status) {
          case 'Completed':
            return 'Completed';
          case 'InProgress':
            return 'Overdue! Finish Up!';
          default:
            return 'Missed Deadline!';
        }
      }
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} left`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} left`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} left`;
    return `${minutes} minute${minutes > 1 ? 's' : ''} left`;
  };

  const progress = calculateProgress();
  const timeLeft = status === 'Completed' ? 'Completed' : getTimeLeft();

  const handleStatusChange = () => {
    let newStatus;
    if (status === 'Todo') {
      newStatus = 'InProgress';
    } else if (status === 'InProgress') {
      newStatus = 'Completed';
    } else {
      return;
    }
    onStatusChange(id, newStatus);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(id, {
      title: editedTitle,
      description: editedDescription,
      startDate: editedStartDate,
      endDate: editedEndDate,
      priority: editedPriority,
    });
    setIsEditing(false);
  };

  const getButtonText = () => {
    switch(status) {
      case 'Todo': return 'Start Progress';
      case 'InProgress': return 'Mark Complete';
      default: return '';
    }
  };

  if (isEditing) {
    return (
      <div className="modal-overlay"> {/* Using modal-overlay for consistency */}
        <div className="modal-content"> {/* Using modal-content for consistency */}
          <div className="modal-header">
            <h2>Edit Task</h2>
            <button className="close-button" onClick={() => setIsEditing(false)}>
              &times;
            </button>
          </div>
          <form className="task-form"> {/* Using task-form for consistency */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row date-row">
              <div className="form-group">
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={editedStartDate}
                  onChange={(e) => setEditedStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={editedEndDate}
                  onChange={(e) => setEditedEndDate(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
              <button type="button" className="submit-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="task-cart">
      <div className="task-cart-content">
        <div className='task-main-heading'>
          <div className='task-heading1'>
            <h2 className="task-cart-title">{title}</h2>
            {priority && (
              <div className={`task-cart-priority ${priorityClassName}`}>
                {priority} Priority
              </div>
            )}
          </div>
          <div className='button-container'>
        <button className="delete-button" onClick={handleDelete} title="Delete task">
          <FaTrashAlt />
        </button>
        <button className="edit-button" onClick={handleEdit} title="Edit task">
          <FaEdit />
        </button>
      </div>
        </div>
        <div className="task-cart-header">
          {
            <div className={`task-cart-priority ${progress === 100 ? 'high-priority' : 'medium-priority'}`}>
              {(progress == 100)
                ? 'Task Time ended' 
                : `${startDate} to ${endDate}`}
            </div>
          }
        </div>
        <p className="task-cart-description">{description}</p>
      </div>
      <div className="task-cart-footer">
        <div className="task-cart-progress-bar">
          <div className="task-cart-progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="task-cart-progress-text">
          <span>{progress.toFixed(0)}%</span>
          <span>{timeLeft}</span>
        </div>
        {status !== 'Completed' && (
          <button 
            className={`status-button ${status === 'Todo' ? 'start-button' : 'complete-button'}`}
            onClick={handleStatusChange}
          >
            {getButtonText()}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCart;