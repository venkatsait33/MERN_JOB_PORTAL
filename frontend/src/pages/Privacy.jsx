import { IoArrowBack } from 'react-icons/io5'

const Privacy = ({ navigate }) => {
   
    return (
        <div className='p-10'>
            <div className='mb-4 '>
                <button onClick={() => navigate('/')} className='text-2xl hover:border-gray-300 btn btn-circle btn-sm'><IoArrowBack />
                </button>
            </div>
            <div className='flex flex-col gap-8 '>
                <h1 className='text-xl font-bold'>🔒 Privacy Policy</h1>
                <div>
                    <p>
                        Welcome to JobPortal. We value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our job portal platform.
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>
                        1. Information We Collect
                    </h2>
                    <p>
                        We collect the following types of information when you register or use our services:
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>    <span className='mr-2 font-semibold'>Personal Info:</span> Name, email, phone number, location, resume, profile photo.
                            </li>
                            <li>  <span className='mr-2 font-semibold'>Professional Info:</span> Job experience, education, skills, preferred roles.</li>
                            <li>
                                <span className='mr-2 font-semibold'> Recruiter Info:</span> Company name, job postings, applicant details.</li>
                            <li><span className='mr-2 font-semibold'>Usage Data:</span> Pages visited, clicks, browser type, and device.</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>2. How We Use Your Information</h2>
                    <p>
                        We use your information to:
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li> Create and manage your account
                            </li>
                            <li> Match you with jobs or candidates</li>
                            <li>  Send job alerts and updates</li>
                            <li> Improve our services and user experience</li>
                            <li> Contact you when necessary</li>
                        </ul>
                        We do not sell or share your personal information with third parties for marketing purposes.
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>3. Email & Communication</h2>
                    <p>
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>  You may receive emails for job updates, application confirmations, or platform changes.</li>
                            <li>  You can opt-out anytime via your settings or the unsubscribe link.</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>4. Cookies</h2>
                    <p>
                        We use cookies to enhance your experience (e.g., remember login, show relevant jobs). You can control cookies via your browser settings.
                    </p>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>5. Data Security</h3>
                    <p>
                        We use industry-standard security tools to protect your data. However, no method is 100% secure. We work hard to keep your information safe.
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'>6. Your Rights</h2>
                    <p>
                        You can:
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>View, edit, or delete your account</li>
                            <li> Request a copy of your data</li>
                            <li>Contact us to ask questions about your privacy</li>
                        </ul>
                    </p>
                </div>
                <div>
                    <h2 className='text-lg font-semibold'> 7. Changes to This Policy</h2>
                    <p> We may update this policy from time to time. We will notify you of any major changes via email or app notifications.</p>
                </div>
                <div>
                    <h3 className='text-lg font-semibold'>8. Contact Us</h3>
                    <p className=''> If you have any questions or concerns about this Privacy Policy, feel free to reach out:
                        <ul className='flex flex-col gap-2 mb-2 ml-2'>
                            <li>📧 Email: support@yourdomain.com
                            </li>
                            <li>🌐 Website: www.yourdomain.com</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Privacy