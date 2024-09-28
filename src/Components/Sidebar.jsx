// import React from "react";
// import {
//   MdDashboard,
//   MdOutlineAddTask,
//   MdOutlinePendingActions,
//   MdSettings,
//   MdTaskAlt,
// } from "react-icons/md";
// import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

// import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Layout, Menu, Button } from "antd";
// import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
// import clsx from "clsx";
// import mainlogo from '../assets/mainlogo.png'

// const { Sider } = Layout;

// const linkData = [
//   { key: 'dashboard', icon: <MdDashboard style={{ color: '#1890ff' }} />, label: 'Dashboard', to: '/dashboard' },
//   { key: 'departments', icon: <MdOutlinePendingActions style={{ color: '#fa8c16' }} />, label: 'Departments', to: '/departments' },
//   { key: 'clients', icon: <FaUsers style={{ color: '#52c41a' }} />, label: 'Clients', to: '/clients' },
//   { key: 'projects', icon: <FaTasks style={{ color: '#13c2c2' }} />, label: 'Projects', to: '/projects' },
//   {
//     key: 'tasks',
//     icon: <FaTasks style={{ color: '#eb2f96' }} />,
//     label: 'Tasks',
//     to: '/tasks',
//     children: [
//       { key: 'completed', icon: <MdTaskAlt style={{ color: '#52c41a' }} />, label: 'Completed', to: '/completed/completed' },
//       { key: 'in-progress', icon: <MdOutlinePendingActions style={{ color: '#faad14' }} />, label: 'In Progress', to: '/in-progress/in-progress' },
//       { key: 'todo', icon: <MdOutlinePendingActions style={{ color: '#f5222d' }} />, label: 'To Do', to: '/todo/todo' },
//     ],
    
//   },
//   { key: 'calendar', icon: <MdOutlinePendingActions style={{ color: '#722ed1' }} />, label: 'Calendar', to: '/calendar' },
//   { key: 'reports', icon: <MdTaskAlt style={{ color: '#eb2f96' }} />, label: 'Reports', to: '/reports' },
//   { key: 'users', icon: <FaUsers style={{ color: '#13c2c2' }} />, label: 'Users', to: '/users' },
//   { key: 'archived-users', icon: <FaTrashAlt style={{ color: '#f5222d' }} />, label: 'Archived Users', to: '/archived-users' },
//   { key: 'roles', icon: <MdSettings style={{ color: '#1890ff' }} />, label: 'Roles', to: '/roles' },
//   { key: 'sales', icon: <MdOutlinePendingActions style={{ color: '#fa8c16' }} />, label: 'Sales', to: '/sales' },
//   { key: 'activity-logs', icon: <MdSettings style={{ color: '#722ed1' }} />, label: 'Activity Logs', to: '/activity-logs' },
//   { key: 'events', icon: <MdOutlinePendingActions style={{ color: '#52c41a' }} />, label: 'Events', to: '/events' },
//   { key: 'team', icon: <FaUsers style={{ color: '#fa541c' }} />, label: 'Team', to: '/team' },
//   { key: 'trashed', icon: <FaTrashAlt style={{ color: '#f5222d' }} />, label: 'Trash', to: '/trashed' },
// ];

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = React.useState(false);
//   const navigate = useNavigate();
  
//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
// <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
//   <div className="flex flex-col justify-center items-center h-22">
//     <img src={mainlogo} className="w-[60%] h-auto" alt="Logo" />
//     <p className=" text-xl font-semibold  ">Arrc Technology</p>

//   </div>
//   <p></p>
//       <Button
//         type="link"
//         onClick={toggleCollapsed}
//         style={{ position: 'absolute', right: '16px', top: '16px' }}
//       >
//         {collapsed ? <MenuOutlined style={{ color: '#fff' }} /> : <CloseOutlined style={{ color: '#fff' }} />}
//       </Button>
//       <Menu
//         className="mt-5"
//         theme="light"
//         mode="inline"
//         defaultSelectedKeys={['dashboard']}
//         inlineCollapsed={collapsed}
//         style={{ backgroundColor: '#fff', fontWeight: '600' }}
//       >
//         {linkData.map((item) =>
//           item.children ? (
//             <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
//               {item.children.map((child) => (
//                 <Menu.Item key={child.key}>
//                   <Link to={child.to} className="hover:text-blue-500">
//                     {child.label}
//                   </Link>
//                 </Menu.Item>
//               ))}
//             </Menu.SubMenu>
//           ) : (
//             <Menu.Item key={item.key} icon={item.icon} onClick={() => navigate(item.to)}>
//               <Link to={item.to} className="hover:text-blue-500">
//                 {item.label}
//               </Link>
//             </Menu.Item>
//           )
//         )}
//       </Menu>
//     </Sider>
//   );
// };

// export default Sidebar;
import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Input } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import mainlogo from "../assets/mainlogo.png";

const { Sider } = Layout;

