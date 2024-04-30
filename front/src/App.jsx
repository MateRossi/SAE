import Layout from "./layouts/Layout";
import GraduateLayout from './layouts/GraduateLayout';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/visitants/LoginPage';
import AdminLogin from './pages/visitants/AdminLogin';
import RegisterPage from './pages/visitants/RegisterPage';
import UanuthorizedPage from './pages/visitants/UnauthorizedPage';
import MissingPage from "./pages/MissingPage";

//graduate pages
import AcademicHistoryPage from './pages/graduates/AcademicHistoryPage';
import FollowUpPage from './pages/graduates/FollowUpPage';
import ProfessionalHistoryPage from './pages/graduates/ProfessionalHistoryPage';
import ProfilePage from './pages/graduates/ProfilePage';
import ReviewPage from './pages/graduates/ReviewPage';
import SameClassPage from './pages/graduates/SameClassPage';
import SameCoursePage from './pages/graduates/SameCoursePage';

//admin pages
import CompaniesPage from './pages/admins/CompaniesPage';
import ConfirmRegisterPage from './pages/admins/ConfirmRegisterPage';
import CoursesPage from './pages/admins/CoursesPage';
import GraduatesPage from './pages/admins/GraduatesPage';
import ModalitiesPage from './pages/admins/ModalitiesPage';
import PreRegisterPage from './pages/admins/PreRegisterPage';
import StatisticsPage from "./pages/admins/StatisticsPage";

import { Routes, Route } from "react-router-dom"
import PersistLogin from "./components/PersistLogin";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/*Rotas públicas*/}
        <Route path="login" element={<LoginPage />} />
        <Route path="adlogin" element={<AdminLogin />} />
        <Route path="unauthorized" element={<UanuthorizedPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<PersistLogin />}>
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

        {/* Rotas que o admin tem acesso. Colocar várias talbes juntas ao invés de modalidade, etc?*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="confirmRegister" element={<ConfirmRegisterPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="graduates" element={<GraduatesPage />} />
          <Route path="modalities" element={<ModalitiesPage />} />
          <Route path="preRegister" element={<PreRegisterPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
        </Route>
      </Route>

      <Route path='*' element={<MissingPage />} />
    </Routes>
  )
}

export default App
