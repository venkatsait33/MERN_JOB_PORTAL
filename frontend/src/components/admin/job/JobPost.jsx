import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { JOB_API_END_POINT } from '../../../utils/axiosApiConstants'
import { toast } from 'react-toastify'
import PostForm from './PostForm'

const JobPost = () => {
    const [loading, setLoading] = useState(false)
    const { companies } = useSelector(store => store.company)
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
    })
    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value
        }));
    }

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
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='max-w-4xl mx-auto my-10'>
            <div>
                <PostForm submitHandler={submitHandler} changeEventHandler={changeEventHandler} input={input} companies={companies} loading={loading} navigate={navigate} handleSelectHandler={handleSelectHandler} name="Job Post" button='Post Job' />
            </div>
        </div>
    )
}

export default JobPost