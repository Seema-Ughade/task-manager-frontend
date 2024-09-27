import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal, Button } from 'antd'; // Import Ant Design Modal and Button

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({});
  const [error, setError] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [isModalVisible, setIsModalVisible] = useState(false); // State for task assignment modal
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    projectId: '',
    dueDate: '',
    status: 'pending',
    pageSize: 10,
    sortBy: 'title'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsResponse = await axios.get("https://task-manager-backend-btas.onrender.com/api/projects");
        setProjects(projectsResponse.data);

        const usersResponse = await axios.get('https://task-manager-backend-btas.onrender.com/api/users');
        setUsers(usersResponse.data);

        const tasksResponse = await axios.get('https://task-manager-backend-btas.onrender.com/api/tasks');
        const columnsResponse = await axios.get('https://task-manager-backend-btas.onrender.com/api/columns');
        setTasks(tasksResponse.data);
        setColumns(columnsResponse.data);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleToggleView = () => {
    setViewType((prevType) => (prevType === 'grid' ? 'list' : 'grid'));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    handleReset(); // Reset task data on cancel
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-manager-backend-btas.onrender.com/api/tasks', taskData);
      setTasks((prevTasks) => [...prevTasks, response.data]);
      handleCancel(); // Close the modal after adding task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`https://task-manager-backend-btas.onrender.com/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Use _id for filtering
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.columnId = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  const handleReset = () => {
    setTaskData({
      title: '',
      description: '',
      assignedTo: '',
      projectId: '',
      dueDate: '',
      status: 'pending',
      pageSize: 10,
      sortBy: 'title'
    });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mb-6">
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">KANBAN List</h1>
        <nav className="flex items-center">
          <Button
            onClick={showModal}
            className="bg-yellow-400 text-white hover:bg-yellow-500 transition"
            title="Assign Task"
          >
            Assign To
          </Button>
          <Button
            onClick={handleToggleView}
            className="bg-blue-600 text-white ml-2 hover:bg-blue-700 transition"
            title="Toggle View"
          >
            {viewType === 'grid' ? 'List View' : 'Grid View'}
          </Button>
        </nav>
      </div>

      {/* Assign Task Modal */}
      <Modal
        title="Assign Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No default footer
      >
        <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1" htmlFor="assignedTo">Assign To</label>
            <select name="assignedTo" value={taskData.assignedTo} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1" htmlFor="projectId">Project</label>
            <select name="projectId" value={taskData.projectId} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1" htmlFor="dueDate">Due Date</label>
            <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleInputChange} className="form-input border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div>
            <label className="block mb-1" htmlFor="status">Status</label>
            <select name="status" value={taskData.status} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="in-progress">In Progress</option>
            </select>
          </div>
          <div>
            <label className="block mb-1" htmlFor="pageSize">Page Size</label>
            <input type="number" name="pageSize" value={taskData.pageSize} onChange={handleInputChange} className="form-input border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div>
            <label className="block mb-1" htmlFor="sortBy">Sort By</label>
            <select name="sortBy" value={taskData.sortBy} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
              <option value="title">Title</option>
              <option value="dueDate">Due Date</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="col-span-3 flex justify-between">
  <Button onClick={handleReset} className="w-1/3 mr-1">
    Reset
  </Button>
  <Button type="primary" htmlType="submit" className="w-1/3 ml-1">
    Submit
  </Button>
</div>
        </form>
      </Modal>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable key={columnId} droppableId={columnId}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="task-column">
                <h2 className="text-lg font-semibold mb-2">{column.title}</h2>
                {tasks.filter(task => task.columnId === columnId).map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="task-card border border-gray-300 rounded-md p-2 mb-2 shadow"
                      >
                        <p>{task.title}</p>
                        <button onClick={() => handleDeleteTask(task._id)} className="text-red-600">Delete</button>
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

export default Tasks;