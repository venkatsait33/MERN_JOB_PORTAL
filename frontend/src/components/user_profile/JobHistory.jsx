import { useState } from 'react';
import AppliedJobTable from '../job_details/AppliedJobTable'
import SavedJobs from './SavedJobs'

const JobHistory = () => {
    const [activeTab, setActiveTab] = useState('saved');
    return (
        <div className='max-w-5xl p-10 mx-auto max-sm:p-4 md:p-6'>
            <div role="tablist" className="tabs tabs-box">
                <a
                    role="tab"
                    className={`tab text-lg font-semibold ${activeTab === 'saved' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('saved')}
                >
                    Saved Jobs
                </a>
                <a
                    role="tab"
                    className={`tab text-lg font-semibold ${activeTab === 'applied' ? 'tab-active' : ''}`}
                    onClick={() => setActiveTab('applied')}
                >
                    Applied Jobs
                </a>
            </div>

            <div className="mt-6">
                {activeTab === 'saved' && <SavedJobs />}
                {activeTab === 'applied' && <AppliedJobTable />}
            </div>
        </div>
    )
}

export default JobHistory