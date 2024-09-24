import React, { useEffect, useState } from 'react';
import axios from 'axios';

const permissionsList = [
  "Manage Calendar View",
  "Manage Status",
  "Manage Clients",
  "Manage Projects",
  "Manage Tasks",
  "Manage Entry",
  "Manage Users",
  "Manage Tags",
  "Manage Activities",
  "Manage Reports",
  "Manage Roles",
  "Manage Taxes",
  "Manage Invoices",
  "Manage Settings",
  "Manage Department",
  "Manage Expenses",
  "Manage Activity Log",
  "Manage Events",
  "Archived Users",
];

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: [], description: '' });

  // Fetch roles from backend
  const fetchRoles = async () => {
    const response = await axios.get('https://task-manager-backend-btas.onrender.com/api/roles');
    setRoles(response.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleAddRole = async () => {
    const response = await axios.post('https://task-manager-backend-btas.onrender.com/api/roles', newRole);
    setRoles([...roles, response.data]);
    setShowModal(false);
    setNewRole({ name: '', permissions: [], description: '' });
  };

  const handleDeleteRole = async (id) => {
    await axios.delete(`https://task-manager-backend-btas.onrender.com/api/roles/${id}`);
    setRoles(roles.filter(role => role._id !== id));
  };

  const handlePermissionChange = (permission) => {
    setNewRole(prev => {
      const permissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      return { ...prev, permissions };
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>
      <button 
        onClick={() => setShowModal(true)} 
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">
        Add Role
      </button>

      <div className="grid grid-cols-4 gap-4">
        {roles.map((role) => (
          <div key={role._id} className="border rounded shadow-lg mb-5 bg-white p-4">
            <div className="flex justify-between items-center">
              <h4 className="text-primary">{role.name}</h4>
              <div className="relative">
                <button className="focus:outline-none">
                  <i className="fas fa-ellipsis-v"></i>
                </button>
                <div className="absolute right-0 z-10 hidden bg-white shadow-lg">
                  <a href={`https://infyprojects.infyom.com/roles/${role._id}/edit`} className="block px-4 py-2">Edit</a>
                  <a onClick={() => handleDeleteRole(role._id)} className="block px-4 py-2">Delete</a>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <big className="font-weight-bold">{role.permissions.length} Permissions</big>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded w-[65%]  shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Role</h2>
            <label className="block mb-2">
              Name: *
              <input 
                type="text" 
                value={newRole.name} 
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })} 
                className="border rounded w-full px-2 py-1"
                required
              />
            </label>
            <label className="block mb-2">Permissions:</label>
            <div className="grid grid-cols-2 gap-4 mb-2">
              {permissionsList.map(permission => (
                <label key={permission} className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={newRole.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)} 
                    className="mr-2"
                  />
                  {permission}
                </label>
              ))}
            </div>
            <label className="block mb-2">
              Description:
              <textarea 
                value={newRole.description} 
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })} 
                className="border rounded w-full px-2 py-1"
              />
            </label>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowModal(false)} className="mr-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleAddRole} className="bg-blue-500 text-white px-4 py-2 rounded">Add Role</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
