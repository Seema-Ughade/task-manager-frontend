// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { Modal, Button } from 'antd'; // Import Ant Design Modal and Button
// import ReactQuill from 'react-quill';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';

// const Tasks = () => {
//   const [projects, setProjects] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [statuses, setStatuses] = useState({});
//   const [error, setError] = useState('');
//   const [viewType, setViewType] = useState('grid');
//   const [isModalVisible, setIsModalVisible] = useState(false); // State for task assignment modal
//   const [isModalVisibleNew, setIsModalVisibleNew] = useState(false); // State for task assignment modal
//   const [taskData, setTaskData] = useState({
//     title: '',
//     description: '',
//     assignedTo: '',
//     projectId: '',
//     dueDate: '',
//     status: 'pending',
//     pageSize: 10,
//     sortBy: 'title'
//   });
//   const [addTask, setaddTask] = useState({
//     title: '',
//     description: '',
//     assignedTo: '',
//     projectId: '',
//     dueDate: '',
//     status: 'pending',
//     priority: 'low',
//     estimateTime: '',
//     tags: '',
//   });


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch projects and users first
//         const projectsResponse = await axios.get("https://task-manager-backend-btas.onrender.com/api/projects");
//         setProjects(projectsResponse.data);
  
//         const usersResponse = await axios.get('https://task-manager-backend-btas.onrender.com/api/users');
//         setUsers(usersResponse.data);
  
//         // Fetch statuses and tasks concurrently
//         const [statusesResponse, tasksResponse] = await Promise.all([
//           axios.get('https://task-manager-backend-btas.onrender.com/api/statuses'),
//           axios.get('https://task-manager-backend-btas.onrender.com/api/tasks'),
//         ]);
  
//         const statuses = statusesResponse.data;
//         const tasks = tasksResponse.data;
  
//         // Format statuses to a more usable format
//         const formattedStatuses = statuses.reduce((acc, status) => {
//           acc[status._id] = { title: status.name };
//           return acc;
//         }, {});
  
//         // Map tasks to include statusId
//         const tasksWithStatusId = tasks.map(task => {
//           const defaultStatusId = Object.keys(formattedStatuses)[0]; // Link to the first status (change logic as needed)
//           return { ...task, statusId: task.statusId || defaultStatusId }; // Fallback to default if missing
//         });
  
//         // Set states
//         setTasks(tasksWithStatusId);
//         setStatuses(formattedStatuses);
//       } catch (error) {
//         setError("Failed to fetch data. Please try again.");
//         console.error("Error fetching data:", error.response ? error.response.data : error.message);
//       }
//     };
  
//     fetchData();
//   }, []);
  
//   const handleToggleView = () => {
//     setViewType((prevType) => (prevType === 'grid' ? 'list' : 'grid'));
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };
//   const showModalNew = () => {
//     setIsModalVisibleNew(true);
//   };


//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setIsModalVisibleNew(false);
//     handleReset(); // Reset task data on cancel
//   };

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setTaskData((prevData) => ({ ...prevData, [name]: value }));
//   //   setaddTask((prevData) => ({ ...prevData, [name]: value }));

//   // };
//   const handleInputChange = (e) => {
//     // Check if e.target is defined to avoid destructuring errors
//     if (e.target) {
//       const { name, value } = e.target;
//       setTaskData((prevData) => ({ ...prevData, [name]: value }));
//       setaddTask((prevData) => ({ ...prevData, [name]: value }));
//     } else {
//       // Handle ReactQuill specific onChange event
//       setTaskData((prevData) => ({ ...prevData, description: e }));
//       setaddTask((prevData) => ({ ...prevData, description: e }));
//     }
//   };
  

//   const handleAddTask = async (event) => {
//     event.preventDefault();
    
