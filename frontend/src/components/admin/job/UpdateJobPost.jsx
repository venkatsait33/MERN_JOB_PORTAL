import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { JOB_API_END_POINT } from '../../../utils/axiosApiConstants';
import { toast } from 'react-toastify';
import PostForm from './PostForm';

const UpdateJobPost = () => {
    const [loading, setLoading] = useState(false);
    const { companies } = useSelector(store => store.company);
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: [],
        category: '',
        location: '',
        salary: "",
        jobType: '',
        experience: '',
        positions: "",
        companyId: '',
    });

    const navigate = useNavigate();
    const params = useParams()
    const id = params.id; // For edit
    useEffect(() => {
        if (id) {
            const fetchJob = async () => {
                try {
                    const data = await axios.get(`${JOB_API_END_POINT}/get/${id}`, { withCredentials: true });

                    setInput({
                        title: data?.data?.job?.title,
                        description: data?.data?.job?.description,
                        requirements: data?.data?.job?.requirements.join(', '),
                        location: data?.data?.job?.location,
                        salary: data?.data?.job?.salary,
                        jobType: data?.data?.job?.jobType,
                        experience: data?.data?.job?.experience,
                        positions: data?.data?.job?.positions,
                        companyId: data?.data?.job?.companyId,
                        category: data?.data?.job?.category,
                    });
                } catch (error) {
                    toast.error("Failed to fetch job details");
                    console.log(error.response.data.message);
                }
            };
            fetchJob();
        }
    }, [id]);
    const changeEventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSelectHandler = (e) => {
        const value = e.target.value;
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);

        if (selectedCompany) {
            setInput(prev => ({
                ...prev,
                companyId: selectedCompany._id
            }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();      
        try {
            setLoading(true);
            const updatedInput = {
                ...input,
                requirements: input.requirements.split(',').map(req => req.trim())
            };
            const res = await axios.put(`${JOB_API_END_POINT}/${id}/update`, updatedInput, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/recruiter/jobs')
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <div className='max-w-4xl mx-auto my-10'>
                <PostForm submitHandler={submitHandler} changeEventHandler={changeEventHandler} input={input} companies={companies} loading={loading} navigate={navigate} handleSelectHandler={handleSelectHandler} name='Update Job Post' button="update" />
            </div>
        </div>
    )
}

export default UpdateJobPost