import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { notification, Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const ArchivedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://task-manager-backend-1-3zvs.onrender.com/api/users');
        // Assuming "deleted" or "archived" users have a field like 'isArchived' or 'isDeleted'
        const archivedUsers = response.data.filter(user => user.isArchived || user.isDeleted);
        setUsers(archivedUsers);
      } catch (error) {
        setError('Failed to fetch archived users.');
        console.error('Error fetching archived users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://task-manager-backend-1-3zvs.onrender.com/api/users/${userId}`);
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
      notification.success({ message: 'User deleted successfully!' });
    } catch (error) {
      console.error('Error deleting user:', error);
      notification.error({ message: 'Failed to delete user.' });
    }
  };

  if (loading) return <Spin size="large" />; // Show loading spinner while fetching data
  if (error) return <p className="text-red-500">{error}</p>; // Show error message if something goes wrong

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-bold mb-4">Archived Users</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 text-left text-gray-600">User</th>
            <th className="py-2 text-center text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-3 px-6">
                <div className="flex items-center">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&size=64&rounded=true&color=fff&background=7d68f0`}
                    alt="avatar"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-3">
                    <span className="font-medium block">{user.name}</span>
                    <span className="text-gray-500">{user.email}</span>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  title="Delete"
                  className="text-red-500 hover:text-red-600 transition-colors p-2"
                >
                  <DeleteOutlined className="text-lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchivedUsers;