//     const formData = new FormData();
//     formData.append('title', addTask.title);
//     formData.append('projectId', addTask.projectId);
//     formData.append('priority', addTask.priority);
//     formData.append('assignedTo', addTask.assignedTo);
//     formData.append('dueDate', addTask.dueDate);
//     formData.append('estimateTime', addTask.estimateTime);
//     formData.append('tags', addTask.tags); // Tags should be a comma-separated string
//     formData.append('description', addTask.description);
    
//     // Append attachments
//     const attachments = document.querySelector('input[name="attachments"]').files;
//     for (let i = 0; i < attachments.length; i++) {
//       formData.append('attachments', attachments[i]);
//     }
  
//     try {
//       const response = await axios.post('https://task-manager-backend-btas.onrender.com/api/tasks', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setIsModalVisibleNew(false);

//       // Optionally show a success message (e.g., using Toast)
//       toast.success('Task added successfully!');
  
//       console.log('Task added successfully:', response.data);
//       // Reset form and close modal or handle success
//     } catch (error) {
//       console.error('Error adding task:', error.response.data);
//       // Handle error appropriately (e.g., show a notification)
//     }
//   };
  


//   //   const handleAssignTask = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const responsedata = await axios.post('https://task-manager-backend-btas.onrender.com/api/Assigntask', addTask);

//   //     setaddTask((prevTasks) => [...prevTasks, responsedata.data]);

//   //     handleCancel(); // Close the modal after adding task
//   //   } catch (error) {
//   //     console.error("Error adding task:", error);
//   //   }
//   // };
//   const handleAssignTask = async (e) => {
//     e.preventDefault();
  
//     const formData = {
//       assignedTo: taskData.assignedTo,
//       projectId: taskData.projectId,
//       dueDate: taskData.dueDate,
//       status: taskData.status,
//       pageSize: taskData.pageSize,
//       sortBy: taskData.sortBy,
//     };
    
  
//     try {
//       // Send POST request to the API
//       const response = await axios.post(
//         'https://task-manager-backend-btas.onrender.com/api/Assigntask', 
//         formData
//       );
  
//       // Handle successful response (add task to state, show success message, etc.)
//       setTasks((prevTasks) => [...prevTasks, response.data]);
//       setIsModalVisible(false);
  
//       toast.success('Task assigned successfully!');
//     } catch (error) {
//       // Handle error
//       console.error('Error assigning task:', error.response?.data || error);
//       toast.error('Failed to assign task');
//     }
//   };
  



//   const handleDeleteTask = async (taskId) => {
//     try {
//       await axios.delete(`https://task-manager-backend-btas.onrender.com/api/tasks/${taskId}`);
//       setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Use _id for filtering
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };


  
//   // const handleOnDragEnd = (result) => {
//   //   if (!result.destination) return;

//   //   const updatedTasks = [...tasks];
//   //   const [movedTask] = updatedTasks.splice(result.source.index, 1);
//   //   movedTask.columnId = result.destination.droppableId;
//   //   updatedTasks.splice(result.destination.index, 0, movedTask);
//   //   setTasks(updatedTasks);
//   // };

//   const handleOnDragEnd = (result) => {
//     if (!result.destination) return; // Do nothing if dropped outside a valid area

//     const updatedTasks = [...tasks]; // Create a copy of the current tasks
//     const [movedTask] = updatedTasks.splice(result.source.index, 1); // Remove the dragged task
//     movedTask.statusId = result.destination.droppableId; // Update the statusId of the moved task
//     updatedTasks.splice(result.destination.index, 0, movedTask); // Insert the task into the new position
//     setTasks(updatedTasks); // Update the state with the new tasks order
// };





//   const handleReset = () => {
//     setTaskData({
//       title: '',
//       description: '',
//       assignedTo: '',
//       projectId: '',
//       dueDate: '',
//       status: 'pending',
//       pageSize: 10,
//       sortBy: 'title'
//     });
//     setaddTask({
//       title: '',
//       description: '',
//       assignedTo: '',
//       projectId: '',
//       dueDate: '',
//       status: 'pending',
//       priority: 'low',
//       estimateTime: '',
//       tags: '',
//     });

