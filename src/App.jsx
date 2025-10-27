// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Plans from './pages/Plans';
import Payments from './pages/Payments';
import Attendance from './pages/Attendance';
import Settings from './pages/Settings';
import Login from './pages/Login';
import MemberProfile from './pages/MemberProfile';
// import Register from './pages/Register';

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route
            path="/*"
            element={
              <Protected>
                <Layout>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="members" element={<Members />} />
                    <Route path="plans" element={<Plans />} />
                    <Route path="payments" element={<Payments />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="members/:id" element={<MemberProfile />} />
                  </Routes>
                </Layout>
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}