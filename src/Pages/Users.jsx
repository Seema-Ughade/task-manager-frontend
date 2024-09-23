import React, { useState } from 'react';
import { Modal, Button, Select, Form, Input, Menu, Dropdown, Upload } from 'antd';

const { Option } = Select;

const Users = () => {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([
    { name: "Ashley Simmons", role: "Developer", email: "ashleysimmons@gmail.com", projects: 5, tasks: 0, isActive: true },
    { name: "InfyTracker Admin", role: "Admin", email: "admin@infyprojects.com", projects: 59, tasks: 2, isActive: true },
    { name: "Ashley Simmons", role: "Developer", email: "ashleysimmons@gmail.com", projects: 5, tasks: 0, isActive: true },
    { name: "InfyTracker Admin", role: "Admin", email: "admin@infyprojects.com", projects: 59, tasks: 2, isActive: true },
    { name: "Ashley Simmons", role: "Developer", email: "ashleysimmons@gmail.com", projects: 5, tasks: 0, isActive: true },
    { name: "InfyTracker Admin", role: "Admin", email: "admin@infyprojects.com", projects: 59, tasks: 2, isActive: true },
  ]);
  const [filter, setFilter] = useState('all');

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (values) => {
    setUsers([...users, values]);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredUsers = users; // Apply your filter logic here if needed

  return (
    <div className="p-4">
      <h1 className="page__heading">Users</h1>
      <div className="filter-container">
        <Select onChange={handleFilterChange} style={{ width: '200px', marginRight: '16px' }}>
          <Option value="">All</Option>
          <Option value="1">Active</Option>
          <Option value="0">Deactive</Option>
          <Option value="2">Archived</Option>
        </Select>
        <Button type="primary" onClick={showModal}>
          New User <i className="fas fa-plus"></i>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredUsers.map((user, index) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden user-card-view hover-card" key={index}>
      <div className="flex items-center p-4 border-b">
        <div className="mr-3">
          <img
            alt="avatar"
            width="50"
            src={`https://ui-avatars.com/api/?name=${user.name}&size=64&rounded=true&color=fff&background=42c9af`}
            className="rounded-full"
          />
          <label className="custom-switch pl-0" title={user.isActive ? "Active" : "Deactive"}>
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
            <h4 className="font-semibold">{user.name}</h4>
            <Dropdown overlay={<Menu />} trigger={['click']}>
              <Button type="link">
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
          <span className="bg-blue-500 text-white px-2 py-1 rounded">{user.projects}</span> Projects
        </div>
        <div>
          <span className="bg-gray-800 text-white px-2 py-1 rounded">{user.tasks}</span> Tasks Active
        </div>
      </div>
    </div>
  ))}
</div>

      <Modal title="New User" visible={visible} onCancel={handleCancel} footer={null}>
        <Form onFinish={handleOk} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input the email!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please input the phone number!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="New Password" rules={[{ required: true, message: 'Please input the new password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: 'Please confirm your password!' }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="project" label="Project" rules={[{ required: true, message: 'Please select a project!' }]}>
            <Select placeholder="Select a project">
              <Option value="web">Web</Option>
              <Option value="app">App</Option>
            </Select>
          </Form.Item>
          <Form.Item name="salary" label="Salary" rules={[{ required: true, message: 'Please input the salary!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please select the status!' }]}>
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Profile">
            <Upload beforeUpload={() => false}>
              <Button>Choose Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Users;
