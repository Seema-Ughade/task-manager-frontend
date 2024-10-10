
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal, Button, notification, Spin } from 'antd';

const SubTasks = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({});
  const [error, setError] = useState('');
  // const [viewType, setViewType] = useState('grid');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [taskDataNew, settaskDataNew] = useState({
    title: '',
    description: '',
    assignedTo: '',
    projectId: '',
    dueDate: '',
    status: 'pending',
    priority: 'low',
    estimateTime: '',
    tags: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectsResponse = await axios.get("https://task-manager-backend-1-3zvs.onrender.com/api/projects");
        const usersResponse = await axios.get('https://task-manager-backend-1-3zvs.onrender.com/api/users');
        const tasksResponse = await axios.get('https://task-manager-backend-1-3zvs.onrender.com/api/tasks');
        const columnsResponse = await axios.get('https://task-manager-backend-1-3zvs.onrender.com/api/columns');

        setProjects(projectsResponse.data);
        setUsers(usersResponse.data);
        setTasks(tasksResponse.data);
        setColumns(columnsResponse.data);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const handleToggleView = () => {
  //   setViewType((prevType) => (prevType === 'grid' ? 'list' : 'grid'));
  // };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    handleReset();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    settaskDataNew((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-manager-backend-1-3zvs.onrender.com/api/tasks', taskDataNew);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      notification.success({ message: 'Task added successfully!' });
      handleCancel(); // Close modal and reset form
    } catch (error) {
      console.error("Error adding task:", error);
      notification.error({ message: 'Failed to add task. Please try again.' });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-manager-backend-1-3zvs.onrender.com/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
      notification.success({ message: 'Task deleted successfully!' });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.columnId = result.destination.droppableId; // Update the column ID
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);

    // Here you can call an API to update the task's column ID on the server if needed
  };

  const handleReset = () => {
    settaskDataNew({
      title: '',
      description: '',
      assignedTo: '',
      projectId: '',
      dueDate: '',
      status: 'pending',
      priority: 'low',
      estimateTime: '',
      tags: '',
    });
  };

  if (loading) return <Spin size="large" />; // Show loading spinner while fetching data

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-6">
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">KANBAN List</h1>
        <nav className="flex items-center">
          <Button onClick={showModal} className="bg-yellow-400 text-white hover:bg-yellow-500 transition">
            Add Task
          </Button>
          {/* <Button onClick={handleToggleView} className="bg-blue-600 text-white ml-2 hover:bg-blue-700 transition">
            {viewType === 'grid' ? 'List View' : 'Grid View'}
          </Button> */}
        </nav>
      </div>

      {/* Add Task Modal */}
      <Modal title="Add Task" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1" htmlFor="title">Title</label>
            <input type="text" name="title" value={taskDataNew.title} onChange={handleInputChange} className="form-input border border-gray-300 rounded-md p-2 w-full" required />
          </div>
          <div>
            <label className="block mb-1" htmlFor="projectId">Project</label>
            <select name="projectId" value={taskDataNew.projectId} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project._id} value={project._id}>{project.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1" htmlFor="priority">Priority</label>
            <select name="priority" value={taskDataNew.priority} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block mb-1" htmlFor="dueDate">Due Date</label>
            <input type="date" name="dueDate" value={taskDataNew.dueDate} onChange={handleInputChange} className="form-input border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div>
            <label className="block mb-1" htmlFor="estimateTime">Estimate Time (hours)</label>
            <input type="number" name="estimateTime" value={taskDataNew.estimateTime} onChange={handleInputChange} className="form-input border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div>
            <label className="block mb-1" htmlFor="assignedTo">Assigned To</label>
            <select name="assignedTo" value={taskDataNew.assignedTo} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="col-span-3">
            <label className="block mb-1" htmlFor="description">Description</label>
            <textarea name="description" value={taskDataNew.description} onChange={handleInputChange} className="form-textarea border border-gray-300 rounded-md p-2 w-full" rows="3"></textarea>
          </div>
          <div className="col-span-3 flex justify-end">
            <Button type="primary" htmlType="submit">Add Task</Button>
          </div>
        </form>
      </Modal>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="p-2 border border-gray-300 rounded-md">
                <h2 className="font-bold mb-2">{column.name}</h2>
                {tasks.filter(task => task.columnId === columnId).map((task, index) => (
                  <Draggable draggableId={task._id} index={index} key={task._id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white border border-gray-300 rounded-md p-2 mb-2 shadow"
                      >
                        <h3 className="font-semibold">{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">{task.assignedTo}</span>
                          <Button type="link" onClick={() => handleDeleteTask(task._id)} className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default SubTasks;
