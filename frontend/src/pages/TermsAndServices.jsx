import { IoArrowBack } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const TermsAndServices = ({ navigate }) => {
    return (
        <div className='p-10'>
            <div className='mb-4 '>
                <button onClick={() => navigate('/')} className='text-2xl hover:border-gray-300 btn btn-circle btn-sm'><IoArrowBack />
                </button>
            </div>

            <div className='flex flex-col gap-6 '>
                <h1 className='text-xl font-bold'>Terms and Services</h1>
                <div>
                    <p>Welcome to JobPortal. These Terms and Services (“Terms”) govern your access to and use of our platform, including our website, mobile application, and related services. By using our platform, you agree to be bound by these Terms. If you do not agree, please do not use our services.</p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>1. User Eligibility</h2>
                    <p>
                        To use JobPortal, you must:
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>Be at least 18 years of age.</li>
                            <li> Provide accurate and complete information during registration.</li>
                            <li>Comply with all applicable laws and regulations.</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>2. Account Registration and Responsibilities</h2>
                    <div>
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>Users must register to access certain features (e.g., applying for jobs or posting job listings).</li>
                            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                            <li>You are liable for any activity that occurs under your account.</li>
                            <li>You agree to notify us immediately of any unauthorized use of your account.</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>
                        3. Use of Services
                    </h2>
                    <div>
                        <p>a. For Job Seekers:</p>
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>Create and manage your professional profile.</li>
                            <li>Apply for jobs and communicate with recruiters.</li>
                            <li>Ensure your profile and documents are truthful and up to date.</li>
                        </ul>
                    </div>
                    <div>
                        <p>b. For Recruiters/Employers:</p>
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>Post accurate job listings.</li>
                            <li>Only contact candidates for legitimate hiring purposes.</li>
                            <li>Do not post misleading, fake, or offensive content.</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>4. Prohibited Conduct</h3>
                    <div>
                        <p>You agree not to:</p>
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>Use the platform for any illegal or unauthorized purposes.</li>
                            <li>Impersonate any person or entity.</li>
                            <li>Post or share content that is abusive, discriminatory, or harmful.</li>
                            <li>Access or use data that does not belong to you without permission.</li>
                            <li>Use automated systems (bots/scrapers) to access the platform.</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>5.Privacy</h3>
                    <p>
                        Your use of the platform is also governed by our <span>
                            <Link to='/privacy' className='link link-info'>Privacy Policy</Link>
                        </span>, which explains how we collect, use, and protect your information.
                    </p>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>6.Termination of Account</h3>
                    <div>
                        <p> We reserve the right to:</p>
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>Suspend or terminate your account at any time if you violate these Terms.</li>
                            <li>Remove any content that violates our guidelines or harms the platform’s integrity.</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>7.Disclaimers</h3>
                    <ul className='flex flex-col gap-2 mb-2 ml-2'>
                        <li>  JobPortal is a platform that connects job seekers and employers. We do not guarantee job placements or candidate selections.</li>
                        <li> We do not verify the accuracy of all user-generated content. Users are advised to use their own discretion.</li>
                        <li>
                            The platform is provided "as is" without warranties of any kind.</li>
                    </ul>
                </div>

                <div>
                    <h3 className='text-lg font-semibold'>Contact Us</h3>
                    <div>
                        <p> If you have questions or feedback regarding these Terms, please contact:</p>
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li> JobPortal Support Team</li>
                            <li>  📧 Email: support@JobPortal.com</li>
                            <li>📍 Address: [Insert Office Address]</li>
                            <li> 🌐 Website: www.JobPortal.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TermsAndServices