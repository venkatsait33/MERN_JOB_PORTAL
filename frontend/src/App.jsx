import './App.css'
import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './utils/ScroolToTop'
import useNetworkStatus from './utils/UseNetworkStatus'
import { AdminDashBoardLayout, AdminJobPosts, AdminLogin, AdminRegister, Applicants, Browse, Companies, CompanyDetails, CompanyJobs, CompanySetup, EmailVerification, Footer, HomePage, JobApplicants, JobDescription, JobHistory, JobPost, Jobs, NavBar, PageNotFound, Profile, ProtectedRoute, RecruiterDashboardLayout, RestPassword, UpdateJobPost } from './components'

function App() {
  const isOnline = useNetworkStatus();
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [bannerColor, setBannerColor] = useState("");
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      // User went offline
      setWasOffline(true);
      setBannerMessage("🚫 No Internet Connection");
      setBannerColor("bg-red-600");
      setShowBanner(true);
    } else if (wasOffline && isOnline) {
      // User reconnected after being offline
      setBannerMessage("✅ Internet Connected");
      setBannerColor("bg-green-600");
      setShowBanner(true);

      // Hide the "Internet Connected" banner after 3 seconds
      const timer = setTimeout(() => {
        setShowBanner(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline]);

  return (
    <>
      <div>
        {showBanner && (
          <div
            className={`fixed top-0 left-0 right-0 text-center p-2 z-50 text-white ${bannerColor} transition-all duration-500`}
          >
            {bannerMessage}
          </div>
        )}
      </div>
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
