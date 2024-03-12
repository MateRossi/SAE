import Layout from "./Layouts/Layout";
import GraduateLayout from './Layouts/GraduateLayout';
import AdminLayout from './Layouts/AdminLayout';
import LoginPage from './pages/visitants/LoginPage';
import RegisterPage from './pages/visitants/RegisterPage';
import UanuthorizedPage from './pages/visitants/UnauthorizedPage';

 //graduate pages
import AcademicHistoryPage from './pages/graduates/AcademicHistoryPage';
import FollowUpPage from './pages/graduates/FollowUpPage';
import ProfessionalHistoryPage from './pages/graduates/ProfessionalHistoryPage';
import ProfilePage from './pages/graduates/ProfilePage';
import ReviewPage from './pages/graduates/ReviewPage';
import SameClassPage from './pages/graduates/SameClassPage';
import SameCoursePage from './pages/graduates/SameCoursePage';

import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Rotas públicas*/}
        <Route path="login" element={<LoginPage />} />
        <Route path="unauthorized" element={<UanuthorizedPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Rotas que o egresso tem acesso graduate id? já que é apenas um? */}
      <Route path="/graduate" element={<GraduateLayout />}>
        <Route path="academicHistory" element={<AcademicHistoryPage />} />
        <Route path="followUp" element={<FollowUpPage />} />
        <Route path="professionalHistory" element={<ProfessionalHistoryPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="review" element={<ReviewPage />} />
        <Route path="class" element={<SameClassPage />} />
        <Route path="course" element={<SameCoursePage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>

      </Route>
    </Routes>
  )
}

export default App