const linkData = [
  { 
    key: "dashboard", 
    icon: <MdDashboard style={{ color: "#1890ff" }} />, 
    label: "Dashboard", 
    to: "/dashboard", 
    permission: "Manage Status" 
  },
  { 
    key: "departments", 
    icon: <MdOutlinePendingActions style={{ color: "#fa8c16" }} />, 
    label: "Departments", 
    to: "/departments", 
    permission: "Manage Department" 
  },
  { 
    key: "clients", 
    icon: <FaUsers style={{ color: "#52c41a" }} />, 
    label: "Clients", 
    to: "/clients", 
    permission: "Manage Clients" 
  },
  { 
    key: "projects", 
    icon: <FaTasks style={{ color: "#13c2c2" }} />, 
    label: "Projects", 
    to: "/projects", 
    permission: "Manage Projects" 
  },
  {
    key: "tasks",
    icon: <FaTasks style={{ color: "#eb2f96" }} />,
    label: "Tasks",
    to: "/tasks",
    permission: "Manage Tasks",
    children: [
      { key: "tasks", icon: <MdTaskAlt style={{ color: "#52c41a" }} />, label: "Tasks", to: "/tasks", permission: "Manage Tasks" },
      { key: "status", icon: <MdOutlinePendingActions style={{ color: "#faad14" }} />, label: "Status", to: "/tasks/status", permission: "Manage Tasks" },
      // { key: "status", icon: <MdOutlinePendingActions style={{ color: "#faad14" }} />, label: "Task list ", to: "/tasks", permission: "Manage Tasks" },
    ],
  },
  { 
    key: "calendar", 
    icon: <MdOutlinePendingActions style={{ color: "#722ed1" }} />, 
    label: "Calendar", 
    to: "/calendar", 
    permission: "Manage Calendar View" 
  },
  { 
    key: "reports", 
    icon: <MdTaskAlt style={{ color: "#eb2f96" }} />, 
    label: "Reports", 
    to: "/reports", 
    permission: "Manage Reports" 
  },
  { 
    key: "users", 
    icon: <FaUsers style={{ color: "#13c2c2" }} />, 
    label: "Users", 
    to: "/users", 
    permission: "Manage Users" 
  },
  { 
    key: "archived-users", 
    icon: <FaTrashAlt style={{ color: "#f5222d" }} />, 
    label: "Archived Users", 
    to: "/archived-users", 
    permission: "Archived Users" 
  },
  { 
    key: "roles", 
    icon: <MdSettings style={{ color: "#1890ff" }} />, 
    label: "Roles", 
    to: "/roles", 
    permission: "Manage Roles" 
  },
  { 
    key: "sales", 
    icon: <MdOutlinePendingActions style={{ color: "#fa8c16" }} />, 
    label: "Sales", 
    to: "/sales", 
    permission: "Manage Invoices" 
  },
  { 
    key: "activity-logs", 
    icon: <MdSettings style={{ color: "#722ed1" }} />, 
    label: "Activity Logs", 
    to: "/activity-logs", 
    permission: "Manage Activity Log" 
  },
  { 
    key: "events", 
    icon: <MdOutlinePendingActions style={{ color: "#52c41a" }} />, 
    label: "Events", 
    to: "/events", 
    permission: "Manage Events" 
  },
  { 
    key: "team", 
    icon: <FaUsers style={{ color: "#fa541c" }} />, 
    label: "Team", 
    to: "/team", 
    permission: "Manage Users" 
  },
  { 
    key: "trashed", 
    icon: <FaTrashAlt style={{ color: "#f5222d" }} />, 
    label: "Trash", 
    to: "/trashed", 
    permission: "Manage Trash" 
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      {/* Toggle Button on the outer left side */}
      <Button
        onClick={toggleCollapsed}
        style={{
          position: "fixed",
          top: 16,
          left: collapsed ? 90 : 260,
          zIndex: 1000,
          color : 'gray'
        }}
        icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
      />
      {/* Sidebar */}
      <Sider
        width={250}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          backgroundColor: "#fff", // Remove black background, set to white
          borderRight: "1px solid #f0f0f0", // Optional border for a clean look
        }}
      >
        {/* <div className="flex flex-col justify-center items-center h-28">
          <img src={mainlogo} className="w-[60%] h-auto" alt="Logo" />
          {!collapsed && <p className="text-xl font-semibold">Arrc Technology</p>}
        </div> */}

<div className={`flex flex-col justify-center items-center ${collapsed ? 'h-16' : 'h-28'} transition-all duration-300`}>
      <img src={mainlogo} className="w-[60%] mt-2 h-auto" alt="Logo" />
    </div>
      

        <Menu
          className=""
          theme="light"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          inlineCollapsed={collapsed}
          style={{ backgroundColor: "#fff", fontWeight: "600" }}
        >
          {linkData.map((item) =>
            item.children ? (
              <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.children.map((child) => (
                  <Menu.Item key={child.key}>
                    <Link to={child.to} className="hover:text-blue-500">
                      {child.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon} onClick={() => navigate(item.to)}>
                <Link to={item.to} className="hover:text-blue-500">
                  {item.label}
                </Link>
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default Sidebar;
