import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import ScrollToTop from './utils/ScroolToTop'
import { AboutUs, AdminDashBoardLayout, AdminJobPosts, AdminLogin, AdminRegister, Applicants, Browse, Companies, CompanyDetails, CompanyJobs, CompanySetup, EmailVerification, Footer, HomePage, JobApplicants, JobDescription, JobHistory, JobPost, Jobs, NavBar, PageNotFound, Privacy, Profile, ProtectedRoute, RecruiterDashboardLayout, RestPassword, TermsAndServices, UpdateJobPost } from './components'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <ScrollToTop />
      <div className='max-h-screen mx-auto max-w-screen-2xl no-scrollbar'>
        <NavBar />
        <div className='relative mt-14 '>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/jobs' element={<Jobs />} />
            <Route path='/browse' element={<Browse />} />
            <Route path='/job/description/:id' element={<JobDescription />} />
            <Route path='/company/description/:id' element={<CompanyDetails />} />
            <Route path='job-history' element={<JobHistory />} />
            <Route path='about' element={<AboutUs navigate={navigate} />} />
            <Route path='privacy' element={<Privacy navigate={navigate} />} />
            <Route path='terms' element={<TermsAndServices navigate={navigate} />} />

            {/*  */}
            <Route path='/profile' element={<Profile />} />
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
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
