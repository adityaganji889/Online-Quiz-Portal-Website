import './App.css';
import './stylesheets/alignments.css';
import './stylesheets/textelements.css';
import './stylesheets/theme.css';
import './stylesheets/custom-components.css';
import './stylesheets/form-elements.css';
import './stylesheets/layout.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/common/Login';
import RegisterPage from './pages/common/Register';
import HomePage from './pages/common/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ReportsPage from './pages/user/Reports';
import ExamsPage from './pages/admin/Exams';
import AddEditExam from './pages/admin/Exams/AddEditExam';
import Loader from './components/Loader';
import { useSelector } from 'react-redux';
import WriteExam from './pages/user/WriteExam';
import AdminReportsPage from './pages/admin/Reports';
import ResetPasswordLink from './pages/common/ResetPassword/ResetPasswordLink';
import ResetPassword from './pages/common/ResetPassword/ResetPassword';
import AOS from 'aos';
import Profile from './pages/user/Profile';
import LandingPage from './pages/common/Landing';

function App() {
  AOS.init()
  const {loading} = useSelector(state=>state.loaders)
  return (
    <>
      {loading&&<Loader/>}
      <Router>
      <Routes>
        <Route path="/" element={<PublicRoute><LandingPage/></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}/>
        <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/resetPasswordLink" element={<PublicRoute><ResetPasswordLink/></PublicRoute>}/>
        <Route path="/resetpassword/:id" element={<PublicRoute><ResetPassword/></PublicRoute>}/>
        <Route path="/admin/exams" element={<ProtectedRoute><ExamsPage/></ProtectedRoute>}/>
        <Route path="/admin/exams/add" element={<ProtectedRoute><AddEditExam/></ProtectedRoute>}/>
        <Route path="/admin/exams/edit/:id" element={<ProtectedRoute><AddEditExam/></ProtectedRoute>}/>
        <Route path="/user/reports" element={<ProtectedRoute><ReportsPage/></ProtectedRoute>}/>
        <Route path="/admin/reports" element={<ProtectedRoute><AdminReportsPage/></ProtectedRoute>}/>
        <Route path="/user/write-exam/:id" element={<ProtectedRoute><WriteExam/></ProtectedRoute>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