//   };

//   return (
//     <div className="p-4 bg-white shadow-md rounded-lg mt-5  mb-6">
//       {error && <p className="text-red-600">{error}</p>}
//       <div className="flex bg-gray-100 p-8 justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">TASKS</h1>
//         <nav className="flex gap-2 items-center">
//           <Button
//             onClick={showModal}
//             className="bg-yellow-400 w-28  text-white hover:bg-yellow-500 transition"
//             title="Assign Task"
//           >
//             Assign To
//           </Button>
//           <Button
//             onClick={showModalNew}
//             className="bg-green-400 text-white hover:bg-yellow-500 transition"
//             title="Assign Task"
//           >
//             New Task
//           </Button>
//           <Button
//             onClick={handleToggleView}
//             className="bg-blue-600 text-white  hover:bg-blue-700 transition"
//             title="Toggle View"
//           >
//             {viewType === 'grid' ? 'List View' : 'Grid View'}
//           </Button>
//         </nav>
//       </div>
  
//       {/* add Task Modal *************************************************/}
//       <Modal title="Add Task" visible={isModalVisibleNew} onCancel={handleCancel} footer={null}>
//   <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="title">Title*</label>
//       <input 
//         type="text" 
//         name="title" 
//         value={addTask.title} 
//         onChange={handleInputChange} 
//         className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
//         required 
//       />
//     </div>
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="projectId">Project*</label>
//       <select 
//         name="projectId" 
//         value={addTask.projectId} 
//         onChange={handleInputChange} 
//         className="form-select border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       >
//         <option value="">Select Project</option>
//         {projects.map(project => (
//           <option key={project._id} value={project._id}>{project.name}</option>
//         ))}
//       </select>
//     </div>
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="priority">Priority*</label>
//       <select 
//         name="priority" 
//         value={addTask.priority} 
//         onChange={handleInputChange} 
//         className="form-select border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       >
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>
//     </div>
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="assignedTo">Assigned To*</label>
//       <select 
//         name="assignedTo" 
//         value={addTask.assignedTo} 
//         onChange={handleInputChange} 
//         className="form-select border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       >
//         <option value="">Select User</option>
//         {users.map(user => (
//           <option key={user._id} value={user._id}>{user.name}</option>
//         ))}
//       </select>
//     </div>
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="dueDate">Due Date</label>
//       <input 
//         type="date" 
//         name="dueDate" 
//         value={addTask.dueDate} 
//         onChange={handleInputChange} 
//         className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
//       />
//     </div>
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="estimateTime">Estimate Time (e.g., "2 days 3 hours")</label>
//       <input 
//         type="text" 
//         name="estimateTime" 
//         value={addTask.estimateTime} 
//         onChange={handleInputChange} 
//         placeholder="e.g., 2 days 3 hours"
//         className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
//       />
//     </div>
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="tags">Tags</label>
//       <input 
//         type="text" 
//         name="tags" 
//         value={addTask.tags} 
//         onChange={handleInputChange} 
//         placeholder="e.g., urgent, important"
//         className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
//       />
//     </div>
//     <div>
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="attachments">Attachments</label>
//       <input 
//         type="file" 
//         name="attachments" 
//         value={addTask.attachments} 

//         onChange={handleInputChange} 
//         className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
//         multiple
//       />
//     </div>
//     <div className="col-span-2 md:col-span-2 lg:col-span-2">
//       <label className="block mb-2 font-semibold text-gray-700" htmlFor="description">Description</label>
//       <div className="col-span-2">
//           <ReactQuill 
//             value={addTask.description} 
//             onChange={handleInputChange} 
//             className="border border-gray-300 rounded-md shadow-sm"
//             theme="snow"
//           />
//         </div>
//     </div>
//     <div className="col-span-2 flex justify-between">
//       <Button type="default" onClick={handleCancel} className="ml-4 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200">Cancel</Button>
//       <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Add Task</Button>

