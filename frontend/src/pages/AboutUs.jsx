import { IoArrowBack } from 'react-icons/io5'

const AboutUs = ({ navigate }) => {
    return (
        <div className='p-10'>
            <div className='mb-4 '>
                <button onClick={() => navigate('/')} className='text-2xl hover:border-gray-300 btn btn-circle btn-sm'><IoArrowBack />
                </button>
            </div>
            <div className='flex flex-col gap-8 '>
                <h3 className='text-3xl font-bold text-center'>About Us</h3>
                <div>
                    <p>
                        Welcome to JobPortal, your trusted platform connecting talent with opportunity.
                        Our mission is to simplify the hiring process by bridging the gap between job seekers and recruiters through a smart, secure, and user-friendly experience. Whether you're a candidate looking to launch or grow your career or a company searching for top talent, JobBridge is built to support your journey every step of the way.
                    </p>
                    <p>
                        We’re committed to building careers and creating futures—one connection at a time.
                    </p>
                </div>
                <div>
                    <h3 className='text-xl font-semibold'>
                        💡 Startup-Friendly & Visionary
                    </h3>
                    <h4>
                        About Us
                    </h4>
                    <p>
                        At JobPortal, we believe finding the right job or the right candidate shouldn’t be hard.
                        That’s why we created a powerful yet simple platform where candidates can apply with ease, and companies can hire smarter and faster.
                        Driven by innovation and empathy, we aim to make hiring human again. Whether you're hiring your next teammate or hunting for your dream job — we’re here for you.
                    </p>
                </div>
                <div>
                    <h3 className='text-xl font-semibold'>🌐 Modern, Tech-Oriented</h3>
                    <h4>About Us</h4>
                    <p>
                        JobPortal is a next-gen job portal designed to empower candidates and companies with intelligent tools for modern hiring.
                        From personalized job suggestions to one-click applications, and real-time application tracking — our platform is built with performance, security, and simplicity in mind.
                        Join thousands of users who are transforming the way they hire and get hired with WorkLoop.</p>
                </div>
                <div>
                    <h3 className='text-xl font-semibold'>🙌 Community-Driven</h3>
                    <h4>About Us</h4>
                    <p>
                        we’re more than just a job portal — we’re a growing community of passionate professionals, employers, and job seekers.
                        Our goal is to create meaningful career connections by making job applications smoother, faster, and more accessible.
                        We believe in transparency, fairness, and empowering everyone to find their right place in the professional world.</p>
                </div>
            </div>
        </div>
    )
}

export default AboutUs