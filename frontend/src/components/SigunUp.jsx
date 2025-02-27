import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import url from '../url/url';

const SignUp = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        gender: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user.fullName === "" || user.username === "" || user.password === "" || user.gender === "") {
            toast.error("Please fill all the fields");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.post(`${url}/api/v1/user/register`, user);
            if (res) setLoading(false);
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login"); // Redirect to the login page after successful signup
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            setLoading(false);
        }

        setUser({
            fullName: "",
            username: "",
            password: "",
            gender: ""
        });
    };

    return (
        <div className='min-w-96 mx-auto'>
            <div className='p-6 shadow-md h-full w-full bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center'>Chat-app</h1>

                <form onSubmit={handleSubmit}>

                    <div>
                        <label className='label p-2 font-semibold'>Name</label>
                        <input
                            onChange={e => setUser({ ...user, fullName: e.target.value })}
                            className='w-full input input-bordered h-10 font-semibold'
                            value={user.fullName}
                            type="text"
                            placeholder='Name' />
                    </div>

                    <div>
                        <label className='label p-2 font-semibold'>Email</label>
                        <input
                            onChange={e => setUser({ ...user, username: e.target.value })}
                            className='w-full input input-bordered h-10 font-semibold'
                            value={user.username}
                            type="text"
                            placeholder='Email'
                            autoComplete='new-username' />
                    </div>

                    <div>
                        <label className='label p-2 font-semibold'>Password</label>
                        <input
                            onChange={e => setUser({ ...user, password: e.target.value })}
                            className='w-full input input-bordered h-10 font-semibold'
                            value={user.password}
                            type="password"
                            placeholder='Password'
                            autoComplete='new-password' />
                    </div>

                    <div className='flex justify-center space-x-2 my-3'>
                        <div className='flex space-x-2 font-semibold'>
                            <div>Male</div>
                            <input
                                onChange={e => setUser({ ...user, gender: e.target.value })}
                                type="radio"
                                name="gender"
                                value="male"
                                className="checkbox" />
                        </div>
                        <div className='flex space-x-2'>
                            <div>Female</div>
                            <input
                                onChange={e => setUser({ ...user, gender: e.target.value })}
                                type="radio"
                                name="gender"
                                value="female"
                                className="checkbox" />
                        </div>
                    </div>

                    <div className='flex justify-center font-semibold'>
                        Already have an account?
                        <Link className='mx-2 text-blue-500 underline' to="/login">
                            Login
                        </Link>
                    </div>

                    <div className='mt-4'>
                        <button type='submit' className='btn btn-block btn-md mt-2 border-slate-700'>
                            {!loading ? 'Sign Up' : <span className="loading loading-spinner loading-xs"></span>}
                        </button>
                    </div>

                    

                </form>

            </div>
        </div>
    );
};

export default SignUp;
