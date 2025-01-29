import Layout from './Layouts/Layout';
import GraduateLayout from './Layouts/GraduateLayout';
import AdminLayout from './Layouts/AdminLayout';
import LoginPage from './pages/visitants/LoginPage';
import RegisterPage from './pages/visitants/RegisterPage';
import UanuthorizedPage from './pages/visitants/UnauthorizedPage';
import MissingPage from "./pages/MissingPage";
import RegisterSuccess from './pages/RegisterSuccess';

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
import AddCoursePage from './pages/admins/AddCoursePage';
import EditCoursePage from './pages/admins/EditCoursePage';

import { Routes, Route } from "react-router-dom"
import PersistLogin from "./components/PersistLogin";
import AddModalityPage from './pages/admins/AddModalityPage';
import EditModalityPage from './pages/admins/EditModalityPage';
import SendGraduateMessage from './pages/graduates/SendGraduateMessage';
import GraduateDetailsPage from './pages/admins/GraduateDetailsPage';
import ForgotPassword from './pages/visitants/ForgotPassword';



function App() {
  return (
    <Routes>
      {/*Rotas públicas*/}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="unauthorized" element={<UanuthorizedPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path='registerSuccess' element={<RegisterSuccess />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
      </Route>

      <Route element={<PersistLogin />}>
        {/* Rotas que o egresso tem acesso graduate id? já que é apenas um? */}
        <Route path="/graduate" element={<GraduateLayout />}>
          <Route path="/graduate" element={<SameCoursePage />} />
          <Route path="academicHistory" element={<AcademicHistoryPage />} />
          <Route path="followUp" element={<FollowUpPage />} />
          <Route path="professionalHistory" element={<ProfessionalHistoryPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="review" element={<ReviewPage />} />
          <Route path="class" element={<SameClassPage />} />
          <Route path='/graduate/:graduateId/send-message' element={<SendGraduateMessage />} />
        </Route>

        {/* Rotas que o admin tem acesso. Colocar várias talbes juntas ao invés de modalidade, etc?*/}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<GraduatesPage />} />
          <Route path='/admin/graduates/:graduateId' element={<GraduateDetailsPage />} />
          <Route path="companies" element={<CompaniesPage />} />
          <Route path="confirmRegister" element={<ConfirmRegisterPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="add-course" element={<AddCoursePage />} />
          <Route path='courses/:courseId/edit-course' element={<EditCoursePage />} />
          <Route path="modalities" element={<ModalitiesPage />} />
          <Route path='add-modality' element={<AddModalityPage />} />
          <Route path='modalities/:modalityId/edit-modality' element={<EditModalityPage />} />
          <Route path="preRegister" element={<PreRegisterPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          {/*<Route path='profile' element={<AdminProfile />} />*/}
        </Route>
      </Route>

      <Route path='*' element={<MissingPage />} />
    </Routes>
  )
}

export default App
