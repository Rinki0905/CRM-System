import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/common/PrivateRoute';
import MainLayout from './components/layout/MainLayout';
import CustomersPage from './pages/CustomersPage';
import DealsPage from './pages/DealsPage';
import TasksPage from './pages/TasksPage';
function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<PrivateRoute />}>
              <Route element={<MainLayout />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                 <Route path='/customers' element={<CustomersPage />} />
                <Route path='/deals' element={<DealsPage />} /> 
                 <Route path='/tasks' element={<TasksPage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;