//     </div>
//   </form>
// </Modal>

//       {/* Assign Task Form **************************************************/}
//       <Modal
//         title="Assign Task"
//         visible={isModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <form onSubmit={handleAssignTask} className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block mb-1" htmlFor="assignedTo">Assign To</label>
//             <select name="assignedTo" value={taskData.assignedTo} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
//               <option value="">Select User</option>
//               {users.map(user => (
//                 <option key={user._id} value={user._id}>
//                   {user.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1" htmlFor="projectId">Project</label>
//             <select name="projectId" value={taskData.projectId} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
//               <option value="">Select Project</option>
//               {projects.map(project => (
//                 <option key={project._id} value={project._id}>
//                   {project.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1" htmlFor="dueDate">Due Date</label>
//             <input type="date" name="dueDate" value={taskData.dueDate} onChange={handleInputChange} className="form-input border border-gray-300 rounded-md p-2 w-full" />
//           </div>
//           <div>
//             <label className="block mb-1" htmlFor="status">Status</label>
//             <select name="status" value={taskData.status} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
//               <option value="pending">Pending</option>
//               <option value="completed">Completed</option>
//               <option value="in-progress">In Progress</option>
//             </select>
//           </div>
//           <div>
//             <label className="block mb-1" htmlFor="pageSize">Page Size</label>
//             <input type="number" name="pageSize" value={taskData.pageSize} onChange={handleInputChange} className="form-input border border-gray-300 rounded-md p-2 w-full" />
//           </div>
//           <div>
//             <label className="block mb-1" htmlFor="sortBy">Sort By</label>
//             <select name="sortBy" value={taskData.sortBy} onChange={handleInputChange} className="form-select border border-gray-300 rounded-md p-2 w-full">
//               <option value="title">Title</option>
//               <option value="dueDate">Due Date</option>
//               <option value="status">Status</option>
//             </select>
//           </div>
//           <div className="col-span-3 flex justify-between">
//             <Button onClick={handleReset} className="w-1/3 mr-1">Reset</Button>
//             <Button type="primary" htmlType="submit" className="w-1/3 ml-1">Submit</Button>
//           </div>
//         </form>
//       </Modal>
  
//       <div className=" mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//   {error && <p className="text-red-500">{error}</p>}
//   <DragDropContext onDragEnd={handleOnDragEnd}>
//     {Object.keys(statuses).length > 0 ? (
//       Object.keys(statuses).map((statusId) => {
//         const status = statuses[statusId];
//         return (
//           <Droppable key={statusId} droppableId={statusId}>
//             {(provided) => (
//               <div
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 className="task-column  bg-gray-100 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105"
//               >
//                 <h2 className="text-xl font-bold mb-4 text-purple-700">{status.title}</h2>
//                 {tasks
//                   .filter(task => task.statusId === statusId)
//                   .map((task, index) => (
//                     <Draggable key={task._id} draggableId={task._id} index={index}>
//                       {(provided) => (
//                         <div
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           ref={provided.innerRef}
//                           className="task-card bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-md transition-transform transform hover:shadow-xl"
//                         >
//                           <p className="font-bold text-gray-900">{task.title}</p>
//                           <p className="text-sm text-gray-600 mb-2">{task.description}</p>
//                           <p className="text-xs text-gray-400">
//                             Due: {new Date(task.dueDate).toLocaleDateString()}
//                           </p>
//                           <button
//                             onClick={() => handleDeleteTask(task._id)}
//                             className="mt-2 text-red-600 hover:text-red-800 transition-colors"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         );
//       })
//     ) : (
//       <p className="text-gray-600">Loading statuses...</p>
//     )}
//   </DragDropContext>
// </div>
 
//     </div>
//   );
//   };

// export default Tasks;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Modal, Button } from 'antd'; // Import Ant Design Modal and Button
import ReactQuill from 'react-quill';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

