import { Routes, Route } from "react-router-dom";
import SignUp from "./components/Auth/SignUp/SignUp";
import Login from "./components/Auth/LogIn/Login";
import AdminDashboard from "./pages/Admin/Dashboard";
// import SuperAdminDashboard from "./pages/A/Dashboard";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Stats from "./components/Admin/Stats";
import ChangePassword from "./components/Auth/LogIn/ChangePassword";
import ViewProfile from "./components/SuperAdmin/ViewProfile";


const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/founder/profile/:id" element={<ViewProfile role = "founder" />} />
        <Route path="/getDiscovered/profile/:id" element={<ViewProfile role = "getDiscovered" />} />
        <Route
            path="/admin-dashboard"
            element={
                <PrivateRoute>
                    <AdminDashboard />
                </PrivateRoute>
            }
        />
        <Route
            path="/stats"
            element={
                <PrivateRoute>
                    <Stats />
                </PrivateRoute>
            }
        />

    </Routes>
  );
};

export default App;
