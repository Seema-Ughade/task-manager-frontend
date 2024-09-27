import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Form, Input, Menu, Dropdown, Upload, Switch, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Users = () => {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [filter, setFilter] = useState('all');
  const [roles, setRoles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchProjects();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://task-manager-backend-btas.onrender.com/api/users');
      setUsers(response.data.map(user => ({
        ...user,
        password: undefined, // Exclude password from user data
      })));
    } catch (error) {
      message.error('Failed to fetch users');
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('https://task-manager-backend-btas.onrender.com/api/roles');
      setRoles(response.data);
    } catch (error) {
      message.error('Failed to fetch roles');
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://task-manager-backend-btas.onrender.com/api/projects');
      setProjects(response.data);
    } catch (error) {
      message.error('Failed to fetch projects');
    }
  };

  const showModal = (user = null) => {
    setEditingUser(user);
    setVisible(true);
    setFileList([]); // Reset file list when opening the modal
  };

  const handleOk = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    if (!editingUser) { // Only append password if creating a new user
      formData.append('password', values.password);
    }
    formData.append('role', values.role);
    formData.append('project', values.project);
    formData.append('salary', values.salary);
    formData.append('isActive', values.isActive);

    // Map isActive to status
    formData.append('status', values.isActive ? 'active' : 'inactive'); 
      
    if (fileList.length > 0) { // Check if there is a file to upload
      formData.append('profilePicture', fileList[0].originFileObj); // Use the original file object
    }

    try {
      const response = editingUser
        ? await axios.put(`https://task-manager-backend-btas.onrender.com/api/users/${editingUser._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        : await axios.post('https://task-manager-backend-btas.onrender.com/api/users', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
      message.success(editingUser ? 'User updated successfully' : 'User created successfully');
      fetchUsers(); // Refresh the user list
      handleCancel(); // Close the modal
    } catch (error) {
      console.error('Error creating/updating user:', error.response.data);
      message.error('Failed to save user');
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setEditingUser(null);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`https://task-manager-backend-btas.onrender.com/api/users/${userId}`);
      message.success('User deleted successfully');
      fetchUsers();
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    return filter === '1' ? user.isActive : !user.isActive;
  });

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className="p-4">
      <h1 className="page__heading">Users</h1>
      <div className="filter-container">
        <Select onChange={handleFilterChange} style={{ width: '200px', marginRight: '16px' }}>
          <Option value="all">All</Option>
          <Option value="1">Active</Option>
          <Option value="0">Inactive</Option>
        </Select>
        <Button type="primary" onClick={() => showModal()}>
          New User <i className="fas fa-plus"></i>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div className="bg-white shadow-md rounded-lg overflow-hidden user-card-view hover-card" key={user._id}>
            <div className="flex items-center p-4 border-b">
              <div className="mr-3">
                <img
                  alt="avatar"
                  width="50"
                  src={user.profilePicture || `https://ui-avatars.com/api/?name=${user.name}&size=64&rounded=true&color=fff&background=42c9af`}
                  className="rounded-full"
                />
                <label className="custom-switch pl-0" title={user.isActive ? "Active" : "Inactive"}>
                  <input
                    type="checkbox"
                    className="custom-switch-input is-active"
                    checked={user.isActive}
                    readOnly
                  />
                  <span className="custom-switch-indicator"></span>
                </label>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-semibold bg-red-500">{user.name}</h4>
                  <Dropdown overlay={
                    <Menu>
                      <Menu.Item onClick={() => showModal(user)}>Edit</Menu.Item>
                      <Menu.Item onClick={() => handleDelete(user._id)}>Delete</Menu.Item>
                    </Menu>
                  } trigger={['click']}>
                    <Button type="link" >
                      <i className="fas fa-ellipsis-v"></i>
                    </Button>
                  </Dropdown>
                </div>
                <div className="text-gray-500">{user.role}</div>
                <div className="text-gray-600">{user.email} <span title="Email is verified"><i className="fas fa-check-circle text-green-500"></i></span></div>
              </div>
            </div>
            <div className="flex p-4">
              <div className="mr-3">
                <span className="bg-blue-500 text-white px-2 py-1 rounded">{user.project}</span> Project
              </div>
              <div>
                <span className="bg-gray-800 text-white px-2 py-1 rounded">{user.tasks || 0}</span> Tasks Active
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal title={editingUser ? "Edit User" : "New User"} visible={visible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleOk} layout="vertical" initialValues={editingUser}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="New Password" rules={[{ required: !editingUser, message: 'Please input the new password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: !editingUser, message: 'Please confirm your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="project" label="Project" rules={[{ required: true, message: 'Please select a project!' }]}>
            <Select placeholder="Select a project">
              {projects.map((project) => (
                <Option key={project._id} value={project._id}>{project.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role!' }]}>
            <Select placeholder="Select a role">
              {roles.map((role) => (
                <Option key={role._id} value={role._id}>{role.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="salary" label="Salary" rules={[{ required: true, message: 'Please input the salary!' }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="isActive" label="Active" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Profile Picture">
            <Upload
              listType="picture"
              beforeUpload={() => false} // Prevent automatic upload
              onChange={handleUploadChange}
              fileList={fileList}
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Update" : "Create"} User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
