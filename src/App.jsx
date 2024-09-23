import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";

// Pages
import Dashboard from "./Pages/Dashboard";
import Departments from "./Pages/Departments";
import Clients from "./Pages/Clients";
import Projects from "./Pages/Projects";
import Tasks from "./Pages/Tasks";
import Calendar from "./Pages/Calendar";
import Reports from "./Pages/Reports";
import Users from "./Pages/Users";
import ArchivedUsers from "./Pages/ArchivedUsers";
import Roles from "./Pages/Roles";
import Sales from "./Pages/Sales";
import ActivityLogs from "./Pages/ActivityLogs";
import Events from "./Pages/Events";
import Team from "./Pages/Team";
import Trash from "./Pages/Trash";
import Login from "./Login/login";

const App = () => {
  return (
    <Router className="bg-black">
      <div className="flex h-full w-full border border-gray-100">
        <div className=""> {/* Adjusted width to match sidebar */}
          <Sidebar />
        </div>
        <div className="flex flex-col flex-1">
          <div className="h-12">
            <Navbar />
          </div>
          <div className="flex-1 p-5 bg-white">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/users" element={<Users />} />
              <Route path="/archived-users" element={<ArchivedUsers />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/activity-logs" element={<ActivityLogs />} />
              <Route path="/events" element={<Events />} />
              <Route path="/team" element={<Team />} />
              <Route path="/trashed" element={<Trash />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;



// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// // Components
// import Sidebar from "./Components/Sidebar";
// import Navbar from "./Components/Navbar";

// // Pages
// import Dashboard from "./Pages/Dashboard";
// import Departments from "./Pages/Departments";
// import Clients from "./Pages/Clients";
// import Projects from "./Pages/Projects";
// import Tasks from "./Pages/Tasks";
// import Calendar from "./Pages/Calendar";
// import Reports from "./Pages/Reports";
// import Users from "./Pages/Users";
// import ArchivedUsers from "./Pages/ArchivedUsers";
// import Roles from "./Pages/Roles";
// import Sales from "./Pages/Sales";
// import ActivityLogs from "./Pages/ActivityLogs";
// import Events from "./Pages/Events";
// import Team from "./Pages/Team";
// import Trash from "./Pages/Trash";
// import Login from "./Login/login";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router>
//       <div className="flex h-full w-full border border-gray-100">
//         {isAuthenticated && <Sidebar />}
//         <div className="flex flex-col flex-1">
//           {isAuthenticated && <div className="h-12"><Navbar /></div>}
//           <div className="flex-1 p-5 bg-white">
//             <Routes>
//               <Route path="/login" element={<Login onLogin={handleLogin} />} />
//               {isAuthenticated ? (
//                 <>
//                   <Route path="/dashboard" element={<Dashboard />} />
//                   <Route path="/" element={<Navigate to="/dashboard" />} />
//                   <Route path="/departments" element={<Departments />} />
//                   <Route path="/clients" element={<Clients />} />
//                   <Route path="/projects" element={<Projects />} />
//                   <Route path="/tasks" element={<Tasks />} />
//                   <Route path="/calendar" element={<Calendar />} />
//                   <Route path="/reports" element={<Reports />} />
//                   <Route path="/users" element={<Users />} />
//                   <Route path="/archived-users" element={<ArchivedUsers />} />
//                   <Route path="/roles" element={<Roles />} />
//                   <Route path="/sales" element={<Sales />} />
//                   <Route path="/activity-logs" element={<ActivityLogs />} />
//                   <Route path="/events" element={<Events />} />
//                   <Route path="/team" element={<Team />} />
//                   <Route path="/trashed" element={<Trash />} />
//                 </>
//               ) : (
//                 <Route path="*" element={<Navigate to="/login" />} />
//               )}
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
