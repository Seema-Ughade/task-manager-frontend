// // import React, { useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { Link, useNavigate } from "react-router-dom";
// // import { login } from '../Redux/actions/user.js'

// // const Login = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const dispatch = useDispatch();

// //   const submitHandler = (e) => {
// //     e.preventDefault();
// //     dispatch(login(email, password));
// //     navigate("/");
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-md w-full space-y-8">
// //         <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
// //           Welcome to <span className="text-blue-600">Task Manager</span>
// //         </h1>

// //         <form onSubmit={submitHandler} className="mt-8 space-y-6">
// //           <div className="rounded-md shadow-sm space-y-2">
// //             <div>
// //               <label
// //                 htmlFor="email"
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Email Address
// //               </label>
// //               <input
// //                 required
// //                 id="email"
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 placeholder="abc@gmail.com"
// //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
// //               />
// //             </div>

// //             <div className="mt-6">
// //               <label
// //                 htmlFor="password"
// //                 className="block text-sm font-medium text-gray-700"
// //               >
// //                 Password
// //               </label>
// //               <input
// //                 required
// //                 id="password"
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 placeholder="**********"
// //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex items-center justify-between mt-4">
// //             <div className="text-sm">
// //               <Link
// //                 to="/forgetpassword"
// //                 className="font-medium text-blue-600 hover:text-gray-500"
// //               >
// //                 Forget Password?
// //               </Link>
// //             </div>
// //           </div>

// //           <div>
// //             <button
// //               type="submit"
// //               className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
// //             >
// //               Login
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form, Input, message } from 'antd';
// import axios from 'axios';

// const Login = ({ setLoggedInUser }) => {
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (values) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('https://task-manager-backend-1-3zvs.onrender.com/api/auth/login', values);
//       const { token, user } = response.data;
      
//       // Store the JWT token in local storage
//       localStorage.setItem('authToken', token);
//       setLoggedInUser(user);
      
//       message.success('Login successful!');
//     } catch (error) {
//       message.error('Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       <Form onFinish={handleLogin} layout="vertical">
//         <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
//           <Input.Password />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Login
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// const Dashboard = ({ loggedInUser }) => {
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     if (loggedInUser) {
//       fetchRoleAndPermissions(loggedInUser.role);
//     }
//   }, [loggedInUser]);

//   const fetchRoleAndPermissions = async (roleId) => {
//     try {
//       const response = await axios.get(`https://task-manager-backend-1-3zvs.onrender.com/api/roles/${roleId}`);
//       setRole(response.data);
//     } catch (error) {
//       message.error('Failed to fetch role and permissions');
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       {loggedInUser && role ? (
//         <>
//           <h1>Welcome, {loggedInUser.name}</h1>
//           <h2>Your Role: {role.name}</h2>
//           <h3>Permissions:</h3>
//           <ul>
//             {role.permissions.map((permission) => (
//               <li key={permission}>{permission}</li>
//             ))}
//           </ul>
//         </>
//       ) : (
//         <p>Loading user details...</p>
//       )}
//     </div>
//   );
// };

// const App = () => {
//   const [loggedInUser, setLoggedInUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       // Fetch user data with token
//       fetchLoggedInUser(token);
//     }
//   }, []);

//   const fetchLoggedInUser = async (token) => {
//     try {
//       const response = await axios.get('https://task-manager-backend-1-3zvs.onrender.com/api/auth/me', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setLoggedInUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch logged in user', error);
//     }
//   };

//   return (
//     <div className="app-container">
//       {!loggedInUser ? (
//         <Login setLoggedInUser={setLoggedInUser} />
//       ) : (
//         <Dashboard loggedInUser={loggedInUser} />
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ onLogin }) => { // Change setLoggedInUser to onLogin
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate hook

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post('https://task-manager-backend-1-3zvs.onrender.com/api/auth/login', values);
      const { token, user } = response.data;
      
      // Store the JWT token in local storage
      localStorage.setItem('authToken', token);

      // Fetch role details based on user role ID
      const roleResponse = await axios.get(`https://task-manager-backend-1-3zvs.onrender.com/api/roles/${user.role}`);
      const userWithRole = { ...user, role: roleResponse.data };

      // Call the onLogin prop with the user details
      onLogin(userWithRole);
      
      message.success('Login successful!');
      navigate('/dashboard'); // Navigate to the dashboard after login

    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

//   return (
//     <div className="login-container">
//       <h1>Login</h1>
//       <Form onFinish={handleLogin} layout="vertical">
//         <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please input your email!' }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
//           <Input.Password />
//         </Form.Item>
//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Login
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Login;
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Welcome to <span className="text-blue-600">Task Manager</span>
        </h1>

        <Form onFinish={handleLogin} layout="vertical" className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-2">
            <Form.Item
              name="email"
              label="Email Address"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                required
                placeholder="abc@gmail.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                required
                placeholder="**********"
                className="mt-1  w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </Form.Item>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              <Link to="/forgetpassword" className="font-medium text-blue-600 hover:text-gray-500">
                Forget Password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