const Tasks = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [statuses, setStatuses] = useState({});
  const [error, setError] = useState('');
  const [viewType, setViewType] = useState('grid');
  const [isModalVisible, setIsModalVisible] = useState(false); // State for task assignment modal
  const [isModalVisibleNew, setIsModalVisibleNew] = useState(false); // State for task assignment modal
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
  const [addTask, setaddTask] = useState({
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
        // Fetch projects and users first
        const projectsResponse = await axios.get("https://task-manager-backend-btas.onrender.com/api/projects");
        setProjects(projectsResponse.data);
  
        const usersResponse = await axios.get('https://task-manager-backend-btas.onrender.com/api/users');
        setUsers(usersResponse.data);
  
        // Fetch statuses and tasks concurrently
        const [statusesResponse, tasksResponse] = await Promise.all([
          axios.get('https://task-manager-backend-btas.onrender.com/api/statuses'),
          axios.get('https://task-manager-backend-btas.onrender.com/api/tasks'),
        ]);
  
        const statuses = statusesResponse.data;
        const tasks = tasksResponse.data;
  
        // Format statuses to a more usable format
        const formattedStatuses = statuses.reduce((acc, status) => {
          acc[status._id] = { title: status.name };
          return acc;
        }, {});
  
        // Map tasks to include statusId
        const tasksWithStatusId = tasks.map(task => {
          const defaultStatusId = Object.keys(formattedStatuses)[0]; // Link to the first status (change logic as needed)
          return { ...task, statusId: task.statusId || defaultStatusId }; // Fallback to default if missing
        });
  
        // Set states
        setTasks(tasksWithStatusId);
        setStatuses(formattedStatuses);
      } catch (error) {
        setError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
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
  const showModalNew = () => {
    setIsModalVisibleNew(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setIsModalVisibleNew(false);
    handleReset(); // Reset task data on cancel
  };

  const handleInputChange = (e) => {
    // Check if e.target is defined to avoid destructuring errors
    if (e.target) {
      const { name, value } = e.target;
      setTaskData((prevData) => ({ ...prevData, [name]: value }));
      setaddTask((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // Handle ReactQuill specific onChange event
      setTaskData((prevData) => ({ ...prevData, description: e }));
      setaddTask((prevData) => ({ ...prevData, description: e }));
    }
  };
  

  const handleAddTask = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('title', addTask.title);
    formData.append('projectId', addTask.projectId);
    formData.append('priority', addTask.priority);
    formData.append('assignedTo', addTask.assignedTo);
    formData.append('dueDate', addTask.dueDate);
    formData.append('estimateTime', addTask.estimateTime);
    formData.append('tags', addTask.tags); // Tags should be a comma-separated string
    formData.append('description', addTask.description);
    
    // Append attachments
    const attachments = document.querySelector('input[name="attachments"]').files;
    for (let i = 0; i < attachments.length; i++) {
      formData.append('attachments', attachments[i]);
    }
  
    try {
      const response = await axios.post('https://task-manager-newbackend.onrender.com/api/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      setIsModalVisibleNew(false);

      // Optionally show a success message (e.g., using Toast)
      toast.success('Task added successfully!');
  
      console.log('Task added successfully:', response.data);
      // Reset form and close modal or handle success
    } catch (error) {
      console.error('Error adding task:', error.response.data);
      // Handle error appropriately (e.g., show a notification)
    }
  };
  


  //   const handleAssignTask = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const responsedata = await axios.post('https://task-manager-backend-btas.onrender.com/api/Assigntask', addTask);

  //     setaddTask((prevTasks) => [...prevTasks, responsedata.data]);

  //     handleCancel(); // Close the modal after adding task
  //   } catch (error) {
  //     console.error("Error adding task:", error);
  //   }
  // };
  const handleAssignTask = async (e) => {
    e.preventDefault();
  
    const formData = {
      assignedTo: taskData.assignedTo,
      projectId: taskData.projectId,
      dueDate: taskData.dueDate,
      status: taskData.status,
      pageSize: taskData.pageSize,
      sortBy: taskData.sortBy,
    };
    
  
    try {
      // Send POST request to the API
      const response = await axios.post(
        'https://task-manager-backend-btas.onrender.com/api/Assigntask', 
        formData
      );
  
      // Handle successful response (add task to state, show success message, etc.)
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setIsModalVisible(false);
  
      toast.success('Task assigned successfully!');
    } catch (error) {
      // Handle error
      console.error('Error assigning task:', error.response?.data || error);
      toast.error('Failed to assign task');
    }
  };
  



  // const handleDeleteTask = async (taskId) => {
  //   try {
  //     await axios.delete(`https://task-manager-backend-btas.onrender.com/api/tasks/${taskId}`);
  //     setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Use _id for filtering
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  // };
  const handleDeleteTask = async (taskId) => {
    try {
      // Make sure taskId is not undefined or null
      if (!taskId) {
        console.error("Task ID is undefined or null.");
        return;
      }
  
      const response = await axios.delete(`https://task-manager-backend-btas.onrender.com/api/tasks/${taskId}`);
      
      // Log response data for debugging
      console.log("Delete response:", response.data);
      
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Use _id for filtering
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message); // Log error response
    }
  };
  
  // Usage
  // onClick={() => handleDeleteTask(task._id)}
  


  
  // const handleOnDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const updatedTasks = [...tasks];
  //   const [movedTask] = updatedTasks.splice(result.source.index, 1);
  //   movedTask.columnId = result.destination.droppableId;
  //   updatedTasks.splice(result.destination.index, 0, movedTask);
  //   setTasks(updatedTasks);
  // };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];

    if (result.source.droppableId === result.destination.droppableId) {
      const [movedTask] = updatedTasks.splice(result.source.index, 1);
      updatedTasks.splice(result.destination.index, 0, movedTask);
    } else {
      const [movedTask] = updatedTasks.splice(result.source.index, 1);
      movedTask.statusId = result.destination.droppableId;
      updatedTasks.push(movedTask);
    }

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
    setaddTask({
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

  return (
    <div className="p-4 bg-white shadow-md rounded-lg mt-5  mb-6">
      {error && <p className="text-red-600">{error}</p>}
      <div className="flex bg-gray-100 p-8 justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">TASKS</h1>
        <nav className="flex gap-2 items-center">
          <Button
            onClick={showModal}
            className="bg-yellow-400 w-28  text-white hover:bg-yellow-500 transition"
            title="Assign Task"
          >
            Assign To
          </Button>
          <Button
            onClick={showModalNew}
            className="bg-green-400 text-white hover:bg-yellow-500 transition"
            title="Assign Task"
          >
            New Task
          </Button>
          <Button
            onClick={handleToggleView}
            className="bg-blue-600 text-white  hover:bg-blue-700 transition"
            title="Toggle View"
          >
            {viewType === 'grid' ? 'List View' : 'Grid View'}
          </Button>
        </nav>
      </div>
  
      {/* add Task Modal *************************************************/}
      <Modal title="Add Task" visible={isModalVisibleNew} onCancel={handleCancel} footer={null}>
  <form onSubmit={handleAddTask} className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="title">Title*</label>
      <input 
        type="text" 
        name="title" 
        value={addTask.title} 
        onChange={handleInputChange} 
        className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
        required 
      />
    </div>
    <div>
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="projectId">Project*</label>
      <select 
        name="projectId" 
        value={addTask.projectId} 
        onChange={handleInputChange} 
        className="form-select border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select Project</option>
        {projects.map(project => (
          <option key={project._id} value={project._id}>{project.name}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="priority">Priority*</label>
      <select 
        name="priority" 
        value={addTask.priority} 
        onChange={handleInputChange} 
        className="form-select border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <div>
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="assignedTo">Assigned To*</label>
      <select 
        name="assignedTo" 
        value={addTask.assignedTo} 
        onChange={handleInputChange} 
        className="form-select border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>{user.name}</option>
        ))}
      </select>
    </div>
    <div>
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="dueDate">Due Date</label>
      <input 
        type="date" 
        name="dueDate" 
        value={addTask.dueDate} 
        onChange={handleInputChange} 
        className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
    </div>
    <div>
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="estimateTime">Estimate Time (e.g., "2 days 3 hours")</label>
      <input 
        type="text" 
        name="estimateTime" 
        value={addTask.estimateTime} 
        onChange={handleInputChange} 
        placeholder="e.g., 2 days 3 hours"
        className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
    </div>
    <div>
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="tags">Tags</label>
      <input 
        type="text" 
        name="tags" 
        value={addTask.tags} 
        onChange={handleInputChange} 
        placeholder="e.g., urgent, important"
        className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
    </div>
    <div>
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="attachments">Attachments</label>
      <input 
        type="file" 
        name="attachments" 
        value={addTask.attachments} 

        onChange={handleInputChange} 
        className="form-input border border-gray-300 rounded-md p-3 w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
        multiple
      />
    </div>
    <div className="col-span-2 md:col-span-2 lg:col-span-2">
      <label className="block mb-2 font-semibold text-gray-700" htmlFor="description">Description</label>
      <div className="col-span-2">
          <ReactQuill 
            value={addTask.description} 
            onChange={handleInputChange} 
            className="border border-gray-300 rounded-md shadow-sm"
            theme="snow"
          />
        </div>
    </div>
    <div className="col-span-2 flex justify-between">
      <Button type="default" onClick={handleCancel} className="ml-4 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-200">Cancel</Button>
      <Button type="primary" htmlType="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Add Task</Button>

    </div>
  </form>
</Modal>

      {/* Assign Task Form **************************************************/}
      <Modal
        title="Assign Task"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleAssignTask} className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <Button onClick={handleReset} className="w-1/3 mr-1">Reset</Button>
            <Button type="primary" htmlType="submit" className="w-1/3 ml-1">Submit</Button>
          </div>
        </form>
      </Modal>
  
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {Object.keys(statuses).length > 0 ? (
          Object.keys(statuses).map((statusId) => {
            const status = statuses[statusId];
            return (
              <Droppable key={statusId} droppableId={statusId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="task-column bg-gray-100 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105"
                  >
                    <h2 className="text-xl font-bold mb-4 text-purple-700">{status.title}</h2>
                    {tasks
                      .filter(task => task.statusId === statusId)
                      .map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="task-card bg-white border border-gray-300 rounded-md p-4 mb-4 shadow-md transition-transform transform hover:shadow-xl"
                            >
                              <div className="relative">
                                <p className="font-bold text-xl text-gray-900">{task.title}</p>
                                <p
                                  className=" text-gray-600  mb-2"
                                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.description) }}
                                />
                                <p className="text-xs text-gray-400">
                                  Due: {new Date(task.dueDate).toLocaleDateString()}
                                </p>

                                {/* Dropdown for Edit and Delete */}
                                <div className="absolute top-0 right-0">
                                  <button onClick={() => setDropdownVisible(dropdownVisible === task._id ? null : task._id)}>
                                    &#x22EE;
                                  </button>

                                  {dropdownVisible === task._id && (
                                    <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-300 rounded shadow-lg">
                                      <button
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                        onClick={() => {
                                          handleEditTask(task); // Call the edit handler (to be implemented)
                                        }}
                                      >
                                        Edit
                                      </button>
                                      <button
                                        className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                                        onClick={() => handleDeleteTask(task._id)}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })
        ) : (
          <p className="text-gray-600">Loading statuses...</p>
        )}
      </DragDropContext>
    </div>
    </div>
  );
  };

export default Tasks;