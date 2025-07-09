import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NavBar from './components/NavBar'
import Jobs from './pages/Jobs'
import Browse from './components/job_details/Browse'
import Footer from './components/Footer'
import Profile from './components/user_profile/Profile'
import JobDescription from './components/job_details/JobDescription'
import Applicants from './components/admin/applicants/Applicants'
import CreateCompany from './components/admin/company/CreateComapny'
import Companies from './components/admin/company/Companies'
import CompanySetup from './components/admin/company/CompanySetup'
import AdminJobPosts from './components/admin/job/AdminJobPosts'
import JobPost from './components/admin/job/JobPost'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateJobPost from './components/admin/job/UpdateJobPost'
import AdminRegister from './pages/AdminRegister'
import AdminLogin from './pages/AdminLogin'
import Admin_Dashboard from './components/Admin_Dashboard'
import AdminDashboard from './components/admin_dashboard/AdminDashboard'
import CompanyJobs from './components/admin_dashboard/CompanyJobs'
import JobApplicants from './components/admin_dashboard/JobApplicants'
import RestPassword from './components/RestPassword'
import EmailVerification from './components/EmailVerification'
import JobHistory from './components/user_profile/JobHistory'
import ScrollToTop from './components/ScroolToTop'
import AdminDashBoardLayout from './components/admin_dashboard/AdminDashBoardLayout'
import PageNotFound from './pages/PageNotFound'
import RecruiterDashboardLayout from './components/admin/RecruiterDashboardLayout'

function App() {

  return (
    <>
      <ScrollToTop />
      <div className='max-h-screen mx-auto max-w-screen-2xl no-scrollbar'>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/job/description/:id' element={<JobDescription />} />
          <Route path='job-history' element={<JobHistory />} />

          {/*  */}
          <Route path='/profile' element={<Profile />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/reset-password' element={<RestPassword />} />
          <Route path='/email-verify' element={<EmailVerification />} />

          {/* ------ Main Admin ----------- */}
          <Route path='/admin/signup' element={<AdminRegister />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={
            <AdminDashBoardLayout />} />
          <Route path="/admin/dashboard/company/:id" element={<CompanyJobs />} />
          <Route path="/admin/dashboard/job/:id" element={<JobApplicants />} />
          {/* recruiter */}
          {/* Recruiter */}
          <Route path='/recruiter/dashboard' element={
            <ProtectedRoute>
              <RecruiterDashboardLayout />
            </ProtectedRoute>} />
          
          <Route path='/recruiter/companies' element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>} />
          
          <Route path='/recruiter/companies/:id' element={<ProtectedRoute><CompanySetup /></ProtectedRoute>} />
          <Route path='/recruiter/jobs' element={<ProtectedRoute>
            <AdminJobPosts />
          </ProtectedRoute>} />
          <Route path='/recruiter/jobs/postjob' element={<ProtectedRoute>
            <JobPost />
          </ProtectedRoute>} />
          <Route path='/recruiter/jobs/:id/update' element={
            <ProtectedRoute>
              <UpdateJobPost />
            </ProtectedRoute>
          } />
          <Route path='/recruiter/jobs/:id/applicants' element={<ProtectedRoute><Applicants /></ProtectedRoute>} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>

        <Footer />
      </div>
    </>
  )
}

export default App
